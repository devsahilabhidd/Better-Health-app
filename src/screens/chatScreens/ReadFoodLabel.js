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
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  BACKGROUND_COLOR,
  DARK,
  LIGHT,
  LIGHT_GREEN,
  PRIMARY,
  SECONDARY,
  TERTIARY,
} from '../../constants/colors';

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {API_KEY} from '../../constants/geminiapikey';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import LottieView from 'lottie-react-native';
import BetterHealthLogo from '../../components/BetterHealthLogo';
import Markdown from 'react-native-markdown-display';

const ChatScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const [showCameraBox, setShowCameraBox] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [chats, setChats] = useState([]);
  const [imageArray, setimageArray] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [prompt, setPrompt] = useState('You are an Health and Food Expert.');

  // Add image states and functions
  const [imageDetail, setImageDetails] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  const apiKey = API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const addChatToHistory = (role, base64Image, text) => {
    let history = [...chats];

    // If both text and base64Image are present
    if (base64Image && text) {
      // Clear images from the states
      setBase64Image('');
      setImageDetails(null);

      const latestImage = imageArray[imageArray.length - 1];

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

      const dataInputForHistory = {
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
      history = [...history, dataInputForHistory];
    }
    // If only base64Image is present
    else if (base64Image) {
      // Clear images from the states
      setBase64Image('');
      setImageDetails(null);
      setPrompt('Tell me about this image');

      // Getting index of the latest image
      const latestImage = imageArray[imageArray.length - 1];

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

      history = [...history, addImage];
      setChats(prevChats => [...prevChats, addImage]); // Add the new chat
    }
    // If only text is present
    else if (text) {
      const userMessage = {role: role, parts: [{text: text}]};
      history = chats;
      setChats(prevChats => [...prevChats, userMessage]);
    }
    setInputMessage('');
    return history;
  };

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };
  const chatFunctions = async history => {
    setIsLoading(true);

    console.log('inside chat');

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `When analyzing a list of ingredients on a product label, break down each component in a friendly, easy-to-understand way, and in a tabular form. Explain whether each ingredient is good, neutral, or harmful for someone. Provide dietary advice in a supportive tone, suggesting healthier alternatives where needed. Always conclude with a summary that gives clear recommendations while keeping the tone positive and helpful. If possible also try to guess the product.
      `,
    });

    // If you want to use markdown then use this syntax only ${markdownSyntax}
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: history,
      });

      console.log('Login history ------------> ');
      console.log(history);
      const promptForSend = prompt || 'You are an Health and Food Expert.';
      setPrompt('');
      console.log(promptForSend);

      const result = await chatSession.sendMessage(promptForSend);
      const text = result.response.text();
      addChatToHistory('model', null, text);
    } catch (error) {
      console.log('inside catch block -------> ');
      console.log('ERROR ---->  ', error);
      const text = 'Something went wrong!!! \nPlease try again in sometime';
      addChatToHistory('model', null, text);
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

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 1,
    };

    const result = await launchCamera(options);
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowPopup(true);
  //   }, 1000);
  // }, []);

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
          {/* <FontAwesome5
            name="running"
            size={moderateScale(25)}
            color={TERTIARY}
          /> */}
          <Text>
            <Text
              style={{
                color: TERTIARY,
              }}>
              {' '}
              Health
            </Text>
          </Text>
        </Text>
      </View>

      {/* Chats here */}
      <View
        style={{
          // borderWidth: 1,
          // marginVertical: verticalScale(10),
          backgroundColor: BACKGROUND_COLOR,
          borderRadius: moderateScale(5),
          marginHorizontal: moderateScale(5),
          borderRadius: moderateScale(10),
          borderRadius: moderateScale(10),
          marginBottom: moderateScale(20),
          height: '80%',
        }}>
        {Array.isArray(chats) && chats.length === 0 ? (
          //If the chat is empty then show this
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <BetterHealthLogo />
          </View>
        ) : (
          <ScrollView
            style={{padding: moderateScale(10)}}
            showsVerticalScrollIndicator={false}>
            {chats.map((message, index) => (
              <View key={index}>
                {/* Check for inlineData (image) */}
                {message.parts?.[0]?.inlineData && (
                  <View
                    style={{
                      alignSelf:
                        message.role === 'user' ? 'flex-end' : 'flex-start',
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

                {/* Check for text and ingredients */}
                {(message.parts?.[0]?.text || message.parts?.[1]?.text) && (
                  <View
                    style={[
                      styles.messageBubble,
                      message.role === 'user'
                        ? styles.userMessage
                        : styles.aiMessage,
                    ]}>
                    {/* // User message  */}
                    {message.role === 'user' ? (
                      <Text selectable style={styles.messageText}>
                        {message.parts?.[0]?.text || message.parts?.[1]?.text}
                      </Text>
                    ) : (
                      // Models respose here
                      <View
                        style={{
                          // borderWidth: 1,
                          alignSelf: 'center',
                          width: '105%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Markdown style={markdownStyles}>
                          {message.parts?.[0]?.text || message.parts?.[1]?.text}
                        </Markdown>
                      </View>
                    )}
                  </View>
                )}
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
                <TouchableOpacity onPress={openCamera}>
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
            onChangeText={text => {
              setInputMessage(text);
              setPrompt(text);
            }}
            onBlur={() => setShowCameraBox(false)}
            onFocus={() => setShowCameraBox(false)}
          />
        </View>

        {/* Send button */}
        <View
          style={{
            justifyContent: 'flex-end',
          }}>
          {/* If userinput is empty */}
          {inputMessage === '' && base64Image === '' ? (
            isLoading ? (
              <TouchableOpacity style={styles.sendButton}>
                <ActivityIndicator size={moderateScale(15)} color={PRIMARY} />
              </TouchableOpacity>
            ) : (
              <Pressable
                onPress={() => {
                  ToastAndroid.show('You need to give some input first', 1000);
                }}
                style={styles.sendButton}>
                <Ionicons
                  name="send"
                  size={moderateScale(16)}
                  color={
                    inputMessage === '' && base64Image === ''
                      ? 'lightgray'
                      : PRIMARY
                  }
                />
              </Pressable>
            )
          ) : (
            <TouchableOpacity
              onPress={() => {
                const role = 'user';

                const history = addChatToHistory(
                  role,
                  imageDetail,
                  inputMessage,
                );
                chatFunctions(history);
              }}
              style={styles.sendButton}>
              <Ionicons
                name="send"
                size={moderateScale(16)}
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

      <Modal
        isVisible={showPopup}
        transparent={true}
        onBackdropPress={() => setShowPopup(false)}
        onBackButtonPress={() => setShowPopup(false)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: TERTIARY,
            height: moderateScale(200),
            width: moderateScale(300),
            borderRadius: moderateScale(20),
            justifyContent: 'center',
            padding: moderateScale(15),
            gap: moderateScale(20),
          }}>
          <Text
            style={{
              color: LIGHT,
              fontSize: moderateScale(20),
              fontWeight: '400',
            }}>
            Add some information about you so I can give you more personalized
            results, btw you can change that anytime.
          </Text>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              padding: moderateScale(10),
              justifyContent: 'flex-end',
              gap: moderateScale(40),
            }}>
            <TouchableOpacity onPress={() => setShowPopup(false)}>
              <Text
                style={{
                  color: LIGHT,
                  fontWeight: '500',
                  fontSize: moderateScale(18),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('PersonalInfo')}>
              <Text
                style={{
                  color: LIGHT,
                  fontWeight: '500',
                  fontSize: moderateScale(18),
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatScreen;
const markdownStyles = StyleSheet.create({
  heading1: {
    fontFamily: 'InterBlack',
    color: '#212020',
    marginTop: 15,
    marginBottom: 10,

    lineHeight: 40,
  },
  text: {
    color: SECONDARY,
    fontSize: moderateScale(15),
  },
  heading2: {
    fontFamily: 'InterBold',
    color: '#404040',

    marginTop: 10,
    marginBottom: 5,
    lineHeight: 30,
  },
  code_block: {
    borderWidth: 1,
    borderColor: 'red',
  },
  table: {
    borderWidth: 0.5,
    borderColor: SECONDARY,
    borderRadius: 5,
  },
  th: {
    borderWidth: 0.3,
    borderColor: SECONDARY,
    alignItems: 'center',

    // padding: 5,
    backgroundColor: TERTIARY,
  },
  tr: {
    borderBottomWidth: 0,
  },
  td: {
    borderWidth: 0.3,
    borderColor: SECONDARY,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
});

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
    width: '100%',
    marginBottom: moderateScale(15),
  },
  messageText: {
    fontSize: moderateScale(15),
    letterSpacing: 1,
    // color: DARK,
    color: SECONDARY,
    fontWeight: '400',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
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

  // Model response card
  ingreCard: {
    // borderWidth: 0.5,
    padding: moderateScale(10),
    marginVertical: moderateScale(3),
    borderRadius: moderateScale(4),
    gap: moderateScale(10),
  },
  commonTextStyle: {
    color: DARK,
  },
  ingredientText: {
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  descriptionText: {fontSize: moderateScale(14), fontWeight: '500'},
  good_bad_neutralText: {fontSize: moderateScale(17), fontWeight: '500'},
  adviceText: {fontSize: moderateScale(15), fontWeight: '500'},
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
