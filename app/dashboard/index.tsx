import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Pitch {
  id: string;
  name: string;
  location: string;
  price: number;
  amenities: string[];
  rating: number;
  image: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [pitches, setPitches] = useState<Pitch[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    setPitches([
      {
        id: '1',
        name: 'Champions Arena',
        location: 'Victoria Island, Lagos',
        price: 15000,
        amenities: ['Floodlights', 'Changing Room', 'Parking'],
        rating: 4.8,
        image: '🏟️',
      },
      {
        id: '2',
        name: 'Green Field Sports',
        location: 'Ikeja, Lagos',
        price: 12000,
        amenities: ['Floodlights', 'Water', 'Security'],
        rating: 4.5,
        image: '⚽',
      },
      {
        id: '3',
        name: 'Elite Football Center',
        location: 'Lekki, Lagos',
        price: 18000,
        amenities: ['Floodlights', 'Changing Room', 'Parking', 'Canteen'],
        rating: 4.9,
        image: '🏟️',
      },
    ]);
  }, []);

  const filteredPitches = pitches.filter(pitch =>
    pitch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pitch.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookPress = (pitchId: string) => {
    Alert.alert('Booking Confirmed', `You have successfully booked pitch ${pitchId}!`);
    // In a real app, you would navigate to a confirmation screen or update state
    // router.push(`/dashboard/book/${pitchId}`); // This would navigate to a booking detail page
  };

  const handleFindTeamPress = () => {
    Alert.alert('Find Team', 'This feature is coming soon!');
    // In a real app, you would navigate to a team finding screen
    // router.push('/dashboard/find-team');
  };


  const renderPitch = ({ item }: { item: Pitch }) => (
    <TouchableOpacity
      style={styles.pitchCard}
      onPress={() => router.push(`/dashboard/book/${item.id}`)}
    >
      <View style={styles.pitchHeader}>
        <Text style={styles.pitchIcon}>{item.image}</Text>
        <View style={styles.pitchInfo}>
          <Text style={styles.pitchName}>{item.name}</Text>
          <Text style={styles.pitchLocation}>{item.location}</Text>
        </View>
        <View style={styles.pitchRating}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.amenitiesContainer}>
        {item.amenities.map((amenity, index) => (
          <View key={index} style={styles.amenityTag}>
            <Text style={styles.amenityText}>{amenity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.pitchFooter}>
        <Text style={styles.priceText}>₦{item.price.toLocaleString()}/hour</Text>
        <View style={styles.bookActions}>
          <TouchableOpacity style={styles.teamButton} onPress={handleFindTeamPress}>
            <Ionicons name="people" size={16} color="#4CAF50" />
            <Text style={styles.teamButtonText}>Find Team</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton} onPress={() => handleBookPress(item.id)}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Pitch</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.communitySection}>
        <View style={styles.communitySectionHeader}>
          <Text style={styles.communityTitle}>Community</Text>
          <TouchableOpacity onPress={() => router.push('/dashboard/community')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.communityScroll}>
          <TouchableOpacity style={styles.communityCard} onPress={() => router.push('/dashboard/find-players')}>
            <Ionicons name="people" size={24} color="#4CAF50" />
            <Text style={styles.communityCardTitle}>Find Players</Text>
            <Text style={styles.communityCardText}>Join a team</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.communityCard} onPress={() => router.push('/dashboard/create-team')}>
            <Ionicons name="add-circle" size={24} color="#2196F3" />
            <Text style={styles.communityCardTitle}>Create Team</Text>
            <Text style={styles.communityCardText}>Build your squad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.communityCard} onPress={() => router.push('/dashboard/split-payment')}>
            <Ionicons name="card" size={24} color="#FF9800" />
            <Text style={styles.communityCardTitle}>Split Payment</Text>
            <Text style={styles.communityCardText}>Share costs</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={filteredPitches}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
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
    alignItems: 'center',
    marginBottom: 10,
  },
  pitchIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  pitchInfo: {
    flex: 1,
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
  pitchRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  amenityTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  pitchFooter: {
    flexDirection: 'column',
    gap: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bookActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  teamButtonText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  communitySection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 10,
  },
  communitySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  communityScroll: {
    paddingLeft: 20,
  },
  communityCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  communityCardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  communityCardText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
});