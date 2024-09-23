import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
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
import {GoogleGenerativeAI} from '@google/generative-ai';
import {API_KEY, BB_API_KEY} from '../constants/geminiapikey';

import {launchImageLibrary} from 'react-native-image-picker';
import LottieView from 'lottie-react-native';
import FitImage from 'react-native-fit-image';
import {GoogleAIFileManager} from '@google/generative-ai/server';

const ChatScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const [showCameraBox, setShowCameraBox] = useState(false);
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Add image states and functions
  const [image, setImage] = useState('');
  const [imageUri, setImageUri] = useState(
    // 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    '',
  );
  const [imageDetail, setImageDetails] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  const apiKey = API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const chatFunctions = async () => {
    setIsLoading(true);

    console.log('inside chat');

    const uploadResult = await fileManager.uploadFile(`${image}/jetpack.jpg`, {
      mimeType: 'image/jpeg',
      displayName: 'Jetpack drawing',
    });
    // View the response.
    console.log(
      `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
    );

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      // systemInstruction: `Give me random food fact related to health, nothing else and don't use markdown language`,
    });

    setInputMessage('');

    // Define and update history to keep context
    const history = chats;

    const userMessage = {role: 'user', parts: [{text: inputMessage}]};
    setChats(prevChats => [...prevChats, userMessage]);

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: 'user',
            parts: [{text: 'hii'}],
          },
          {
            role: 'model',
            parts: [{text: 'Hello! 👋 \n'}],
          },
          {
            role: 'user',
            parts: [
              {
                fileData: {
                  mimeType: 'image/jpeg',
                  fileUri: 'https://i.ibb.co/SQLB39N/car.jpg',
                },
              },
              {text: 'color ?'},
            ],
          },
          {
            role: 'model',
            parts: [{text: 'The colors are green, red, and white. \n'}],
          },
        ],
      });

      const result = await chatSession.sendMessage(inputMessage);
      console.log(result.response.text());

      // let result;

      // if (base64Image === '') {
      //   // If there's no image, send the text message
      //   result = await chatSession.sendMessage({text: inputMessage});
      // } else {
      //   // Process image along with the message and add the image to history
      //   const image = {
      //     inlineData: {
      //       data: base64Image,
      //       mimeType: 'image/png',
      //     },
      //   };

      //   // Send both the text and the image in one message
      //   const aiResponse = await chatSession.sendMessage([inputMessage, image]);

      //   // Add image and AI response to the history
      //   result = aiResponse;
      //   const imageMessage = {
      //     role: 'model',
      //     parts: [{fileData: image}], // Track the image in history
      //   };
      //   setChats(prevChats => [...prevChats, imageMessage]);
      // }

      // // Add AI response to the chat
      // const aiMessage = {
      //   role: 'model',
      //   parts: [{text: result.response.text()}],
      // };
      // setChats(prevChats => [...prevChats, aiMessage]);
    } catch (error) {
      console.log('ERROR ---->  ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageToBB = async imageDetail => {
    const url = `https://api.imgbb.com/1/upload?key=${BB_API_KEY}`;

    setUploadImageLoading(true);

    if (imageDetail === null) {
      // setUploadImageModel(false);
      setUploadImageLoading(false);
      ToastAndroid.show('You need to select image for upload', 1000);
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageDetail.assets?.[0]?.uri,
      type: imageDetail.assets?.[0]?.type,
      name: imageDetail.assets?.[0]?.fileName,
      fileName: imageDetail.assets?.[0]?.fileName,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const res = await response.json();
      // console.log(res);
      if (response.ok) {
        console.log('Response --> ', res);
        console.log('print the uri ', res.data.url);
        const imageUrl = res.data.url;
        setImageUri(imageUrl);
        // setImages([...images, imageUrl]);
        // setImages(prevImages => [imageUrl, ...prevImages]);
        setUploadImageLoading(false);
      } else {
        console.error('Upload failed:', res);
        setUploadImageLoading(false);
        if (res.error) {
          console.error('Error:', res.error.message);
        }
      }
    } catch (e) {
      console.error('Error --> ', e);
      setUploadImageLoading(false);
    }
  };

  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 1,
    };

    const result = await launchImageLibrary(options);
    const imageUri = result.uri || result.assets?.[0]?.uri;
    const base64String = result.assets?.[0]?.base64; // Get the base64 string

    // console.log('Image --->', result);
    // console.log('ImageURL --->', imageUri);
    // console.log('Base64 --->', base64String);

    if (result.didCancel) {
      setImage('');
      setImageDetails(null);
      setBase64Image('');
    } else {
      setImage(imageUri);
      setImageDetails(result);
      setBase64Image(base64String);
      uploadImageToBB(result);
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
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          {imageUri != '' && (
            <View
              style={{
                borderWidth: 0.5,
                height: moderateScale(50),
                width: moderateScale(50),
                margin: moderateScale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {uploadImageLoading ? (
                <ActivityIndicator />
              ) : (
                <FitImage
                  source={{
                    uri: imageUri,
                  }}
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(50),
                  }}
                />
              )}
            </View>
          )}

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
