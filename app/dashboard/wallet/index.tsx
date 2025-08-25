
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

export default function Wallet() {
  const router = useRouter();
  const [balance, setBalance] = useState(25000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'wallet' | 'split'>('wallet');
  const [splitAmount, setSplitAmount] = useState('');
  const [friends, setFriends] = useState(['John Doe', 'Jane Smith', 'Mike Johnson']);

  useEffect(() => {
    // Mock transaction data
    setTransactions([
      {
        id: '1',
        type: 'credit',
        amount: 15000,
        description: 'Money added to wallet',
        date: '2024-01-15T10:30:00Z',
        status: 'completed',
      },
      {
        id: '2',
        type: 'debit',
        amount: 8000,
        description: 'Pitch booking - Champions Arena',
        date: '2024-01-14T16:45:00Z',
        status: 'completed',
      },
      {
        id: '3',
        type: 'credit',
        amount: 18000,
        description: 'Split payment received',
        date: '2024-01-13T14:20:00Z',
        status: 'completed',
      },
    ]);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleAddMoney = () => {
    Alert.alert('Add Money', 'Redirect to payment gateway');
  };

  const handleWithdraw = () => {
    Alert.alert('Withdraw', 'Withdraw money to bank account');
  };

  const handleSplitPayment = () => {
    if (!splitAmount) {
      Alert.alert('Error', 'Please enter amount to split');
      return;
    }
    Alert.alert('Success', `Split payment request sent for ₦${splitAmount}`);
    setSplitAmount('');
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[styles.transactionIcon, { backgroundColor: item.type === 'credit' ? '#4CAF50' : '#f44336' }]}>
          <Ionicons 
            name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'} 
            size={20} 
            color="#fff" 
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        </View>
      </View>
      <Text style={[styles.transactionAmount, { color: item.type === 'credit' ? '#4CAF50' : '#f44336' }]}>
        {item.type === 'credit' ? '+' : '-'}₦{item.amount.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.header}>
        <Text style={styles.title}>My Wallet</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₦{balance.toLocaleString()}</Text>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'wallet' && styles.activeTab]}
          onPress={() => setActiveTab('wallet')}
        >
          <Text style={[styles.tabText, activeTab === 'wallet' && styles.activeTabText]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'split' && styles.activeTab]}
          onPress={() => setActiveTab('split')}
        >
          <Text style={[styles.tabText, activeTab === 'split' && styles.activeTabText]}>
            Split Payment
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'wallet' ? (
        <>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAddMoney}>
              <Ionicons name="add-circle" size={24} color="#4CAF50" />
              <Text style={styles.actionButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
              <Ionicons name="card" size={24} color="#2196F3" />
              <Text style={styles.actionButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </>
      ) : (
        <View style={styles.splitContainer}>
          <View style={styles.splitForm}>
            <Text style={styles.sectionTitle}>Split Payment</Text>
            <Text style={styles.splitDescription}>
              Share the cost of your booking with friends
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount to Split</Text>
              <TextInput
                style={styles.input}
                value={splitAmount}
                onChangeText={setSplitAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.friendsContainer}>
              <Text style={styles.inputLabel}>Split with Friends</Text>
              {friends.map((friend, index) => (
                <View key={index} style={styles.friendItem}>
                  <Ionicons name="person-circle" size={40} color="#4CAF50" />
                  <Text style={styles.friendName}>{friend}</Text>
                  <TouchableOpacity style={styles.removeButton}>
                    <Ionicons name="close-circle" size={20} color="#f44336" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.addFriendButton}>
                <Ionicons name="add" size={20} color="#4CAF50" />
                <Text style={styles.addFriendText}>Add Friend</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.splitButton} onPress={handleSplitPayment}>
              <Text style={styles.splitButtonText}>Send Split Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  splitContainer: {
    padding: 20,
  },
  splitForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  splitDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  friendsContainer: {
    marginBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  friendName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 5,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    borderStyle: 'dashed',
    marginTop: 10,
  },
  addFriendText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  splitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  splitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
