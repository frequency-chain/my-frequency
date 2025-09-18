import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 My Frequency App</Text>
      <Text style={styles.subtitle}>Ready for feature development</Text>

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
