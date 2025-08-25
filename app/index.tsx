
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          router.replace('/onboarding');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    return (
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.loadingContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>P</Text>
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e3c72', '#2a5298', '#4CAF50']}
        style={styles.header}
      >
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>P</Text>
          </View>
          <Text style={styles.brandName}>PITCHLINK</Text>
          <Text style={styles.tagline}>
            Connect. Book. Play. Your Gateway to Football Pitches
          </Text>
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Find Your Perfect Pitch</Text>
          <Text style={styles.heroSubtitle}>
            Discover premium football pitches across Nigeria. Book instantly, 
            play passionately, and connect with fellow football enthusiasts.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Why Choose PitchLink?</Text>
          
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="location" size={30} color="#4CAF50" />
              </View>
              <Text style={styles.featureTitle}>Find Nearby</Text>
              <Text style={styles.featureDescription}>
                Discover quality pitches in your area with real-time availability
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="card" size={30} color="#2196F3" />
              </View>
              <Text style={styles.featureTitle}>Secure Payment</Text>
              <Text style={styles.featureDescription}>
                Safe and instant transactions with multiple payment options
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="people" size={30} color="#FF9800" />
              </View>
              <Text style={styles.featureTitle}>Build Community</Text>
              <Text style={styles.featureDescription}>
                Connect with players, form teams, and split costs together
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="business" size={30} color="#9C27B0" />
              </View>
              <Text style={styles.featureTitle}>For Owners</Text>
              <Text style={styles.featureDescription}>
                Manage your pitches, track revenue, and grow your business
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Play?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of football enthusiasts nationwide
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push('/auth/signup')}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.buttonGradient}
              >
                <Ionicons name="person-add" size={20} color="#fff" />
                <Text style={styles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/auth/login')}
            >
              <Ionicons name="log-in" size={20} color="#4CAF50" />
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Active Pitches</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Happy Players</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25K+</Text>
            <Text style={styles.statLabel}>Successful Bookings</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/admin/login')}>
            <Ionicons name="shield-checkmark" size={16} color="#666" />
            <Text style={styles.adminButtonText}>Admin Access</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/about')}>
            <Text style={styles.linkText}>Learn More About PitchLink</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    minHeight: height * 0.6,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e3c72',
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  ctaSection: {
    backgroundColor: '#f8f9fa',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    overflow: 'hidden',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#4CAF50',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginBottom: 15,
  },
  adminButtonText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
