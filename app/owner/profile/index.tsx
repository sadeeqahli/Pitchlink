
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OwnerProfile() {
  const router = useRouter();
  const [ownerData, setOwnerData] = useState({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    bankAccount: '',
    notifications: true,
  });

  useEffect(() => {
    loadOwnerData();
  }, []);

  const loadOwnerData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      setOwnerData(prev => ({
        ...prev,
        businessName: name || '',
        email: email || '',
      }));
    } catch (error) {
      console.error('Error loading owner data:', error);
    }
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!');
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="business" size={60} color="#4CAF50" />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.businessName}>{ownerData.businessName}</Text>
        <Text style={styles.email}>{ownerData.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={ownerData.businessName}
            onChangeText={(text) => setOwnerData(prev => ({ ...prev, businessName: text }))}
            placeholder="Enter business name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={ownerData.phone}
            onChangeText={(text) => setOwnerData(prev => ({ ...prev, phone: text }))}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={ownerData.address}
            onChangeText={(text) => setOwnerData(prev => ({ ...prev, address: text }))}
            placeholder="Enter business address"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={ownerData.description}
            onChangeText={(text) => setOwnerData(prev => ({ ...prev, description: text }))}
            placeholder="Describe your business"
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bank Account Number</Text>
          <TextInput
            style={styles.input}
            value={ownerData.bankAccount}
            onChangeText={(text) => setOwnerData(prev => ({ ...prev, bankAccount: text }))}
            placeholder="Enter bank account number"
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={24} color="#4CAF50" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSubtitle}>Receive booking alerts</Text>
            </View>
          </View>
          <Switch
            value={ownerData.notifications}
            onValueChange={(value) => setOwnerData(prev => ({ ...prev, notifications: value }))}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={ownerData.notifications ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
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
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
