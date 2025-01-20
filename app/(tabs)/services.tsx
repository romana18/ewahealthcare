import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const manageOptions = [
  { id: 1, title: 'General Consultation', icon: 'hospital-box' },
  { id: 2, title: 'Specialist', icon: 'account-heart' },
  { id: 3, title: 'Telehealth', icon: 'video' },
  { id: 4, title: 'Diagnostic Services', icon: 'hospital' },
  { id: 5, title: 'Home Care', icon: 'microscope' },
  { id: 6, title: 'Super Speciality(second consultation)', icon: 'doctor' },
];

export default function ServicesPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [services, setServices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [servicesByDepartment, setServicesByDepartment] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedOption === 1) fetchServicesByDepartment();
    if (selectedOption === 2) fetchData('departments');
    if (selectedOption === 5) fetchData('laboratories');
  }, [selectedOption]);

  const fetchServicesByDepartment = async () => {
    setIsLoading(true);
    try {
      const url = 'http://139.59.87.79:4030/api/services/grid?page=1&rows=-1';
      const response = await axios.get(url);

      if (response.data.success) {
        const services = response.data.data.rows;

        // Group services by department
        const groupedServices = services.reduce((acc, service) => {
          const deptId = service.department;
          if (!acc[deptId]) acc[deptId] = [];
          acc[deptId].push(service);
          return acc;
        }, {});

        setServicesByDepartment(groupedServices);

        // Fetch department names
        const deptResponse = await axios.get(
          'http://139.59.87.79:4030/api/departments/grid?page=1&rows=20'
        );
        if (deptResponse.data.success) {
          setDepartments(deptResponse.data.data.rows);
        }
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (type, departmentId = null) => {
    setIsLoading(true);
    try {
      let url = '';
      if (type === 'services') url = 'http://139.59.87.79:4030/api/services/grid?page=1&rows=-1';
      else if (type === 'departments') url = 'http://139.59.87.79:4030/api/departments/grid?page=1&rows=20';
      else if (type === 'laboratories') url = 'http://139.59.87.79:4030/api/laboratories/grid?page=1&rows=-1';
      else if (type === 'doctors') url = `http://139.59.87.79:4030/api/doctors/grid?page=1&rows=-1`;

      const response = await axios.get(url);
      if (response.data.success) {
        if (type === 'services') setServices(response.data.data.rows);
        if (type === 'departments') setDepartments(response.data.data.rows);
        if (type === 'laboratories') setLaboratories(response.data.data.rows);
        if (type === 'doctors') {
          const filteredDoctors = response.data.data.rows.filter((doctor) =>
            doctor.departments.includes(departmentId)
          );
          setDoctors(filteredDoctors);
        }
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Manage Options</Text>
      <View style={styles.gridContainer}>
        {manageOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.gridCard}
            onPress={() => {
              setSelectedOption(option.id);
              setSelectedDepartment(null); // Reset department selection
            }}
          >
            <MaterialCommunityIcons
              name={option.icon}
              size={36}
              color="#079094"
              style={styles.optionIcon}
            />
            <Text style={styles.gridCardText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading && <ActivityIndicator size="large" color="#079094" style={{ marginTop: 20 }} />}

      {selectedOption === 1 && (
        <View>
          {!selectedDepartment ? (
            <View>
              <Text style={styles.sectionTitle}>Departments</Text>
              {departments.map((department) => (
                <TouchableOpacity
                  key={department._id}
                  style={styles.serviceItem}
                  onPress={() => setSelectedDepartment(department._id)}
                >
                  <Text style={styles.serviceText}>{department.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View>
              <Text style={styles.sectionTitle}>Services</Text>
              {servicesByDepartment[selectedDepartment]?.map((service) => (
                <TouchableOpacity key={service._id} style={styles.serviceItem}>
                  <Text style={styles.serviceText}>{service.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.serviceItem, { backgroundColor: '#FFD700' }]}
                onPress={() => setSelectedDepartment(null)}
              >
                <Text style={styles.serviceText}>Back to Departments</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {selectedOption === 2 && (
        <View>
          <Text style={styles.sectionTitle}>Departments</Text>
          {departments.map((department) => (
            <TouchableOpacity
              key={department._id}
              style={styles.serviceItem}
              onPress={() => fetchData('doctors', department._id)}
            >
              <Text style={styles.serviceText}>{department.name}</Text>
            </TouchableOpacity>
          ))}
          {doctors.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Doctors</Text>
              {doctors.map((doctor) => (
                <TouchableOpacity key={doctor._id} style={styles.serviceItem}>
                  <Text style={styles.serviceText}>{doctor.name}</Text>
                  <Text style={styles.labDescription}>{doctor.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {selectedOption === 5 && (
        <View>
          <Text style={styles.sectionTitle}>Laboratories</Text>
          {laboratories.map((lab) => (
            <TouchableOpacity key={lab._id} style={styles.serviceItem}>
              <Text style={styles.serviceText}>{lab.name}</Text>
              <Text style={styles.labDescription}>{lab.serv}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F7F8FA',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  gridCardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  optionIcon: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  labDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
