import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {dummyChats} from '../constants/dummyChats';
import Markdown from 'react-native-markdown-display';

const ChatScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const [showCameraBox, setShowCameraBox] = useState(false);
  const [chats, setChats] = useState([]);
  const [imageArray, setimageArray] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [history, setHistory] = useState([]);

  // Add image states and functions
  const [imageDetail, setImageDetails] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  const apiKey = API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const addChatToHistory = (role, base64Image, text) => {
    // If both text and base64Image are present
    if (base64Image && text) {
      // Clear images from the states
      setBase64Image('');
      setImageDetails(null);

      const latestImage = imageArray[imageArray.length - 1];
      console.log('lastest image printing here =====> ', latestImage.type);

      const dataInput = {
        role: role,
        parts: [
          {
            inlineData: {
              data: latestImage.base64,
              mimeType: latestImage.type,
            },
          },
          {
            text: text,
          },
        ],
      };

      setChats(prevChats => [...prevChats, dataInput]);
    }
    // If only base64Image is present
    else if (base64Image) {
      // Clear images from the states
      setBase64Image('');
      setImageDetails(null);

      const latestImage = imageArray[imageArray.length - 1];
      console.log('lastest image printing here =====> ', latestImage.type);

      const addImage = {
        role: role,
        parts: [
          {
            inlineData: {
              data: latestImage.base64,
              mimeType: latestImage.type,
            },
          },
        ],
      };

      console.log('printing image array ----------> ', imageArray[0].type);

      setChats(prevChats => [...prevChats, addImage]); // Add the new chat
    }
    // If only text is present
    else if (text) {
      const userMessage = {role: role, parts: [{text: text}]};
      setChats(prevChats => [...prevChats, userMessage]);
    }

    setInputMessage('');
    console.log(chats);
  };

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };
  const chatFunctions = async => {
    setIsLoading(true);

    console.log('inside chat');

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      // systemInstruction: `Give me random food fact related to health, nothing else and don't use markdown language`,
    });

    try {
      console.log('inside try block -------> ');
      // const chatSession = model.startChat({
      //   generationConfig,
      //   history: [
      //     {
      //       role: 'user',
      //       parts: [{text: 'hii'}],
      //     },
      //     {
      //       role: 'model',
      //       parts: [{text: 'Hello! 👋 \n'}],
      //     },
      //     {
      //       role: 'user',
      //       parts: [
      //         {
      //           inlineData: {
      //             data: base64Image,
      //             mimeType: 'image/jpeg',
      //           },
      //         },
      //         {text: 'color ?'},
      //       ],
      //     },
      //     {
      //       role: 'model',
      //       parts: [{text: 'black \n'}],
      //     },
      //   ],
      // });

      // const result = await chatSession.sendMessage(inputMessage);

      // console.log('below is the result of the prompt ');
      // console.log(result.response.text());

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
      console.log('inside catch block -------> ');
      console.log('ERROR ---->  ', error);
    } finally {
      setIsLoading(false);
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
      setImageDetails(null);
      setBase64Image('');
    } else {
      setImageDetails(result);
      // console.log('image Details ------> : ', result.assets?.[0]);
      setBase64Image(base64String);
      setimageArray(preImage => [...preImage, result.assets?.[0]]);
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
        {/* Lottie Animation here */}
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
              <>
                {message.parts !== undefined &&
                  message.parts[0]?.inlineData && (
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: moderateScale(150),
                        width: moderateScale(150),
                        marginTop: moderateScale(10),
                      }}>
                      <Image
                        resizeMode="cover"
                        source={{
                          uri: `data:${message.parts[0].inlineData.type};base64,${message.parts[0].inlineData.data}`,
                        }}
                        style={{
                          height: '100%',
                          width: '100%',
                          margin: moderateScale(10),
                          borderRadius: moderateScale(10),
                        }}
                      />
                    </View>
                  )}

                {/* If the prompt is empty then don't show anything */}
                {(message.parts?.[0]?.text || message.parts?.[1]?.text) ===
                undefined ? null : (
                  <View
                    key={index}
                    style={[
                      styles.messageBubble,
                      message.role === 'user'
                        ? styles.userMessage
                        : styles.aiMessage,
                    ]}>
                    <Text style={styles.messageText}>
                      {message.parts?.[0]?.text ||
                        message.parts?.[1]?.text ||
                        'No prompt'}
                    </Text>
                  </View>
                )}
              </>
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
          {base64Image != '' && (
            <View
              style={{
                height: moderateScale(80),
                width: moderateScale(100),
                marginTop: moderateScale(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {uploadImageLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  {/* Remove Image */}
                  <TouchableOpacity
                    onPress={() => {
                      setBase64Image('');
                      imageArray.pop();
                      console.log(imageArray);
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 0,
                      right: 0,
                      backgroundColor: 'red',
                      width: moderateScale(25),
                      height: moderateScale(25),
                      borderRadius: moderateScale(12),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="close"
                      size={moderateScale(20)}
                      color={PRIMARY}
                    />
                  </TouchableOpacity>
                  {/* <FitImage
                    source={{
                      uri: `data:image/png;base64,${base64Image}`,
                    }}
                    style={{
                      height: moderateScale(80),
                      width: moderateScale(100),
                    }}
                  /> */}
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: `data:image/png;base64,${base64Image}`,
                    }}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: moderateScale(10),
                    }}
                  />
                </>
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
                const role = 'user';
                inputMessage === '' && base64Image === ''
                  ? null
                  : addChatToHistory(role, imageDetail, inputMessage);
                // chatFunctions();
              }}
              style={styles.sendButton}>
              <Ionicons
                name="send"
                size={moderateScale(15)}
                color={
                  inputMessage === '' && base64Image === ''
                    ? 'lightgray'
                    : PRIMARY
                }
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
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    // maxWidth: '90%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: TERTIARY,
    // borderTopRightRadius: 0,
    maxWidth: '80%',
    marginBottom: moderateScale(25),
  },
  aiMessage: {
    // backgroundColor: 'lightgreen',
    alignSelf: 'flex-start',
    maxWidth: '100%',
    marginBottom: moderateScale(15),
  },
  messageText: {
    fontSize: moderateScale(16),
    letterSpacing: 1,
    // color: DARK,
    color: SECONDARY,
    fontWeight: '400',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    backgroundColor: LIGHT_GREEN,
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40),
    // marginLeft: 10,
  },
  sendButtonText: {
    color: PRIMARY,
    fontSize: moderateScale(16),
  },
});

// scraps
// const uploadImageToBB = async imageDetail => {
//   const url = `https://api.imgbb.com/1/upload?key=${BB_API_KEY}`;

//   setUploadImageLoading(true);

//   if (imageDetail === null) {
//     // setUploadImageModel(false);
//     setUploadImageLoading(false);
//     ToastAndroid.show('You need to select image for upload', 1000);
//     return;
//   }

//   const formData = new FormData();
//   formData.append('image', {
//     uri: imageDetail.assets?.[0]?.uri,
//     type: imageDetail.assets?.[0]?.type,
//     name: imageDetail.assets?.[0]?.fileName,
//     fileName: imageDetail.assets?.[0]?.fileName,
//   });

//   try {
//     console.log('indide bb upload try ');
//     const response = await fetch(url, {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     const res = await response.json();
//     // console.log(res);
//     if (response.ok) {
//       console.log('Response --> ', res);
//       console.log('print the uri ', res.data.url);
//       const imageUrl = res.data.url;
//       setImageUri(imageUrl);
//       // setImages([...images, imageUrl]);
//       // setImages(prevImages => [imageUrl, ...prevImages]);
//       setUploadImageLoading(false);
//     } else {
//       console.error('Upload failed:', res);
//       setUploadImageLoading(false);
//       if (res.error) {
//         console.error('Error:', res.error.message);
//       }
//     }
//   } catch (e) {
//     console.error('Error --> ', e);
//     setUploadImageLoading(false);
//   }
// };
