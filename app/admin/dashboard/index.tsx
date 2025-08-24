
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface AdminStats {
  totalUsers: number;
  totalPitches: number;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  pendingReports: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPitches: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    pendingReports: 0,
  });

  useEffect(() => {
    // Mock data - replace with API call
    setStats({
      totalUsers: 1250,
      totalPitches: 89,
      totalBookings: 3456,
      totalRevenue: 45600000,
      activeUsers: 856,
      pendingReports: 3,
    });
  }, []);

  const StatCard = ({ title, value, icon, color, trend }: { 
    title: string; 
    value: string; 
    icon: any; 
    color: string; 
    trend?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {trend && <Text style={styles.statTrend}>{trend}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Platform overview and management</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers.toLocaleString()} 
            icon="people" 
            color="#4CAF50"
            trend="+12% this month"
          />
          <StatCard 
            title="Active Users" 
            value={stats.activeUsers.toLocaleString()} 
            icon="person-circle" 
            color="#2196F3"
            trend="68% of total"
          />
          <StatCard 
            title="Total Pitches" 
            value={stats.totalPitches.toString()} 
            icon="business" 
            color="#FF9800"
            trend="+5 this week"
          />
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings.toLocaleString()} 
            icon="calendar" 
            color="#9C27B0"
            trend="+8% this week"
          />
          <StatCard 
            title="Platform Revenue" 
            value={`₦${(stats.totalRevenue / 1000000).toFixed(1)}M`} 
            icon="trending-up" 
            color="#4CAF50"
            trend="+15% this month"
          />
          <StatCard 
            title="Pending Reports" 
            value={stats.pendingReports.toString()} 
            icon="warning" 
            color="#F44336"
            trend="Needs attention"
          />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Platform Management</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#4CAF50" />
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>User Management</Text>
              <Text style={styles.actionSubtext}>Manage players and pitch owners</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#2196F3" />
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>Platform Analytics</Text>
              <Text style={styles.actionSubtext}>Detailed usage and performance</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card" size={24} color="#FF9800" />
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>Revenue Tracking</Text>
              <Text style={styles.actionSubtext}>Commission and payouts</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="shield-checkmark" size={24} color="#9C27B0" />
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>Content Moderation</Text>
              <Text style={styles.actionSubtext}>Review reports and disputes</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{stats.pendingReports}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Platform Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="person-add" size={20} color="#4CAF50" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New pitch owner registered</Text>
              <Text style={styles.activityTime}>Elite Sports Arena - 1 hour ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="warning" size={20} color="#FF9800" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New report submitted</Text>
              <Text style={styles.activityTime}>User complaint - 3 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="cash" size={20} color="#2196F3" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Payout processed</Text>
              <Text style={styles.activityTime}>₦125,000 to Champions Arena - 6 hours ago</Text>
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
  statsGrid: {
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
  statTrend: {
    fontSize: 10,
    color: '#4CAF50',
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
  actionContent: {
    flex: 1,
    marginLeft: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actionSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  notificationBadge: {
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
