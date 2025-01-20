import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
  });

  const [healthDetails, setHealthDetails] = useState({
    physicalActivity: '',
    diet: '',
    smoking: '',
    sleep: '',
    chronicConditions: '',
    alcohol: '',
  });

  const handlePersonalChange = (field, value) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleHealthChange = (field, value) => {
    setHealthDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.replace('/')}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      {/* Profile Photo */}
      <View style={styles.profilePhotoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profilePhoto}
        />
        <Text style={styles.profilePhotoText}>Edit Photo</Text>
      </View>

      <Text style={styles.header}>Profile</Text>

      {/* Personal Details Section */}
      <Text style={styles.sectionHeader}>Edit Personal Details</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={personalDetails.name}
        onChangeText={(value) => handlePersonalChange('name', value)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={personalDetails.phone}
        onChangeText={(value) => handlePersonalChange('phone', value)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={personalDetails.email}
        onChangeText={(value) => handlePersonalChange('email', value)}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={personalDetails.age}
        keyboardType="numeric"
        onChangeText={(value) => handlePersonalChange('age', value)}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePersonalChange('gender', 'male')}
        >
          <Text style={
            personalDetails.gender === 'male' ? styles.radioSelected : styles.radio
          }>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePersonalChange('gender', 'female')}
        >
          <Text style={
            personalDetails.gender === 'female' ? styles.radioSelected : styles.radio
          }>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Height in cm"
        value={personalDetails.height}
        keyboardType="numeric"
        onChangeText={(value) => handlePersonalChange('height', value)}
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight in Kg"
        value={personalDetails.weight}
        keyboardType="numeric"
        onChangeText={(value) => handlePersonalChange('weight', value)}
      />

      {/* Health Details Section */}
      <Text style={styles.sectionHeader}>Edit Health Details</Text>

      {['physicalActivity', 'diet', 'smoking', 'sleep', 'chronicConditions', 'alcohol'].map((field) => (
        <View key={field}>
          <Text style={styles.label}>{`How often do you ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}?`}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter details for ${field}`}
            value={healthDetails[field]}
            onChangeText={(value) => handleHealthChange(field, value)}
          />
        </View>
      ))}

      <Button title="Save" onPress={() => console.log('Profile updated!', { personalDetails, healthDetails })} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingTop:80,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
     
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  backButton: {
    fontSize: 18,
    color: '#079094',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioButton: {
    marginRight: 15,
  },
  radio: {
    fontSize: 16,
    color: '#000',
  },
  radioSelected: {
    fontSize: 16,
    color: '#079094',
    fontWeight: 'bold',
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  profilePhotoText: {
    color: '#079094',
    marginTop: 5,
  },
});
