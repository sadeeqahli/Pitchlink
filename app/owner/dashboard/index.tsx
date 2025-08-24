
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  monthlyRevenue: number;
  activePitches: number;
}

export default function OwnerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    todayBookings: 0,
    monthlyRevenue: 0,
    activePitches: 0,
  });

  useEffect(() => {
    // Mock data - replace with API call
    setStats({
      totalBookings: 156,
      todayBookings: 8,
      monthlyRevenue: 2340000,
      activePitches: 3,
    });
  }, []);

  const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: any; color: string }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Owner Dashboard</Text>
        <Text style={styles.subtitle}>Manage your football pitches</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings.toString()} 
            icon="football" 
            color="#4CAF50" 
          />
          <StatCard 
            title="Today's Bookings" 
            value={stats.todayBookings.toString()} 
            icon="today" 
            color="#2196F3" 
          />
          <StatCard 
            title="Monthly Revenue" 
            value={`₦${stats.monthlyRevenue.toLocaleString()}`} 
            icon="cash" 
            color="#FF9800" 
          />
          <StatCard 
            title="Active Pitches" 
            value={stats.activePitches.toString()} 
            icon="business" 
            color="#9C27B0" 
          />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Add Manual Booking</Text>
            <Text style={styles.actionSubtext}>Limited to 2 per day</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create" size={24} color="#2196F3" />
            <Text style={styles.actionText}>List New Pitch</Text>
            <Text style={styles.actionSubtext}>Add a new football pitch</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#FF9800" />
            <Text style={styles.actionText}>View Analytics</Text>
            <Text style={styles.actionSubtext}>Business performance insights</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New booking confirmed</Text>
              <Text style={styles.activityTime}>Champions Arena - 2 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="card" size={20} color="#2196F3" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Payment received</Text>
              <Text style={styles.activityTime}>₦15,000 - 4 hours ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  actionSubtext: {
    fontSize: 12,
    color: '#666',
    position: 'absolute',
    left: 48,
    bottom: 8,
  },
  recentActivity: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  activityItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
