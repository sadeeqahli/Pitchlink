
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Switch, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: null,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      setUserData(prev => ({
        ...prev,
        name: name || '',
        email: email || '',
      }));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditing(false);
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

  const handleImagePicker = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Camera selected') },
        { text: 'Gallery', onPress: () => console.log('Gallery selected') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Header with Dark Mode Toggle */}
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity 
            style={styles.darkModeButton}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Ionicons 
              name={isDarkMode ? 'sunny' : 'moon'} 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleImagePicker}>
            {userData.profileImage ? (
              <Image source={{ uri: userData.profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={60} color="#fff" />
              </View>
            )}
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons name={isEditing ? 'checkmark' : 'create'} size={20} color="#fff" />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Profile Information */}
      <View style={[styles.section, isDarkMode && styles.darkSection]}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Personal Information
        </Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && styles.darkText]}>Full Name</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            value={userData.name}
            onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
            placeholder="Enter your full name"
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && styles.darkText]}>Phone Number</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            value={userData.phone}
            onChangeText={(text) => setUserData(prev => ({ ...prev, phone: text }))}
            placeholder="Enter your phone number"
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            keyboardType="phone-pad"
            editable={isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && styles.darkText]}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea, isDarkMode && styles.darkInput]}
            value={userData.bio}
            onChangeText={(text) => setUserData(prev => ({ ...prev, bio: text }))}
            placeholder="Tell us about yourself"
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            multiline
            numberOfLines={4}
            editable={isEditing}
          />
        </View>
      </View>

      {/* Settings */}
      <View style={[styles.section, isDarkMode && styles.darkSection]}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="location" size={24} color="#4CAF50" />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, isDarkMode && styles.darkText]}>
                Location Sharing
              </Text>
              <Text style={[styles.settingSubtitle, isDarkMode && styles.darkText]}>
                Find pitches near you
              </Text>
            </View>
          </View>
          <Switch
            value={locationSharing}
            onValueChange={setLocationSharing}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={locationSharing ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={24} color="#2196F3" />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, isDarkMode && styles.darkText]}>
                Push Notifications
              </Text>
              <Text style={[styles.settingSubtitle, isDarkMode && styles.darkText]}>
                Booking updates and alerts
              </Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, isDarkMode && styles.darkSection]}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/dashboard/community')}>
          <Ionicons name="people" size={24} color="#4CAF50" />
          <Text style={[styles.actionText, isDarkMode && styles.darkText]}>Join Community</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/dashboard/history')}>
          <Ionicons name="time" size={24} color="#FF9800" />
          <Text style={[styles.actionText, isDarkMode && styles.darkText]}>Booking History</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('Help', 'Contact support')}>
          <Ionicons name="help-circle" size={24} color="#2196F3" />
          <Text style={[styles.actionText, isDarkMode && styles.darkText]}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  darkModeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#2e2e2e',
    borderColor: '#444',
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
