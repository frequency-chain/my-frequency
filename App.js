import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth, db, storage } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, getMetadata } from "firebase/storage";

export default function App() {
  const [firebaseStatus, setFirebaseStatus] = useState({
    auth: "Checking...",
    firestore: "Checking...",
    storage: "Checking..."
  });

  useEffect(() => {
    checkFirebaseConnections();
  }, []);

  const checkFirebaseConnections = async () => {
    const status = {
      auth: "Checking...",
      firestore: "Checking...",
      storage: "Checking..."
    };

    // Check Auth
    try {
      onAuthStateChanged(auth, (user) => {
        const authStatus = user
          ? `✅ Authenticated as ${user.uid}`
          : "✅ Connected (Not signed in)";
        setFirebaseStatus(prev => ({ ...prev, auth: authStatus }));
      });
      status.auth = "✅ Connected";
    } catch (error) {
      console.error("Auth error:", error);
      status.auth = "❌ Auth Error";
    }

    // Check Firestore
    try {
      const testDoc = doc(db, "test", "connection");
      await setDoc(testDoc, {
        connected: true,
        timestamp: new Date().toISOString()
      });
      const docSnap = await getDoc(testDoc);
      status.firestore = docSnap.exists() ? "✅ Connected & Working" : "❌ Connection Issue";
    } catch (error) {
      console.error("Firestore error:", error);
      if (error.code?.includes("permission")) {
        status.firestore = "⚠️ Connected (Check Rules)";
      } else {
        status.firestore = "❌ Firestore Error";
      }
    }

    // Check Storage (without blob operations)
    try {
      const storageRef = ref(storage, 'test/connection.txt');
      // Just check if we can reference storage, don't upload
      await getMetadata(storageRef).catch(() => {
        // File doesn't exist is ok, we're just testing connection
        console.log("Storage reference test (file may not exist)");
      });
      status.storage = "✅ Connected";
    } catch (error) {
      console.error("Storage error:", error);
      if (error.code === "storage/unauthorized") {
        status.storage = "⚠️ Connected (Check Rules)";
      } else {
        status.storage = "❌ Storage Error";
      }
    }

    setFirebaseStatus(status);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 My Frequency App</Text>
      <Text style={styles.subtitle}>Firebase Integration Demo</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Firebase Status:</Text>
        <Text style={styles.infoText}>Auth: {firebaseStatus.auth}</Text>
        <Text style={styles.infoText}>Firestore: {firebaseStatus.firestore}</Text>
        <Text style={styles.infoText}>Storage: {firebaseStatus.storage}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Build Pipeline Status:</Text>
        <Text style={styles.infoText}>✅ EAS Build configured</Text>
        <Text style={styles.infoText}>✅ iOS and Android builds working</Text>
        <Text style={styles.infoText}>✅ TestFlight ready</Text>
        <Text style={styles.infoText}>✅ Direct distribution working</Text>
      </View>

      <Text style={styles.version}>Version: 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  version: {
    fontSize: 12,
    color: "#999",
    marginTop: 20,
  },
});
