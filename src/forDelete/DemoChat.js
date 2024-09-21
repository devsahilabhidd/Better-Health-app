import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to the chat
    const userMessage = {role: 'user', content: inputMessage};
    setChats(prevChats => [...prevChats, userMessage]);

    try {
      // Call Firebase Cloud Function
      const response = await axios.post(
        'https://exposure-ky-serial-authors.trycloudflare.com/better-health-c4021/us-central1/chatWithGeminiAI',
        {userMessage: inputMessage},
      );

      // Add AI response to the chat
      const aiMessage = {role: 'ai', content: response.data.response};
      setChats(prevChats => [...prevChats, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }

    setInputMessage(''); // Clear input field
  };

  return (
    <View style={styles.container}>
      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer}>
        {chats.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.role === 'user' ? styles.userMessage : styles.aiMessage,
            ]}>
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
