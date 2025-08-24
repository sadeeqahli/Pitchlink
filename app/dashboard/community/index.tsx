
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TeamPost {
  id: string;
  title: string;
  location: string;
  time: string;
  playersNeeded: number;
  author: string;
  skillLevel: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<TeamPost[]>([
    {
      id: '1',
      title: 'Need 3 players for 5-a-side',
      location: 'Champions Arena, VI',
      time: 'Today 6:00 PM',
      playersNeeded: 3,
      author: 'Ahmed',
      skillLevel: 'Intermediate'
    },
    {
      id: '2',
      title: 'Sunday morning football',
      location: 'Green Field, Ikeja',
      time: 'Sunday 8:00 AM',
      playersNeeded: 5,
      author: 'Emeka',
      skillLevel: 'Beginner'
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    location: '',
    time: '',
    playersNeeded: '',
    skillLevel: 'Intermediate'
  });

  const handleCreatePost = () => {
    if (newPost.title && newPost.location && newPost.time && newPost.playersNeeded) {
      const post: TeamPost = {
        id: Date.now().toString(),
        ...newPost,
        playersNeeded: parseInt(newPost.playersNeeded),
        author: 'You'
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', location: '', time: '', playersNeeded: '', skillLevel: 'Intermediate' });
      setShowCreatePost(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreatePost(!showCreatePost)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {showCreatePost && (
        <View style={styles.createPostForm}>
          <Text style={styles.formTitle}>Find Players</Text>
          <TextInput
            style={styles.input}
            placeholder="What game are you organizing?"
            value={newPost.title}
            onChangeText={(text) => setNewPost({...newPost, title: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newPost.location}
            onChangeText={(text) => setNewPost({...newPost, location: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Date & Time"
            value={newPost.time}
            onChangeText={(text) => setNewPost({...newPost, time: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Players needed"
            value={newPost.playersNeeded}
            onChangeText={(text) => setNewPost({...newPost, playersNeeded: text})}
            keyboardType="numeric"
          />
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowCreatePost(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.postButton]}
              onPress={handleCreatePost}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{post.author[0]}</Text>
                </View>
                <View>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.skillLevel}>{post.skillLevel}</Text>
                </View>
              </View>
              <View style={styles.playersNeeded}>
                <Text style={styles.playersText}>{post.playersNeeded}</Text>
                <Text style={styles.playersLabel}>needed</Text>
              </View>
            </View>
            
            <Text style={styles.postTitle}>{post.title}</Text>
            
            <View style={styles.postDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.detailText}>{post.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.detailText}>{post.time}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join Game</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostForm: {
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
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  skillLevel: {
    fontSize: 12,
    color: '#666',
  },
  playersNeeded: {
    alignItems: 'center',
  },
  playersText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  playersLabel: {
    fontSize: 12,
    color: '#666',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  postDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
