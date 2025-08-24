
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Booking {
  id: string;
  pitchName: string;
  date: string;
  time: string;
  duration: number;
  cost: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  splitPayment?: boolean;
  teammates?: number;
}

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    setBookings([
      {
        id: '1',
        pitchName: 'Champions Arena',
        date: '2024-01-20',
        time: '18:00 - 20:00',
        duration: 2,
        cost: 30000,
        status: 'upcoming',
        splitPayment: true,
        teammates: 3,
      },
      {
        id: '2',
        pitchName: 'Green Field Sports',
        date: '2024-01-15',
        time: '16:00 - 17:00',
        duration: 1,
        cost: 12000,
        status: 'completed',
      },
      {
        id: '3',
        pitchName: 'Elite Football Center',
        date: '2024-01-10',
        time: '19:00 - 21:00',
        duration: 2,
        cost: 36000,
        status: 'completed',
        splitPayment: true,
        teammates: 5,
      },
    ]);
  }, []);

  const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.pitchName}>{item.pitchName}</Text>
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
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color="#666" />
          <Text style={styles.detailText}>₦{item.cost.toLocaleString()}</Text>
        </View>
        {item.splitPayment && (
          <View style={styles.detailRow}>
            <Ionicons name="people" size={16} color="#4CAF50" />
            <Text style={[styles.detailText, { color: '#4CAF50' }]}>
              Split with {item.teammates} teammates
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.bookingActions}>
        {item.status === 'completed' && (
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="receipt" size={16} color="#4CAF50" />
            <Text style={styles.actionText}>View Receipt</Text>
          </TouchableOpacity>
        )}
        {item.status === 'upcoming' && (
          <>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="create" size={16} color="#2196F3" />
              <Text style={styles.actionText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn}>
              <Ionicons name="close-circle" size={16} color="#F44336" />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#2196F3';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Booking History</Text>
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBooking}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  listContainer: {
    padding: 20,
  },
  bookingCard: {
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  pitchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  bookingDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#ffebee',
  },
  cancelText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#F44336',
  },
});
