import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS} from '../constants/colors';
import {moderateScale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditeProfileMenu = ({showEditeProfileMenu, setShowEditeProfileMenu}) => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    location: '',
    occupation: '',
    goal: '',
    dietaryPreference: '',
    allergies: '',
    medicalConditions: '',
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (profileData) {
        setInitialValues(JSON.parse(profileData));
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number()
      .positive('Age must be positive')
      .required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    height: Yup.number()
      .positive('Height must be positive')
      .required('Height is required'),
    weight: Yup.number()
      .positive('Weight must be positive')
      .required('Weight is required'),
    location: Yup.string().required('Location is required'),
    occupation: Yup.string().required('Occupation is required'),
    goal: Yup.string().required('Goal is required'),
    dietaryPreference: Yup.string().required('Dietary preference is required'),
    allergies: Yup.string(),
    medicalConditions: Yup.string(),
  });

  const handleSubmit = async values => {
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(values));
      setShowEditeProfileMenu(false);
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  return (
    <Modal
      isVisible={showEditeProfileMenu}
      onBackButtonPress={() => setShowEditeProfileMenu(false)}>
      <View style={styles.container(activeColor)}>
        {/* Header */}
        <View style={styles.headerContainer(activeColor)}>
          <View>
            <Text style={styles.headerTitle(activeColor)}>Edit Profile</Text>
          </View>
          <TouchableOpacity onPress={() => setShowEditeProfileMenu(false)}>
            <MaterialIcons
              name={'close'}
              size={moderateScale(25)}
              color={activeColor.SECONDARY}
            />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <ScrollView style={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View>
                <SectionTitle title="Personal Info" activeColor={activeColor} />
                <FormField
                  label="Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name && errors.name}
                  activeColor={activeColor}
                />
                <FormField
                  label="Age"
                  value={values.age}
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  error={touched.age && errors.age}
                  activeColor={activeColor}
                  keyboardType="numeric"
                />
                <SelectField
                  label="Gender"
                  value={values.gender}
                  onValueChange={itemValue =>
                    setFieldValue('gender', itemValue)
                  }
                  error={touched.gender && errors.gender}
                  activeColor={activeColor}
                  items={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},
                    {label: 'Transgender', value: 'transgender'},
                    {label: 'Non-binary', value: 'non-binary'},
                    {label: 'Other', value: 'other'},
                  ]}
                />
                <FormField
                  label="Height (cm)"
                  value={values.height}
                  onChangeText={handleChange('height')}
                  onBlur={handleBlur('height')}
                  error={touched.height && errors.height}
                  activeColor={activeColor}
                  keyboardType="numeric"
                />
                <FormField
                  label="Weight (kg)"
                  value={values.weight}
                  onChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  error={touched.weight && errors.weight}
                  activeColor={activeColor}
                  keyboardType="numeric"
                />
                <FormField
                  label="Location"
                  value={values.location}
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  error={touched.location && errors.location}
                  activeColor={activeColor}
                />
                <FormField
                  label="Occupation"
                  value={values.occupation}
                  onChangeText={handleChange('occupation')}
                  onBlur={handleBlur('occupation')}
                  error={touched.occupation && errors.occupation}
                  activeColor={activeColor}
                />
                <HorizontalLine activeColor={activeColor} />
                <SectionTitle title="Goal" activeColor={activeColor} />
                <SelectField
                  label="Select your Goal"
                  value={values.goal}
                  onValueChange={itemValue => setFieldValue('goal', itemValue)}
                  error={touched.goal && errors.goal}
                  activeColor={activeColor}
                  items={[
                    {label: 'Want to lose weight', value: 'lose_weight'},
                    {label: 'Want to gain weight', value: 'gain_weight'},
                    {label: 'Want to stay healthy', value: 'stay_healthy'},
                  ]}
                />
                <HorizontalLine activeColor={activeColor} />
                <SectionTitle
                  title=" Dietary Preferences"
                  activeColor={activeColor}
                />
                <SelectField
                  label="Select your Dietary Preference"
                  value={values.dietaryPreference}
                  onValueChange={itemValue =>
                    setFieldValue('dietaryPreference', itemValue)
                  }
                  error={touched.dietaryPreference && errors.dietaryPreference}
                  activeColor={activeColor}
                  items={[
                    {label: 'Vegitarian', value: 'vegitarian'},
                    {label: 'Non-Vegitarian', value: 'non-vegitarian'},
                    {label: 'Vegan', value: 'vegan'},
                    {label: 'Eggitarian', value: 'eggitarian'},
                  ]}
                />
                <HorizontalLine activeColor={activeColor} />
                <SectionTitle title="Allergies" activeColor={activeColor} />
                <FormField
                  label="Enter your Allergies, If any"
                  value={values.allergies}
                  onChangeText={handleChange('allergies')}
                  onBlur={handleBlur('allergies')}
                  error={touched.allergies && errors.allergies}
                  activeColor={activeColor}
                />
                <HorizontalLine activeColor={activeColor} />
                <SectionTitle
                  title="Medical Conditions"
                  activeColor={activeColor}
                />
                <FormField
                  label="Enter your Medical Conditions, If any"
                  value={values.medicalConditions}
                  onChangeText={handleChange('medicalConditions')}
                  onBlur={handleBlur('medicalConditions')}
                  error={touched.medicalConditions && errors.medicalConditions}
                  activeColor={activeColor}
                />

                <TouchableOpacity
                  style={styles.submitButton(activeColor)}
                  onPress={handleSubmit}>
                  <Text style={styles.submitButtonText(activeColor)}>
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </Modal>
  );
};

const SectionTitle = ({title, activeColor}) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={styles.sectionTitle(activeColor)}>{title}</Text>
  </View>
);
const HorizontalLine = ({activeColor}) => (
  <View
    style={{
      borderTopWidth: 1,
      marginVertical: moderateScale(20),
      width: '100%',
      borderColor: activeColor.SECONDARY,
      alignSelf: 'center',
    }}
  />
);

const FormField = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  activeColor,
  ...props
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel(activeColor)}>{label}</Text>
    <TextInput
      style={styles.input(activeColor)}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...props}
    />
    {error && <Text style={styles.errorText(activeColor)}>{error}</Text>}
  </View>
);

const SelectField = ({
  label,
  value,
  onValueChange,
  error,
  activeColor,
  items,
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel(activeColor)}>{label}</Text>
    <View style={styles.pickerContainer(activeColor)}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={[styles.picker(activeColor)]}
        itemStyle={{
          backgroundColor: 'lightgray', // background color of the picker items
          color: 'blue', // text color of the picker items
          fontSize: 18, // text size
          fontWeight: 'bold', // text styling
        }}>
        {items.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
    {error && <Text style={styles.errorText(activeColor)}>{error}</Text>}
  </View>
);

export default EditeProfileMenu;

const styles = StyleSheet.create({
  container: activeColor => ({
    flex: 1,
    backgroundColor: activeColor.PRIMARY,
    borderRadius: moderateScale(20),
    width: '105%',
    alignSelf: 'center',
  }),
  headerContainer: activeColor => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: moderateScale(10),
    padding: moderateScale(10),
  }),
  headerTitle: activeColor => ({
    color: activeColor.SECONDARY,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  }),
  formContainer: {
    paddingHorizontal: moderateScale(20),
  },
  fieldContainer: {
    marginBottom: moderateScale(15),
  },
  fieldLabel: activeColor => ({
    fontSize: moderateScale(15),
    // fontWeight: 'bold',
    color: activeColor.SECONDARY,
    marginBottom: moderateScale(5),
  }),
  input: activeColor => ({
    borderWidth: 1,
    borderColor: activeColor.TERTIARY,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    color: activeColor.SECONDARY,
  }),
  pickerContainer: activeColor => ({
    borderWidth: 1,
    borderColor: activeColor.TERTIARY,
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  }),
  picker: activeColor => ({
    color: activeColor.SECONDARY,
  }),
  errorText: activeColor => ({
    color: activeColor.DANGER,
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
  }),
  submitButton: activeColor => ({
    backgroundColor: activeColor.TERTIARY,
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(40),
  }),
  submitButtonText: activeColor => ({
    color: activeColor.PRIMARY,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  }),
  sectionTitle: activeColor => ({
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: activeColor.SECONDARY,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  }),
});
