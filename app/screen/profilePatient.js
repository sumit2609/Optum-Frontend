import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'


const ProfilePatient = ({navigation, route}) => {
    let [userData,setUserData] = useState(null);
    let [token, setToken] = useState(null);
    let [loading,setLoading] = useState(false);

    const getProfile = (e) => {
        var config = {
            method: "get",
            url: "https://optum-backend-deploy.herokuapp.com/users/userInfo",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        };
        setLoading(true);
        axios(config)
            .then((res) => {
                setUserData(res.data.userInfo);
                // console.log(res.data.userInfo);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const retrieveData = async() =>{
        try{
            const value = await AsyncStorage.getItem("Token");
            if(value != null){
                setToken(value);
                getProfile(value);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
        retrieveData();
    },[])

    const onPressLogout = async(e) =>{
        console.log("logout")
        try{
            await AsyncStorage.removeItem("Token");
            route.params.setLoggedIn(false);
        }catch(e){
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            {!loading && userData ? (
                <View style={styles.container} >
                <View
                    style={{
                    marginTop: 40,
                    }}
                >
                    <Avatar
                    containerStyle={styles.avatar}
                    size="xlarge"
                    rounded
                    source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "space-between",
                                // top: 80,
                        marginTop: 80,
                    }}
                >
                    <Text style={styles.text}>Name: </Text>
                    <Text style={styles.nameText}>
                        {userData.firstName} {userData.lastName}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "space-between",
                        marginTop: 80,
                    }}
                >
                
                    <View
                        // style={{marginTop:80}}
                    >
                        <Pressable
                            onPress={(e) => {
                                navigation.navigate('viewSchedule',{token});
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText} >See medicine Schedule</Text>
                        </Pressable>
                    </View>    

                    <View
                        style={{paddingTop: 20}}
                    >
                        <Pressable
                            onPress={onPressLogout}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText} >Logout</Text>
                        </Pressable>
                    </View> 
                </View>


            </View>)
            :(
            <View style={[styles.container2, styles.horizontal]}>
                <ActivityIndicator
                style={{ marginTop: -70 }}
                color="#0000ff"
                size="large"
                />
            </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFFF",
        width: "100%",
        height: "100%",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
    },
    avatar: {
        top: 60,
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
})

export default ProfilePatient;
