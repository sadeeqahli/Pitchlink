import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      const darkMode = await AsyncStorage.getItem('darkMode');
      const location = await AsyncStorage.getItem('locationEnabled');

      if (name) setUserName(name);
      if (email) setUserEmail(email);
      if (darkMode) setIsDarkMode(JSON.parse(darkMode));
      if (location) setLocationEnabled(JSON.parse(location));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleDarkModeToggle = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    Alert.alert('Theme Changed', `${value ? 'Dark' : 'Light'} mode activated!`);
  };

  const handleLocationToggle = async (value: boolean) => {
    setLocationEnabled(value);
    await AsyncStorage.setItem('locationEnabled', JSON.stringify(value));
    if (value) {
      Alert.alert('Location Enabled', 'You can now find pitches near your location!');
    } else {
      Alert.alert('Location Disabled', 'Location services turned off.');
    }
  };

  const handleEditProfile = () => {
    router.push('/dashboard/edit-profile');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            router.replace('/');
          },
        },
      ]
    );
  };

  const ProfileOption = ({ icon, title, subtitle, onPress, rightElement }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress && !rightElement}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon as any} size={20} color="#4CAF50" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={20} color="#ccc" />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.darkModeToggle} onPress={() => handleDarkModeToggle(!isDarkMode)}>
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color="#4CAF50" />
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={60} color="#4CAF50" />
          <TouchableOpacity style={styles.editAvatarButton} onPress={handleEditProfile}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ProfileOption
          icon="person-circle"
          title="Edit Profile"
          subtitle="Update picture, bio and personal info"
          onPress={handleEditProfile}
        />
        <ProfileOption
          icon="card"
          title="Payment Methods"
          subtitle="Manage your payment options"
          onPress={() => Alert.alert('Coming Soon', 'Payment methods will be available soon!')}
        />
        <ProfileOption
          icon="shield-checkmark"
          title="Privacy & Security"
          subtitle="Manage your account security"
          onPress={() => Alert.alert('Coming Soon', 'Privacy settings will be available soon!')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <ProfileOption
          icon="notifications"
          title="Push Notifications"
          subtitle="Get notified about bookings"
          rightElement={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          }
        />
        <ProfileOption
          icon="location"
          title="Location Services"
          subtitle={locationEnabled ? "Finding pitches near you" : "Enable to find nearby pitches"}
          rightElement={
            <Switch
              value={locationEnabled}
              onValueChange={handleLocationToggle}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={locationEnabled ? '#fff' : '#f4f3f4'}
            />
          }
        />
        <ProfileOption
          icon="moon"
          title="Dark Mode"
          subtitle={isDarkMode ? "Dark theme active" : "Light theme active"}
          rightElement={
            <Switch
              value={isDarkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <ProfileOption
          icon="help-circle"
          title="Help & FAQ"
          subtitle="Get help and find answers"
          onPress={() => Alert.alert('Help', 'Help section will be available soon!')}
        />
        <ProfileOption
          icon="mail"
          title="Contact Support"
          subtitle="Get in touch with our team"
          onPress={() => Alert.alert('Support', 'Contact support will be available soon!')}
        />
        <ProfileOption
          icon="star"
          title="Rate Pitchlink"
          subtitle="Share your experience"
          onPress={() => Alert.alert('Rating', 'Rating feature will be available soon!')}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#FF5252" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
  },
  darkModeToggle: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#4CAF50',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FF5252',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomSpacing: {
    height: 100,
  },
});