
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.background}
      >
        <View style={styles.content}>
          {/* Logo placeholder - replace with your actual logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>⚽</Text>
            <Text style={styles.logoText}>PitchLink</Text>
          </View>

          <Text style={styles.tagline}>
            Connect. Book. Play.
          </Text>

          <Text style={styles.description}>
            Find and book football pitches across Nigeria with ease. 
            Whether you're a player looking for a pitch or an owner wanting to manage your facility.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/about')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Learn More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🏆</Text>
              <Text style={styles.featureText}>Find Quality Pitches</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📅</Text>
              <Text style={styles.featureText}>Easy Booking</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💰</Text>
              <Text style={styles.featureText}>Secure Payments</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 80,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'white',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },
  secondaryButtonText: {
    color: 'white',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  featureText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});
