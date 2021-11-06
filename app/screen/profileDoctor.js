import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Button } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation, route }) => {
  let [userData, setUserData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [token, setToken] = useState(null);

//   console.log(userData.firstName)

  const getProfile = (token) => {
    var config = {
      method: "get",
      url: "https://optum-backend-deploy.herokuapp.com/users/userInfo",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setUserData(response.data.userInfo);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const EditProfile = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  const AddMedicine = (e) => {
    e.preventDefault();
    console.log("clicked");
    navigation.navigate('addMedicine')
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Token");
      if (value != null) {
        setToken(value);
        getProfile(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("del");
    retrieveData();
  }, []);

//   const onPress = (e) => {
//     e.preventDefault();
//   };

  const onPressLogout = async (e) => {
    console.log(route.params.setLoggedIn);
    e.preventDefault();
    try {
      await AsyncStorage.removeItem("Token");
      route.params.setLoggedIn(false);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>

      {!loading && userData ? (

            <View style={styles.container}>

            <Avatar
                containerStyle={styles.avatar}
                size="xlarge"
                rounded
                source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
            />
            
            <View
                style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-between",
                    top: 80,
                }}
            >
                <View
                style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-between",
                    // top: 80,
                }}
                >
                    <Text style={styles.text}>Name: </Text>
                    <Text style={styles.nameText}>Dr. {userData.firstName} {userData.lastName}</Text>
                </View>
            </View>

            <View
            styles={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
            }}
            >
                    <View
                        style={{top: 160}}
                    >
                        <Pressable onPress={AddMedicine} style={styles.button}>
                            <Text style={styles.buttonText}>Add Medicines</Text>
                        </Pressable>
                    </View>

                    <View
                        style={{top: 180}}
                    >
                        <Pressable onPress={EditProfile} style={styles.button}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </Pressable>
                    </View>

                    <View
                        style={{top: 200}}
                    >
                        <Pressable onPress={onPressLogout} style={styles.button}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </Pressable>
                    </View>

            </View>
    </View>

      ) : (

        <View style={[styles.container2, styles.horizontal]}>
          <ActivityIndicator
            style={{ marginTop: -70 }}
            color="#0000ff"
            size="large"
          />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatar: {
    top: 60,
  },
  text: {
    color: "#454545",
    fontSize: 25,
    fontWeight: "bold",
  },
  nameText: {
    // fontWeight: 'bold' ,
    color: "#172578",
    fontSize: 22,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10,
    width: 150,
    height: 40,

    borderRadius: 10,
    backgroundColor: "#172578",
  },
  buttonText: {
    color: "#F7F9FF",
  },
});

export default Profile;
