
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SignupPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'player' | 'owner'>('player');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data and redirect to appropriate dashboard
      await AsyncStorage.setItem('userToken', 'mock-token');
      await AsyncStorage.setItem('userRole', userType);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userName', name);

      // Navigate based on role
      switch (userType) {
        case 'owner':
          router.replace('/owner/dashboard');
          break;
        default:
          router.replace('/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#4CAF50', '#2E7D32', '#1B5E20']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Ionicons name="football" size={50} color="#fff" />
                <Text style={styles.logoText}>PITCHLINK</Text>
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join the community</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.userTypeContainer}>
                <TouchableOpacity
                  style={[styles.userTypeButton, userType === 'player' && styles.activeUserType]}
                  onPress={() => setUserType('player')}
                >
                  <Ionicons 
                    name="person" 
                    size={24} 
                    color={userType === 'player' ? '#fff' : '#4CAF50'} 
                  />
                  <Text style={[styles.userTypeText, userType === 'player' && styles.activeUserTypeText]}>
                    Player
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.userTypeButton, userType === 'owner' && styles.activeUserType]}
                  onPress={() => setUserType('owner')}
                >
                  <Ionicons 
                    name="business" 
                    size={24} 
                    color={userType === 'owner' ? '#fff' : '#4CAF50'} 
                  />
                  <Text style={[styles.userTypeText, userType === 'owner' && styles.activeUserTypeText]}>
                    Pitch Owner
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={userType === 'owner' ? "Business Name" : "Full Name"}
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.button}
                onPress={handleSignup}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#4CAF50', '#2E7D32']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.signupText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    letterSpacing: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E8',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  activeUserType: {
    backgroundColor: '#4CAF50',
  },
  userTypeText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 8,
    fontWeight: '600',
  },
  activeUserTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  button: {
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonGradient: {
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
  },
  signupText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
