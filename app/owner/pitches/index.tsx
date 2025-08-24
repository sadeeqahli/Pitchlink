
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Pitch {
  id: string;
  name: string;
  location: string;
  price: number;
  status: 'active' | 'inactive';
  totalBookings: number;
  rating: number;
}

export default function OwnerPitches() {
  const [pitches, setPitches] = useState<Pitch[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    setPitches([
      {
        id: '1',
        name: 'Champions Arena',
        location: 'Victoria Island, Lagos',
        price: 15000,
        status: 'active',
        totalBookings: 78,
        rating: 4.8,
      },
      {
        id: '2',
        name: 'Green Field Sports',
        location: 'Ikeja, Lagos',
        price: 12000,
        status: 'active',
        totalBookings: 45,
        rating: 4.5,
      },
      {
        id: '3',
        name: 'Elite Football Center',
        location: 'Lekki, Lagos',
        price: 18000,
        status: 'inactive',
        totalBookings: 33,
        rating: 4.9,
      },
    ]);
  }, []);

  const renderPitch = ({ item }: { item: Pitch }) => (
    <View style={styles.pitchCard}>
      <View style={styles.pitchHeader}>
        <View>
          <Text style={styles.pitchName}>{item.name}</Text>
          <Text style={styles.pitchLocation}>{item.location}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.pitchStats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>₦{item.price.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Price/Hour</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.totalBookings}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      
      <View style={styles.pitchActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="create" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="calendar" size={16} color="#2196F3" />
          <Text style={styles.actionText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="analytics" size={16} color="#FF9800" />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Pitches</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={pitches}
        renderItem={renderPitch}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  pitchCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pitchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  pitchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pitchLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pitchStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 15,
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  pitchActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
});
