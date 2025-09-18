import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import * as Updates from "expo-updates";

export default function App() {
  const [updateMessage, setUpdateMessage] = useState("");
  const [buildInfo, setBuildInfo] = useState("");

  useEffect(() => {
    // Get build information
    setBuildInfo(`
      Runtime Version: ${Updates.runtimeVersion || "N/A"}
      Update ID: ${Updates.updateId ? Updates.updateId.substring(0, 8) : "N/A"}
      Channel: ${Updates.channel || "N/A"}
    `);

    // Check for updates on app start
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateMessage("Update available! Downloading...");
        await Updates.fetchUpdateAsync();
        Alert.alert(
          "Update Downloaded",
          "Restart the app to see the latest changes!",
          [
            { text: "Later", style: "cancel" },
            { text: "Restart Now", onPress: () => Updates.reloadAsync() },
          ]
        );
      } else {
        setUpdateMessage("App is up to date!");
      }
    } catch (error) {
      setUpdateMessage("Error checking for updates");
      console.log("Update check error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Hello World App vAAAHHHHHHH</Text>
      <Text style={styles.subtitle}>EAS Build + Update Pipeline Test</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Build Information:</Text>
        <Text style={styles.infoText}>{buildInfo}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Update Status:</Text>
        <Text style={styles.infoText}>{updateMessage}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={checkForUpdates}>
        <Text style={styles.buttonText}>Check for Updates</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version: 1.0.0 - Build 1</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  version: {
    fontSize: 12,
    color: "#999",
    marginTop: 20,
  },
});
