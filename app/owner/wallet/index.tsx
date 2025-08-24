
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

export default function OwnerWallet() {
  const [balance, setBalance] = useState(125000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Mock transaction data
    setTransactions([
      {
        id: '1',
        type: 'credit',
        amount: 30000,
        description: 'Booking payment - Champions Arena',
        date: '2024-01-15T10:30:00Z',
        status: 'completed',
      },
      {
        id: '2',
        type: 'credit',
        amount: 25000,
        description: 'Booking payment - Green Field',
        date: '2024-01-14T16:45:00Z',
        status: 'completed',
      },
      {
        id: '3',
        type: 'debit',
        amount: 5000,
        description: 'Platform fee',
        date: '2024-01-14T17:00:00Z',
        status: 'completed',
      },
      {
        id: '4',
        type: 'credit',
        amount: 40000,
        description: 'Booking payment - Elite Center',
        date: '2024-01-13T14:20:00Z',
        status: 'pending',
      },
    ]);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons
          name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'}
          size={20}
          color={item.type === 'credit' ? '#4CAF50' : '#ff4444'}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        <Text style={[styles.transactionStatus, { color: item.status === 'completed' ? '#4CAF50' : '#ff9800' }]}>
          {item.status}
        </Text>
      </View>
      <Text style={[styles.transactionAmount, { color: item.type === 'credit' ? '#4CAF50' : '#ff4444' }]}>
        {item.type === 'credit' ? '+' : '-'}₦{item.amount.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₦{balance.toLocaleString()}</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card" size={20} color="#fff" />
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={20} color="#fff" />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.quickStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>₦75,000</Text>
          <Text style={styles.statLabel}>This Week</Text>
          <Ionicons name="trending-up" size={16} color="#4CAF50" />
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>₦320,000</Text>
          <Text style={styles.statLabel}>This Month</Text>
          <Ionicons name="trending-up" size={16} color="#4CAF50" />
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>₦15,000</Text>
          <Text style={styles.statLabel}>Platform Fees</Text>
          <Ionicons name="trending-down" size={16} color="#ff4444" />
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.transactionsList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  balanceCard: {
    margin: 20,
    marginTop: 60,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  balanceLabel: {
    color: '#E8F5E8',
    fontSize: 16,
    marginBottom: 10,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  quickStats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  transactionsList: {
    gap: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
