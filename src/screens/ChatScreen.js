import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  BACKGROUND_COLOR,
  DARK,
  LIGHT,
  LIGHT_GREEN,
  PRIMARY,
  SECONDARY,
  TERTIARY,
} from '../constants/colors';

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {dummyChats} from '../constants/dummyChats';
import axios from 'axios';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import {API_KEY} from '../constants/geminiapikey';

import {launchImageLibrary} from 'react-native-image-picker';
import LottieView from 'lottie-react-native';

const ChatScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCameraBox, setShowCameraBox] = useState(false);
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const apiKey = API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const chatFunctions = async () => {
    setIsLoading(true);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `Give me random food fact related to health, nothing else and don't use markdown language`,
    });

    setInputMessage('');
    // Defining history here because, don't want to applend the latest input into the hitory
    const history = chats;

    const userMessage = {role: 'user', parts: [{text: inputMessage}]};
    setChats(prevChats => [...prevChats, userMessage]);

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: history,
      });

      const result = await chatSession.sendMessage(inputMessage);

      // console.log(result.response.text());

      const aiMessage = {
        role: 'model',
        parts: [{text: result.response.text()}],
      };

      setChats(prevChat => [...prevChat, aiMessage]);
    } catch (error) {
      console.log('ERROR ---->  ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [uploadImageModel, setUploadImageModel] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  // Add image states and functions
  const [image, setImage] = useState('');
  const [imageDetail, setImageDetails] = useState(null);
  const [images, setImages] = useState([]);
  const [base64Image, setBase64Image] = useState('');

  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 1,
    };

    const result = await launchImageLibrary(options);
    const imageUri = result.uri || result.assets?.[0]?.uri;
    const base64String = result.assets?.[0]?.base64; // Get the base64 string

    console.log('Image --->', result);
    console.log('ImageURL --->', imageUri);
    // console.log('Base64 --->', base64String);

    if (result.didCancel) {
      setImage('');
      setImageDetails(null);
      setBase64Image('');
    } else {
      setImage(imageUri);
      setImageDetails(result);
      setBase64Image(base64String);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        // borderWidth: 1,
        backgroundColor: PRIMARY,
        justifyContent: 'center',
      }}>
      {/* LOGO */}
      <View
        style={{
          //   borderWidth: 1,
          justifyContent: 'flex-start',
          gap: moderateScale(5),
          //   alignItems: 'center',
          position: 'absolute',
          top: 0,
          width: '100%',
          padding: moderateScale(5),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            // borderWidth: 1,
            // borderColor: 'white',
            width: moderateScale(40),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome
            name="arrow-left"
            size={moderateScale(20)}
            color={TERTIARY}
          />
        </Pressable>

        <Text
          style={{
            flexDirection: 'row',
            fontWeight: 'bold',
            color: SECONDARY,
            fontSize: moderateScale(20),
          }}>
          Better
          <FontAwesome5
            name="running"
            size={moderateScale(25)}
            color={TERTIARY}
          />
          <Text>
            <Text
              style={{
                color: TERTIARY,
              }}>
              Health
            </Text>
          </Text>
        </Text>
      </View>

      {/* Chats here */}
      <View
        style={{
          // borderWidth: 1,
          backgroundColor: BACKGROUND_COLOR,
          borderRadius: moderateScale(10),
          marginHorizontal: moderateScale(10),
          borderRadius: moderateScale(10),
          borderRadius: moderateScale(10),
          marginBottom: moderateScale(20),
          height: '80%',
        }}>
        {Array.isArray(chats) && chats.length === 0 ? (
          <LottieView
            style={{flex: 1}}
            source={require('../assets/animations/chatScreenAnimation.json')}
            autoPlay
            loop
          />
        ) : (
          <ScrollView
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
                <Text style={styles.messageText}>{message.parts[0].text}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Bottom container */}
      <View
        style={{
          // borderWidth: 1,
          borderColor: 'white',
          position: 'absolute',
          bottom: 0,
          // minHeight: moderateScale(50),
          backgroundColor: PRIMARY,
          maxHeight: 200,
          width: '100%',
          padding: moderateScale(10),
          marginTop: moderateScale(10),
          justifyContent: 'center',
          flexDirection: 'row',
          gap: moderateScale(5),
        }}>
        {/* Plus and Camera or Gallery Icons */}
        <View style={{justifyContent: 'flex-end'}}>
          <View
            // className="bg-green-300"
            style={{
              // borderWidth: 1,
              // borderColor: 'white',
              backgroundColor: showCameraBox ? null : LIGHT_GREEN,
              // width: moderateScale(40),
              width: showCameraBox ? moderateScale(100) : moderateScale(40),
              height: moderateScale(40),
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: moderateScale(20),
              flexDirection: 'row',
            }}>
            {showCameraBox ? (
              <>
                <TouchableOpacity>
                  <Feather
                    name="camera"
                    size={moderateScale(25)}
                    color={LIGHT_GREEN}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={openImagePicker}>
                  <Feather
                    name="image"
                    size={moderateScale(25)}
                    color={LIGHT_GREEN}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => setShowCameraBox(true)}>
                <Octicons
                  name="plus"
                  size={moderateScale(23)}
                  color={PRIMARY}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Text input  */}
        <View
          style={{
            // borderWidth: 1,
            backgroundColor: LIGHT_GREEN,
            color: DARK,
            flex: 1,
            borderRadius: 20,
            paddingHorizontal: moderateScale(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            multiline
            placeholder="Type a message"
            placeholderTextColor={PRIMARY}
            value={inputMessage}
            onChangeText={setInputMessage}
            onBlur={() => setShowCameraBox(false)}
            onFocus={() => setShowCameraBox(false)}
          />
        </View>

        {/* Send button */}
        <View
          style={{
            justifyContent: 'flex-end',
          }}>
          {isLoading ? (
            <TouchableOpacity style={styles.sendButton}>
              <ActivityIndicator size={moderateScale(15)} color={PRIMARY} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                inputMessage === '' ? null : chatFunctions();
              }}
              style={styles.sendButton}>
              <Ionicons
                name="send"
                size={moderateScale(15)}
                color={inputMessage === '' ? 'lightgray' : PRIMARY}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

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
    maxWidth: '90%',
    marginBottom: moderateScale(15),
  },
  messageText: {
    fontSize: moderateScale(15),
    color: DARK,
    fontWeight: '500',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: LIGHT_GREEN,
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40),
    // marginLeft: 10,
  },
  sendButtonText: {
    color: PRIMARY,
    fontSize: 16,
  },
});
