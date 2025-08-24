
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface SplitMember {
  id: string;
  name: string;
  amount: number;
  paid: boolean;
}

export default function SplitPaymentPage() {
  const router = useRouter();
  const [totalAmount] = useState(45000); // Mock booking amount
  const [splitMembers, setSplitMembers] = useState<SplitMember[]>([
    { id: '1', name: 'You', amount: 15000, paid: true },
    { id: '2', name: 'Ahmed', amount: 15000, paid: false },
    { id: '3', name: 'Emeka', amount: 15000, paid: false },
  ]);
  const [newMemberName, setNewMemberName] = useState('');

  const addMember = () => {
    if (newMemberName.trim()) {
      const newAmount = Math.floor(totalAmount / (splitMembers.length + 1));
      const newMember: SplitMember = {
        id: Date.now().toString(),
        name: newMemberName.trim(),
        amount: newAmount,
        paid: false,
      };
      setSplitMembers([...splitMembers, newMember]);
      setNewMemberName('');
      redistributeAmounts([...splitMembers, newMember]);
    }
  };

  const redistributeAmounts = (members: SplitMember[]) => {
    const perPersonAmount = Math.floor(totalAmount / members.length);
    const updatedMembers = members.map(member => ({
      ...member,
      amount: perPersonAmount
    }));
    setSplitMembers(updatedMembers);
  };

  const removeMember = (id: string) => {
    const updatedMembers = splitMembers.filter(member => member.id !== id && member.name !== 'You');
    setSplitMembers(updatedMembers);
    redistributeAmounts(updatedMembers);
  };

  const sendPaymentRequest = () => {
    Alert.alert(
      'Payment Requests Sent',
      'All team members will receive payment requests via SMS and email.',
      [{ text: 'OK' }]
    );
  };

  const totalPaid = splitMembers.filter(member => member.paid).reduce((sum, member) => sum + member.amount, 0);
  const remainingAmount = totalAmount - totalPaid;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Split Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.bookingTitle}>Champions Arena - 3 Hours</Text>
          <Text style={styles.bookingDate}>Today, 6:00 PM - 9:00 PM</Text>
          
          <View style={styles.amountRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>₦{totalAmount.toLocaleString()}</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(totalPaid / totalAmount) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              ₦{totalPaid.toLocaleString()} of ₦{totalAmount.toLocaleString()} collected
            </Text>
          </View>
        </View>

        {/* Add Member */}
        <View style={styles.addMemberCard}>
          <Text style={styles.sectionTitle}>Add Team Members</Text>
          <View style={styles.addMemberRow}>
            <TextInput
              style={styles.memberInput}
              placeholder="Enter name or phone number"
              value={newMemberName}
              onChangeText={setNewMemberName}
            />
            <TouchableOpacity style={styles.addButton} onPress={addMember}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Split Members */}
        <View style={styles.membersCard}>
          <Text style={styles.sectionTitle}>Payment Split</Text>
          
          {splitMembers.map((member) => (
            <View key={member.id} style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <View style={[styles.statusIcon, member.paid ? styles.paidIcon : styles.pendingIcon]}>
                  <Ionicons 
                    name={member.paid ? "checkmark" : "time"} 
                    size={16} 
                    color={member.paid ? "#4CAF50" : "#FF9800"} 
                  />
                </View>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberStatus}>
                    {member.paid ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.memberActions}>
                <Text style={styles.memberAmount}>₦{member.amount.toLocaleString()}</Text>
                {member.name !== 'You' && (
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeMember(member.id)}
                  >
                    <Ionicons name="close" size={16} color="#FF5252" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsCard}>
          {remainingAmount > 0 && (
            <TouchableOpacity style={styles.requestButton} onPress={sendPaymentRequest}>
              <Ionicons name="send" size={20} color="#fff" />
              <Text style={styles.requestButtonText}>Send Payment Requests</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.payNowButton}>
            <Text style={styles.payNowText}>Pay My Share (₦{splitMembers.find(m => m.name === 'You')?.amount.toLocaleString()})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  addMemberCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  addMemberRow: {
    flexDirection: 'row',
    gap: 10,
  },
  memberInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  membersCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paidIcon: {
    backgroundColor: '#E8F5E8',
  },
  pendingIcon: {
    backgroundColor: '#FFF3E0',
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  memberStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  memberActions: {
    alignItems: 'flex-end',
  },
  memberAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  removeButton: {
    padding: 4,
  },
  actionsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  payNowButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSpacing: {
    height: 100,
  },
});
