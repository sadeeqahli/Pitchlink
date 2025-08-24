
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

interface Pitch {
  id: string;
  name: string;
  location: string;
  price: number;
  amenities: string[];
  rating: number;
  image: string;
}

export default function BookPitch() {
  const { pitchId } = useLocalSearchParams();
  const router = useRouter();
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    setPitch({
      id: pitchId as string,
      name: 'Champions Arena',
      location: 'Victoria Island, Lagos',
      price: 15000,
      amenities: ['Floodlights', 'Changing Room', 'Parking'],
      rating: 4.8,
      image: '🏟️',
    });

    setTimeSlots([
      { id: '1', time: '08:00 - 09:00', available: true, price: 15000 },
      { id: '2', time: '09:00 - 10:00', available: true, price: 15000 },
      { id: '3', time: '10:00 - 11:00', available: false, price: 15000 },
      { id: '4', time: '16:00 - 17:00', available: true, price: 15000 },
      { id: '5', time: '17:00 - 18:00', available: true, price: 15000 },
      { id: '6', time: '18:00 - 19:00', available: true, price: 15000 },
      { id: '7', time: '19:00 - 20:00', available: true, price: 15000 },
      { id: '8', time: '20:00 - 21:00', available: true, price: 15000 },
    ]);
  }, [pitchId]);

  const toggleSlot = (slotId: string) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const getTotalCost = () => {
    return selectedSlots.reduce((total, slotId) => {
      const slot = timeSlots.find(s => s.id === slotId);
      return total + (slot?.price || 0);
    }, 0);
  };

  const handleBooking = () => {
    if (selectedSlots.length === 0) {
      Alert.alert('Error', 'Please select at least one time slot');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      `Book ${selectedSlots.length} slot(s) for ₦${getTotalCost().toLocaleString()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            Alert.alert('Success', 'Booking confirmed!');
            router.push('/dashboard/history');
          }
        }
      ]
    );
  };

  if (!pitch) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Book Pitch</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pitchInfo}>
          <Text style={styles.pitchIcon}>{pitch.image}</Text>
          <View style={styles.pitchDetails}>
            <Text style={styles.pitchName}>{pitch.name}</Text>
            <Text style={styles.pitchLocation}>{pitch.location}</Text>
            <View style={styles.pitchRating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{pitch.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.amenitiesContainer}>
          {pitch.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Time Slots</Text>
          <Text style={styles.priceInfo}>₦{pitch.price.toLocaleString()} per hour</Text>
        </View>

        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlot,
                !slot.available && styles.unavailableSlot,
                selectedSlots.includes(slot.id) && styles.selectedSlot
              ]}
              onPress={() => slot.available && toggleSlot(slot.id)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.timeSlotText,
                !slot.available && styles.unavailableText,
                selectedSlots.includes(slot.id) && styles.selectedText
              ]}>
                {slot.time}
              </Text>
              {!slot.available && (
                <Text style={styles.bookedText}>Booked</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {selectedSlots.length > 0 && (
          <View style={styles.bookingSummary}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time Slots:</Text>
              <Text style={styles.summaryValue}>{selectedSlots.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Cost:</Text>
              <Text style={styles.summaryTotal}>₦{getTotalCost().toLocaleString()}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {selectedSlots.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookButtonText}>
              Book Now - ₦{getTotalCost().toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pitchInfo: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pitchIcon: {
    fontSize: 60,
    marginRight: 15,
  },
  pitchDetails: {
    flex: 1,
  },
  pitchName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pitchLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  pitchRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  amenitiesContainer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  amenityTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  priceInfo: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  timeSlotsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  timeSlot: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: '45%',
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  unavailableSlot: {
    backgroundColor: '#f0f0f0',
    opacity: 0.5,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedText: {
    color: '#4CAF50',
  },
  unavailableText: {
    color: '#999',
  },
  bookedText: {
    fontSize: 10,
    color: '#F44336',
    marginTop: 2,
  },
  bookingSummary: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
