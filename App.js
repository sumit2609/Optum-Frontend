import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./app/screen/signinScreen";
import SignupScreen from "./app/screen/signupScreen";
import ProfileDocotor from "./app/screen/profileDoctor";
import PorfilePatient from './app/screen/profilePatient';
import AddMedicine from "./app/screen/AddMedicine.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePatient from "./app/screen/profilePatient";
import SetSchedule from "./app/screen/ScheduleSet";

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_type, setUserType] = useState(null);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Token");
      // console.log(value);
      if (value != null) {
        setLoggedIn(true);
        setToken(value);
      } else {
        setLoggedIn(false);
      }
      let f_value = null;
      f_value = await AsyncStorage.getItem("UserType");
      if (f_value != null) {
        setUserType(f_value);
      }
      // console.log(loggedIn);
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);
  // useEffect(()=>{
  //   console.log(loggedIn);
  // });

  return (
    <NavigationContainer>
      {loggedIn ? (
        user_type == "doctor" ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={ProfileDocotor}
              initialParams={{ setLoggedIn: setLoggedIn }}
            />
            <Stack.Screen name="addMedicine" component={AddMedicine} />
            <Stack.Screen name="setSchedule" component={SetSchedule} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={ProfilePatient}
              initialParams={{ setLoggedIn: setLoggedIn }}
            />
          </Stack.Navigator>
        )
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={SigninScreen}
            initialParams={{ setLoggedIn: setLoggedIn }}
          />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
