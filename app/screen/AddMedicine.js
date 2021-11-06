import React,{useState,useEffect} from 'react'
import axios from "axios";
import { View, Text, StyleSheet, TextInput, Pressable,ToastAndroid } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddMedicine = ({navigation}) => {

    const [medName,setmedName] = useState("");
    const [medPatent,setmedPatent] = useState("");
    const [medInfo,setmedInfo] = useState("");
    const [loading, setLoading] = useState(false);

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
        "Medicine Added Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
        );
    };

    const AddMedicine = (token) =>{

        const medicine = {
            medicineName: medName,
            medicinePatent: medPatent,
            medicineInfo: medInfo,
        }

        var config = {
            method: "post",
            url: "https://optum-backend-deploy.herokuapp.com/schedule/addMedicine",
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body: medicine,
        };

        axios(config).then((res) =>{
            setLoading(false);
            showToastWithGravity();
            navigation.navigate('Home');
            console.log(res.data)
        })
        .catch((err) => {
            alert("Error ocurred");
            navigation.navigate('Home');
            console.log(err);
        })
    }

    const retriveToken = async () => {
        try{
            setLoading(true);
            const token = await AsyncStorage.getItem("Token");
            // console.log(token)
            if(token != null){
                AddMedicine(token);
            }
        }catch(error){
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.heading} >
                Add medicines
            </Text>
            <View style={{flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'space-between', top: 130}}>
                <TextInput
                    style={styles.input} 
                    placeholder="Medicine Name"
                    value={medName}
                    onChangeText={(text) => setmedName(text)}
                />
            </View>

            <View style={{flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'space-between', top: 160}} >
                <TextInput
                    style={styles.input} 
                    placeholder="Medicine Patent"
                    value={medPatent}
                    onChangeText={(text) => setmedPatent(text)}
                />
            </View>

            <View style={{flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'space-between', top: 190}} >
                <TextInput
                    style={styles.input1} 
                    placeholder="Medicine Info"
                    value={medInfo}
                    onChangeText={(text) => setmedInfo(text)}
                />
            </View>

            <View style={{top:240}} >
                <Pressable  onPress={retriveToken} style={styles.button}>
                    <Text 
                        style={styles.buttonText}
                    >
                        {loading ? (
                            <Text style={styles.buttonText}>Loading...</Text>
                            ) : (
                             <Text style={styles.buttonText}>ADD MEDICINE</Text>
                        )}
                    </Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFFF',
        width: "100%",
        height: "100%",
        display: "flex",
        alignContent: "center",
        alignItems: "center"
    },
    heading:{
        color:'#172578',
        top: 70,
        fontSize: 30,
        fontWeight:'bold',
    },
    input:{
        width: 264,
        height: 48,
        borderStyle: "solid",
        borderColor: "#8B91AB",
        borderRadius: 5,
        borderWidth: 1.5,
        padding: 10,
    },
    input1:{
        width: 264,
        height: 100,
        borderStyle: "solid",
        borderColor: "#8B91AB",
        borderRadius: 5,
        borderWidth: 1.5,
        padding: 10,
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    
        width: 170,
        height: 70,
    
        borderRadius: 5,
        backgroundColor: "#172578",
    },
    buttonText: {
        fontSize: 20,
        color: "#F7F9FF",
    },
})

export default AddMedicine;
