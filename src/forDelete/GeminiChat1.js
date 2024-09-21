import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import Markdown from 'react-native-markdown-display';
import {moderateScale} from 'react-native-size-matters';
import { API_KEY } from '../constants/geminiapikey';

const GeminiChat1 = () => {
  const [fact, setFact] = useState('');
  const apiKey = API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const randomFootFact = async () => {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `Give me random food fact related to health, nothing else, can you add markdown also if needed`,
    });

    try {
      const prompt = 'start';

      const result = await model.generateContent(prompt);

      // Send back the model's response
      console.log(result.response.text());
      setFact(result.response.text());
    } catch (error) {
      console.log('ERROR ---->  ', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(20),
        gap: moderateScale(20),
      }}>
      <Button onPress={randomFootFact} title="generate" />
      <Markdown>{fact}</Markdown>
    </View>
  );
};

export default GeminiChat1;

const styles = StyleSheet.create({});
