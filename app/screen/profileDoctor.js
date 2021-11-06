import React from 'react'
import { View, Text, StyleSheet,Pressable } from 'react-native'
import { Avatar } from 'react-native-elements';

const ProfileDoctor = ({ navigation, route }) => {
    console.log(route.params.user.user.firstName);
    console.log(route.params.user.user.lastName);

    const EditProfile = (e) =>{
        e.preventDefault();
        console.log("clicked")
    }

    const AddMedicine = (e) =>{
        e.preventDefault();
        console.log("clicked")
        navigation.navigate('AddMedicine');
    }
    return (
        <View style={styles.container} > 
            <Avatar
                containerStyle={styles.avatar}  
                size="xlarge"
                rounded  
                source={{uri: 'https://www.w3schools.com/howto/img_avatar.png',}}
            />
            <View style={{flexDirection:'row',display:'flex',alignItems:'center',alignContent:'center', top:80}} >
                <Text style={styles.text} >
                    Name: 
                </Text>

                <Text style={styles.nameText} >
                    {" "}Dr.{route.params.user.user.firstName} {route.params.user.user.lastName}
                </Text>
            </View>

            <View style={{display:'flex',alignItems:'center',justifyContent:'space-between', top:160}} >
                <Pressable onPress={EditProfile} style={styles.button}>
                    <Text
                        style={styles.buttonText}
                    >
                        Edit Profile
                    </Text>
                </Pressable>
            </View>

            <View style={{display:'flex',alignItems:'center',justifyContent:'space-between', top:180}} >

                <Pressable onPress={AddMedicine} style={styles.button}>
                    <Text 
                        style={styles.buttonText}
                    >
                        Add Medicines
                    </Text>
                </Pressable>

            </View>
            
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
        alignItems: "center"
    },
    avatar:{
        top: 60,
    },
    text:{
        color: '#454545',
        fontSize: 25,
        fontWeight: 'bold'
    },
    nameText:{
        // fontWeight: 'bold' ,
        color: '#172578',
        fontSize: 22,
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    
        width: 150,
        height: 40,
    
        borderRadius: 10,
        backgroundColor: "#172578",
      },
      buttonText: {
        color: "#F7F9FF",
      },
})

export default ProfileDoctor;
