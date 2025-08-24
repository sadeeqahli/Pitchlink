
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Booking {
  id: string;
  pitchName: string;
  customerName: string;
  date: string;
  time: string;
  duration: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
}

export default function OwnerBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed'>('all');

  useEffect(() => {
    // Mock booking data
    setBookings([
      {
        id: '1',
        pitchName: 'Champions Arena',
        customerName: 'Ahmed Ibrahim',
        date: '2024-01-16',
        time: '18:00',
        duration: 2,
        amount: 30000,
        status: 'confirmed',
        paymentMethod: 'Card',
      },
      {
        id: '2',
        pitchName: 'Green Field Sports',
        customerName: 'Emeka Johnson',
        date: '2024-01-16',
        time: '20:00',
        duration: 1,
        amount: 15000,
        status: 'pending',
        paymentMethod: 'Transfer',
      },
      {
        id: '3',
        pitchName: 'Elite Football Center',
        customerName: 'Kemi Adebayo',
        date: '2024-01-15',
        time: '16:00',
        duration: 3,
        amount: 45000,
        status: 'completed',
        paymentMethod: 'Card',
      },
      {
        id: '4',
        pitchName: 'Champions Arena',
        customerName: 'David Okafor',
        date: '2024-01-15',
        time: '14:00',
        duration: 2,
        amount: 30000,
        status: 'cancelled',
        paymentMethod: 'Card',
      },
    ]);
  }, []);

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const handleConfirmBooking = (bookingId: string) => {
    Alert.alert(
      'Confirm Booking',
      'Are you sure you want to confirm this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setBookings(prev =>
              prev.map(booking =>
                booking.id === bookingId
                  ? { ...booking, status: 'confirmed' as const }
                  : booking
              )
            );
          },
        },
      ]
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            setBookings(prev =>
              prev.map(booking =>
                booking.id === bookingId
                  ? { ...booking, status: 'cancelled' as const }
                  : booking
              )
            );
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#ff9800';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#ff4444';
      default: return '#666';
    }
  };

  const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.pitchName}>{item.pitchName}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time} ({item.duration}h)</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="card" size={16} color="#666" />
          <Text style={styles.detailText}>{item.paymentMethod}</Text>
        </View>
      </View>

      <View style={styles.bookingFooter}>
        <Text style={styles.amount}>₦{item.amount.toLocaleString()}</Text>
        <View style={styles.actionButtons}>
          {item.status === 'pending' && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.confirmButton]}
                onPress={() => handleConfirmBooking(item.id)}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => handleCancelBooking(item.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {item.status === 'confirmed' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleCancelBooking(item.id)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Booking Management</Text>
        <Text style={styles.subtitle}>Manage and track all bookings</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {['all', 'pending', 'confirmed', 'completed'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filter === status && styles.activeFilter]}
            onPress={() => setFilter(status as any)}
          >
            <Text style={[styles.filterText, filter === status && styles.activeFilterText]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookingsList: {
    padding: 20,
    gap: 15,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  bookingInfo: {
    flex: 1,
  },
  pitchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  customerName: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
