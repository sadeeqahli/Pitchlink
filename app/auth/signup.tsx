
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen() {
  const [userType, setUserType] = useState<'player' | 'owner'>('player');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Demo signup logic - replace with actual registration
    Alert.alert('Success', 'Account created successfully!', [
      { text: 'OK', onPress: () => router.push('/auth/login') }
    ]);
  };

  return (
    <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join PitchLink today</Text>

        <View style={styles.userTypeContainer}>
          <TouchableOpacity 
            style={[styles.userTypeButton, userType === 'player' && styles.activeUserType]}
            onPress={() => setUserType('player')}
          >
            <Text style={[styles.userTypeText, userType === 'player' && styles.activeUserTypeText]}>
              Player
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.userTypeButton, userType === 'owner' && styles.activeUserType]}
            onPress={() => setUserType('owner')}
          >
            <Text style={[styles.userTypeText, userType === 'owner' && styles.activeUserTypeText]}>
              Pitch Owner
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={userType === 'owner' ? 'Business Name' : 'Full Name'}
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.signupButton}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 5,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeUserType: {
    backgroundColor: 'white',
  },
  userTypeText: {
    color: 'white',
    fontWeight: '600',
  },
  activeUserTypeText: {
    color: '#4CAF50',
  },
  form: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
  },
  loginLink: {
    color: 'white',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
