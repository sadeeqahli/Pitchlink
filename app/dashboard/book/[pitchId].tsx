import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
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
  description: string;
  amenities: string[];
  pricePerHour: number;
  rating: number;
  image: string;
}

interface Receipt {
  id: string;
  pitchName: string;
  date: string;
  timeSlots: string[];
  totalAmount: number;
  paymentMethod: string;
  transactionId: string;
}

export default function BookPitch() {
  const { pitchId } = useLocalSearchParams();
  const router = useRouter();
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    // Mock pitch data - replace with API call
    setPitch({
      id: pitchId as string,
      name: 'Champions Arena',
      location: 'Victoria Island, Lagos',
      description: 'Premium football pitch with professional grass and modern facilities.',
      amenities: ['Floodlights', 'Changing Room', 'Parking', 'Security'],
      pricePerHour: 15000,
      rating: 4.8,
      image: '🏟️',
    });

    // Mock time slots
    setTimeSlots([
      { id: '1', time: '08:00 - 09:00', available: true, price: 15000 },
      { id: '2', time: '09:00 - 10:00', available: true, price: 15000 },
      { id: '3', time: '10:00 - 11:00', available: false, price: 15000 },
      { id: '4', time: '11:00 - 12:00', available: true, price: 15000 },
      { id: '5', time: '14:00 - 15:00', available: true, price: 15000 },
      { id: '6', time: '15:00 - 16:00', available: true, price: 15000 },
      { id: '7', time: '16:00 - 17:00', available: false, price: 15000 },
      { id: '8', time: '17:00 - 18:00', available: true, price: 15000 },
    ]);
  }, [pitchId]);

  const toggleSlot = (slotId: string) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const calculateTotal = () => {
    return selectedSlots.length * (pitch?.pricePerHour || 0);
  };

  const handleBooking = () => {
    if (selectedSlots.length === 0) {
      Alert.alert('No Time Selected', 'Please select at least one time slot.');
      return;
    }
    setShowPayment(true);
  };

  const processPayment = (paymentMethod: string) => {
    setShowPayment(false);

    // Generate receipt
    const newReceipt: Receipt = {
      id: `RCP${Date.now()}`,
      pitchName: pitch?.name || '',
      date: selectedDate.toLocaleDateString(),
      timeSlots: selectedSlots.map(slotId => {
        const slot = timeSlots.find(s => s.id === slotId);
        return slot?.time || '';
      }),
      totalAmount: calculateTotal(),
      paymentMethod,
      transactionId: `TXN${Date.now()}`,
    };

    setReceipt(newReceipt);
    setShowReceipt(true);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setReceipt(null);
    setSelectedSlots([]);
    router.back();
  };

  if (!pitch) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.title}>Book Pitch</Text>
      </View>

      <View style={styles.pitchCard}>
        <View style={styles.pitchHeader}>
          <Text style={styles.pitchIcon}>{pitch.image}</Text>
          <View style={styles.pitchInfo}>
            <Text style={styles.pitchName}>{pitch.name}</Text>
            <Text style={styles.pitchLocation}>{pitch.location}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{pitch.rating}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.description}>{pitch.description}</Text>
        <View style={styles.amenitiesContainer}>
          {pitch.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bookingSection}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <Text style={styles.selectedDate}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View style={styles.slotsSection}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <View style={styles.slotsGrid}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.slotCard,
                !slot.available && styles.unavailableSlot,
                selectedSlots.includes(slot.id) && styles.selectedSlot,
              ]}
              onPress={() => slot.available && toggleSlot(slot.id)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.slotTime,
                !slot.available && styles.unavailableText,
                selectedSlots.includes(slot.id) && styles.selectedText,
              ]}>
                {slot.time}
              </Text>
              <Text style={[
                styles.slotPrice,
                !slot.available && styles.unavailableText,
                selectedSlots.includes(slot.id) && styles.selectedText,
              ]}>
                ₦{slot.price.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedSlots.length > 0 && (
        <View style={styles.summarySection}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Selected Slots:</Text>
            <Text style={styles.summaryValue}>{selectedSlots.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount:</Text>
            <Text style={styles.summaryTotal}>₦{calculateTotal().toLocaleString()}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity 
        style={[styles.bookButton, selectedSlots.length === 0 && styles.disabledButton]} 
        onPress={handleBooking}
        disabled={selectedSlots.length === 0}
      >
        <Text style={styles.bookButtonText}>
          {selectedSlots.length === 0 ? 'Select Time Slots' : `Book Now - ₦${calculateTotal().toLocaleString()}`}
        </Text>
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal visible={showPayment} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.paymentModal}>
            <Text style={styles.paymentTitle}>Choose Payment Method</Text>
            <TouchableOpacity style={styles.paymentOption} onPress={() => processPayment('Bank Transfer')}>
              <Ionicons name="card" size={24} color="#4CAF50" />
              <Text style={styles.paymentText}>Bank Transfer</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={() => processPayment('Wallet')}>
              <Ionicons name="wallet" size={24} color="#4CAF50" />
              <Text style={styles.paymentText}>Wallet</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={() => processPayment('Card')}>
              <Ionicons name="card-outline" size={24} color="#4CAF50" />
              <Text style={styles.paymentText}>Debit/Credit Card</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelPayment} onPress={() => setShowPayment(false)}>
              <Text style={styles.cancelPaymentText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Receipt Modal */}
      <Modal visible={showReceipt} animationType="slide">
        <View style={styles.receiptContainer}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptTitle}>Booking Receipt</Text>
            <TouchableOpacity onPress={closeReceipt}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {receipt && (
            <ScrollView style={styles.receiptContent}>
              <View style={styles.receiptSuccess}>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                <Text style={styles.successText}>Payment Successful!</Text>
              </View>

              <View style={styles.receiptDetails}>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Receipt ID:</Text>
                  <Text style={styles.receiptValue}>{receipt.id}</Text>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Pitch:</Text>
                  <Text style={styles.receiptValue}>{receipt.pitchName}</Text>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Date:</Text>
                  <Text style={styles.receiptValue}>{receipt.date}</Text>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Time Slots:</Text>
                  <View style={styles.slotsContainer}>
                    {receipt.timeSlots.map((slot, index) => (
                      <Text key={index} style={styles.slotText}>{slot}</Text>
                    ))}
                  </View>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Payment Method:</Text>
                  <Text style={styles.receiptValue}>{receipt.paymentMethod}</Text>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Transaction ID:</Text>
                  <Text style={styles.receiptValue}>{receipt.transactionId}</Text>
                </View>
                <View style={[styles.receiptRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total Amount:</Text>
                  <Text style={styles.totalAmount}>₦{receipt.totalAmount.toLocaleString()}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.doneButton} onPress={closeReceipt}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScrollView>
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
  backButton: {
    padding: 5,
  },
  pitchCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pitchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pitchIcon: {
    fontSize: 60,
    marginRight: 15,
  },
  pitchInfo: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  bookingSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  selectedDate: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  slotsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  slotCard: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '47%', // Adjusted for better spacing in a two-column layout
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
  slotTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  slotPrice: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  unavailableText: {
    color: '#999',
  },
  selectedText: {
    color: '#4CAF50',
  },
  summarySection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  paymentModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  cancelPayment: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  cancelPaymentText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: 'bold',
  },
  receiptContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  receiptContent: {
    flex: 1,
    padding: 20,
  },
  receiptSuccess: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successText: {
    fontSize: 22,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 10,
  },
  receiptDetails: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  receiptLabel: {
    fontSize: 16,
    color: '#666',
  },
  receiptValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flexShrink: 1, // Allow text to wrap if it's long
    textAlign: 'right', // Align text to the right
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end', // Align slots to the right
  },
  slotText: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 5,
    marginTop: 5,
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});