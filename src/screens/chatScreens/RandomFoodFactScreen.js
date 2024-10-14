import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ChatScreenLogo from '../../components/ChatScreenLogo';

import {GoogleGenerativeAI} from '@google/generative-ai';
import {moderateScale} from 'react-native-size-matters';
import {API_KEY} from '../../constants/geminiapikey';
import {
  BACKGROUND_COLOR,
  COLORS,
  DARK,
  PRIMARY,
  SECONDARY,
  TERTIARY,
} from '../../constants/colors';
import {ThemeContext} from '../../context/ThemeContext';

const RandomFoodFactScreen = () => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  const [isLoading, setIsLoading] = useState('');
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState('Start');
  const apiKey = API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  useEffect(() => {
    randomFootFact();
  }, []);

  const randomFootFact = async () => {
    setIsLoading(true);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `Give me random food fact related to health, nothing else`,
    });

    // Add user message to the chat
    const userMessage = {role: 'user', content: inputMessage};
    setChats(prevChats => [...prevChats, userMessage]);

    try {
      const prompt = 'start';

      const result = await model.generateContent(prompt);

      // Send back the model's response
      // console.log(result.response.text());

      const aiMessage = {role: 'ai', content: result.response.text()};

      setChats(prevChat => [...prevChat, aiMessage]);
    } catch (error) {
      console.log('ERROR ---->  ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View
        style={{
          // borderWidth: 1,
          flex: 1,
          backgroundColor: activeColor.PRIMARY,
          justifyContent: 'center',
        }}>
        <ChatScreenLogo />

        {/* Chats here */}
        <View
          // className= "bg-gray-900"
          // className= "bg-green-100"
          style={{
            // borderWidth: 1,
            backgroundColor: activeColor.BACKGROUND_COLOR,
            borderColor: activeColor.SECONDARY,
            borderRadius: moderateScale(10),
            marginHorizontal: moderateScale(10),
            borderRadius: moderateScale(10),
            marginBottom: moderateScale(20),
            height: '80%',
          }}>
          <ScrollView
            // bounces={false}
            style={{
              padding: moderateScale(10),
            }}
            showsVerticalScrollIndicator={false}>
            {chats.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  message.role === 'user'
                    ? styles.userMessage
                    : styles.aiMessage,
                ]}>
                <Text style={[markdownStyles, styles.messageText]}>
                  {message.content}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Buttom Bottom */}
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'white',
            position: 'absolute',
            bottom: 0,
            backgroundColor: activeColor.PRIMARY,
            width: '100%',
            padding: moderateScale(10),
            marginTop: moderateScale(10),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {isLoading ? (
            <View style={styles.sendButton}>
              <ActivityIndicator size={'large'} color={activeColor.PRIMARY} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={randomFootFact}>
              <Text style={styles.sendButtonText}>Press me for Food fact</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default RandomFoodFactScreen;

const styles = StyleSheet.create({
  messageBubble: {
    // borderWidth: 1,
    marginVertical: moderateScale(5),
    padding: moderateScale(10),
    borderRadius: moderateScale(15),
    // maxWidth: '90%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: TERTIARY,
    borderTopRightRadius: 0,
    maxWidth: '80%',
  },
  aiMessage: {
    backgroundColor: 'lightgreen',
    alignSelf: 'flex-start',
    maxWidth: '100%',
    marginBottom: moderateScale(15),
  },
  messageText: {
    fontSize: moderateScale(15),
    color: DARK,
    fontWeight: '500',
  },
  sendButton: {
    paddingHorizontal: 15,
    backgroundColor: TERTIARY,
    // backgroundColor: DARK,
    borderRadius: 20,
    marginLeft: 10,
    maxHeight: moderateScale(50),
    height: moderateScale(40),
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: DARK,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
});
const markdownStyles = StyleSheet.create({
  heading1: {
    fontFamily: 'InterBlack',
    color: '#212020',
    marginTop: 15,
    marginBottom: 10,

    lineHeight: 40,
  },
  text: {
    color: 'black',
    // fontSize: moderateScale(19),
    // fontWeight: '400',
  },
  heading2: {
    fontFamily: 'InterBold',
    color: '#404040',

    marginTop: 10,
    marginBottom: 5,
    lineHeight: 30,
  },
  body: {
    fontSize: 16,
    // fontFamily: 'Inter',
    lineHeight: 24,
    backgroundColor: 'white',
  },
  fence: {
    // backgroundColor: 'white',
    marginVertical: moderateScale(10),
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
  },
  code_block: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
