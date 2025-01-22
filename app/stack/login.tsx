import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, ToggleButton, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [userType, setUserType] = useState<'individual' | 'enterprise'>('individual');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [otpDetails, setOtpDetails] = useState({ otpId: ''});
  const [loginDetails, setLoginDetails] = useState({userId: ''});
  const [token, setToken] = useState(''); // New state for storing the token

  // Step 1: Handle Login
  const handleLogin = async () => {
    try {
      let payload;

      if (userType === 'enterprise') {
        if (!email || !role) {
          Alert.alert('Validation', 'Please enter both email and role');
          return;
        }
        payload = { role, email };
      } else {
        if (!phone || !name) {
          Alert.alert('Validation', 'Please enter both phone and name');
          return;
        }
        payload = { phone, name };
      }

      const loginResponse = await fetch('http://139.59.87.79:4030/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const loginData = await loginResponse.json();

      if (loginData.success && loginData.message === 'OTP verification is Pending') {

        console.log("login successful - now send otp");

        await handleSendOtp();  // calling send otp !!
        
        setLoginDetails({
          userId: loginData.data._id,
        });
        setIsOtpRequired(true);
      } else {
        Alert.alert('Error', loginData.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  // Step 2: Handle OTP Verification
  const handleOtpVerification = async () => {
    try {
      if (!otp) {
        Alert.alert('Validation', 'Please enter the OTP');
        return;
      }
      const otpResponse = await fetch('http://139.59.87.79:4030/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isTokenRequired: true,
          otp, // User-entered OTP
          userId: loginDetails.userId,
          otpId : otpDetails.otpId, // Assuming `_id` from login response serves as `otpId`
          role: role, // Use the first role if it's an array
        }),
      });
  
      const otpData = await otpResponse.json();
  
      if (otpData.success) {

        console.log("otp succcessful - now token")
        // Set the token to display on the screen
        setToken(otpData.data.token); // Save the token to the state

        // Pass the token directly to fetchProfile
        fetchProfile(otpData.data.token);
      } else {
        Alert.alert('Error', otpData.message || 'OTP verification failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during OTP verification.');
    }
  };
  
  const handleSendOtp = async () => {
    try {
      if (!otp) {
        Alert.alert('Validation', 'Please enter the OTP');
        return;
      }
  
      const otpResponse = await fetch('http://139.59.87.79:4030/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role, // User-entered OTP
          email,
        }),
      });
  
      const otpData = await otpResponse.json();
  
      if (otpData.success) {

        console.log("otp sent succcessful - now verify it ")
       
        setOtpDetails({otpId :otpData.data.otpId,});
        setIsOtpRequired(true);

      } else {
        Alert.alert('Error', otpData.message || 'OTP verification failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during OTP verification.');
    }
  };
  

  // // Step 3: Handle Token Verification
  // const handleTokenVerification = async (token) => {
  //   try {
  //     const tokenResponse = await fetch('http://139.59.87.79:4030/api/auth/verify-token', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token }), 
  //     });
  
  //     const tokenData = await tokenResponse.json();
  
  //     if (tokenData.success) {
  //       fetchProfile(token); 
  //     } else {
  //       Alert.alert('Error', tokenData.message || 'Token verification failed');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'An error occurred during token verification.');
  //   }
  // };
  

  // Step 4: Fetch Profile
  const fetchProfile = async (token: string) => {
    try {
      const profileResponse = await fetch('http://139.59.87.79:4030/api/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: `${token}`, // Use the token from OTP verification
          'Content-Type': 'application/json',
        },
      });
  
      const profileData = await profileResponse.json();
  
      if (profileData.success) {
        Alert.alert('Welcome', `Hello ${profileData.data.name}!`);
        navigation.navigate('../(tabs)/index'); // Navigate to the next screen
      } else {
        Alert.alert('Error', profileData.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching profile data.');
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Login as</Title>

      <ToggleButton.Row
        onValueChange={(value) => setUserType(value as 'individual' | 'enterprise')}
        value={userType}
        style={styles.toggleRow}
      >
        <ToggleButton icon="account" value="individual" style={styles.toggleButton} />
        <ToggleButton icon="briefcase" value="enterprise" style={styles.toggleButton} />
      </ToggleButton.Row>

      {!isOtpRequired ? (
        userType === 'enterprise' ? (
          <>
            <TextInput
              label="Role"
              value={role}
              onChangeText={setRole}
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </>
        ) : (
          <>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
            />
          </>
        )
      ) : (
        <TextInput
          label="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
        />
      )}

      <Button
        mode="outlined"
        onPress={!isOtpRequired ? handleLogin : handleOtpVerification}
        style={styles.loginButton}
        icon={!isOtpRequired ? 'login' : 'check'}
      >
        {!isOtpRequired ? 'Login' : 'Verify OTP'}
      </Button>

      {/* Display the token on the screen */}
      {token ? (
        <Text style={styles.tokenText}>Token: {token}</Text>
      ) : null}
    </ScrollView>
  );
}

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
  loginButton: {
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#005a9c',
    borderWidth: 1,
  },
});