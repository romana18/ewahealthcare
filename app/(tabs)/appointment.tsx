import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Card } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const appointments = [
  {
    id: 1,
    hospital: "City Hospital",
    time: "10:30 AM",
    date: "2024-12-28",
    service: "Cardiology Consultation",
    icon: "local-hospital",
  },
  {
    id: 2,
    hospital: "Green Valley Clinic",
    time: "02:00 PM",
    date: "2024-12-30",
    service: "Dermatology Check-up",
    icon: "healing",
  },
  {
    id: 3,
    hospital: "Downtown Medical Center",
    time: "11:00 AM",
    date: "2024-12-29",
    service: "Neurology Consultation",
    icon: "psychology",
  },
];

export default function AppointmentPage() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeDetails = () => {
    setSelectedAppointment(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Appointments</Text>
      {appointments.map((appointment) => (
        <TouchableOpacity
          key={appointment.id}
          style={styles.appointmentItem}
          onPress={() => openDetails(appointment)}
        >
          <MaterialIcons
            name={appointment.icon}
            size={32}
            color="#079094"
            style={styles.icon}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.serviceText}>{appointment.service}</Text>
            <Text style={styles.hospitalText}>{appointment.hospital}</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>{appointment.date}</Text>
            <Text style={styles.timeText}>{appointment.time}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {selectedAppointment && (
        <Modal
          transparent={true}
          visible={true}
          animationType="slide"
          onRequestClose={closeDetails}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Appointment Details</Text>
              <Text style={styles.modalText}>Hospital: {selectedAppointment.hospital}</Text>
              <Text style={styles.modalText}>Time: {selectedAppointment.time}</Text>
              <Text style={styles.modalText}>Date: {selectedAppointment.date}</Text>
              <Text style={styles.modalText}>Service: {selectedAppointment.service}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeDetails}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F7F8FA",
    marginTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  hospitalText: {
    fontSize: 12,
    color: "#555",
  },
  dateTimeContainer: {
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 12,
    color: "#333",
  },
  timeText: {
    fontSize: 12,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
