
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutPage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>About PitchLink</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          PitchLink is designed to bridge the gap between football players and pitch owners across Nigeria. 
          We provide a seamless, centralized marketplace for finding, booking, and managing football pitches.
        </Text>

        <Text style={styles.sectionTitle}>For Players</Text>
        <Text style={styles.text}>
          • Find quality pitches by location{'\n'}
          • View detailed amenities and facilities{'\n'}
          • Check real-time availability{'\n'}
          • Book securely online{'\n'}
          • Track your booking history
        </Text>

        <Text style={styles.sectionTitle}>For Pitch Owners</Text>
        <Text style={styles.text}>
          • List and manage your pitches{'\n'}
          • Handle booking calendars efficiently{'\n'}
          • Track revenue and analytics{'\n'}
          • Manage payouts seamlessly{'\n'}
          • Gain business insights
        </Text>

        <Text style={styles.sectionTitle}>Why Choose PitchLink?</Text>
        <Text style={styles.text}>
          We understand the passion for football in Nigeria and the challenges of finding and managing quality pitches. 
          PitchLink brings technology to grassroots football, making it easier for everyone to play the beautiful game.
        </Text>

        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.getStartedText}>Get Started Today</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
