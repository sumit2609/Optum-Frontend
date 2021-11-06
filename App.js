import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './app/screen/signinScreen'
import SignupScreen from './app/screen/signupScreen';
import ProfileDoctor from './app/screen/profileDoctor';
import ProfilePatient from './app/screen/profilePatient';
import AddMedicine from './app/screen/AddMedicine';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false,
        }}
      >
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ProfileDoctor" component={ProfileDoctor} />
        <Stack.Screen name="ProfilePatient" component={ProfilePatient} />
        <Stack.Screen name="AddMedicine" component={AddMedicine} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
