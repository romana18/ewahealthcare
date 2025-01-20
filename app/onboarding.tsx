import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Image
          source={{ uri: "https://i.ibb.co/Z2sDJ7M/english-teacher.jpg" }}
          style={styles.image}
        />
        <Text style={styles.text}>Welcome to EwaHealthCare</Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={{ uri: "https://i.ibb.co/rdnRXFt/gynecologist.jpg" }}
          style={styles.image}
        />
        <Text style={styles.text}>Your Health, Our Priority</Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={{ uri: "https://i.ibb.co/89hswTM/laboratory.jpg" }}
          style={styles.image}
        />
        <Text style={styles.text}>Join Us Today!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await AsyncStorage.setItem("isNewUser", "false");
            router.replace("/dashboard"); // Redirect to the dashboard or login.
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA", justifyContent: "center" },
  slide: { alignItems: "center", marginVertical: 20 },
  image: { width: 200, height: 200, marginBottom: 20 },
  text: { fontSize: 18, textAlign: "center", color: "#333" },
  button: { backgroundColor: "#005a9c", padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 16 },
});
