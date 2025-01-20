import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, ToggleButton, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select'; // Import the Picker

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [userType, setUserType] = useState<'individual' | 'enterprise'>('individual');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [companies, setCompanies] = useState([]); // To store companies
  const [selectedCompany, setSelectedCompany] = useState('67856fd0446af88a8d5cad95'); // Hardcoded company _id for "NitianBit"
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch companies on mount (optional if you want to show them)
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://139.59.87.79:4030/api/company/grid?page=1&rows=-1');
        const data = await response.json();
        if (data.success && data.data && data.data.rows) {
          const companyOptions = data.data.rows.map(company => ({
            label: company.name, // Display company name in the dropdown
            value: company._id,  // Company ID as the value
          }));
          setCompanies(companyOptions); // Set companies to state (this will still work in case you need them later)
        } else {
          Alert.alert('Error', 'Failed to load companies');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong while fetching companies');
        console.error(error);
      }
    };

    fetchCompanies();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const handleRegister = async () => {
    if (!name || !mobile || !email || !password || !selectedCompany) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setLoading(true);

    const payload = {
      role: userType === 'individual' ? 'patient' : 'enterprise', // Set user type
   
      
      email: userType === 'individual' ? email : '',
      name,
      password,
      age: userType === 'individual' ? age : '',
      company: selectedCompany, // Use the hardcoded company ID
    };

    try {
      const response = await fetch('http://139.59.87.79:4030/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setLoading(false);

      if (data.success) {
        await AsyncStorage.setItem('userToken', data.token || 'exampleToken'); // Store user token if available
        navigation.navigate('Dashboard'); // Navigate to dashboard
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong during registration');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Register as</Title>
      <ToggleButton.Row
        onValueChange={(value) => setUserType(value as 'individual' | 'enterprise')}
        value={userType}
        style={styles.toggleRow}
      >
        <ToggleButton icon="account" value="individual" style={styles.toggleButton} />
        <ToggleButton icon="briefcase" value="enterprise" style={styles.toggleButton} />
      </ToggleButton.Row>

      <TextInput label="Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} />

      {userType === 'individual' ? (
        <>
          <TextInput
            label="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
          />
        </>
      ) : (
        <>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />
        </>
      )}

      {/* Hardcoded Company Selection */}
      {userType === 'enterprise' && (
        <TextInput
          label="Company"
          value="NitianBit" // Display company name as hardcoded value
          mode="outlined"
          style={styles.input}
          editable={false} // Make it non-editable
        />
      )}

      <Button
        mode="outlined"
        onPress={handleRegister}
        style={styles.registerButton}
        icon="check"
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#005a9c',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },
  inputAndroid: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#005a9c',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    color: '#005a9c',
  },
  toggleRow: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    borderRadius: 20,
    width: 140,
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#005a9c',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#005a9c',
    borderWidth: 1,
  },
});
