
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AboutPage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About PitchLink</Text>
        <Text style={styles.subtitle}>
          Connecting Football Enthusiasts Across Nigeria
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            PitchLink is dedicated to making football more accessible by connecting 
            players with quality pitches across Nigeria. We believe every football 
            enthusiast deserves easy access to great playing facilities.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>For Players</Text>
          <Text style={styles.sectionText}>
            • Search and discover pitches by location{'\n'}
            • View detailed pitch information and amenities{'\n'}
            • Check real-time availability{'\n'}
            • Secure online booking and payment{'\n'}
            • Digital receipts and booking history
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>For Pitch Owners</Text>
          <Text style={styles.sectionText}>
            • List and manage your pitches{'\n'}
            • Calendar-based booking management{'\n'}
            • Revenue tracking and analytics{'\n'}
            • Automated payout system{'\n'}
            • Business insights and reporting
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose PitchLink?</Text>
          <Text style={styles.sectionText}>
            • Trusted and secure platform{'\n'}
            • Real-time booking system{'\n'}
            • Comprehensive business tools{'\n'}
            • Nationwide coverage{'\n'}
            • 24/7 customer support
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => router.back()}
        >
          <Text style={styles.linkText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    paddingVertical: 10,
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
