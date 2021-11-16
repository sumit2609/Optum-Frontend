import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { DataTable } from 'react-native-paper';
import moment from 'moment';

const viewSchedule = ({navigation, route}) => {

    const {token} = route.params
    let [loading,setloading] = useState(false);
    let [schedule,setSchedule] = useState([]);
    
    const getMedSchd = () =>{
        var config = {
            method: "get",
            url: "https://optum-backend-deploy.herokuapp.com/schedule/viewSchedulePatient",
            headers:{
                Authorization: `Bearer ${token}`,
            },
        };
        setloading(true);
        axios(config)
            .then((res) => {
                setSchedule(res.data.info);
                setloading(false);
            })
            .catch((err) => {
                // console.log(err);
            })
    }

    useEffect(() =>{
        getMedSchd();
    },[])

    return (
        <View
            style={style.container}
        >
                {schedule ? (
                <View
                    style={style.container}
                >
                    <View style={style.listWrapper} >
                        <Text style={style.row}>Medicine Name</Text>
                        <Text style={style.row}>From</Text>
                        <Text style={style.row}>Till</Text>
                    </View>   

                    <FlatList 
                        data={schedule}
                        renderItem={({item})=>
                        // {console.log(moment(item.startTime).format('LT'))}
                            <View style={style.listWrapper} >
                                <Text style={style.row} >{item.medicine.medicineName}</Text>
                                <Text style={style.row}>{moment(item.startTime).format('LT')}</Text>
                                <Text style={style.row}>{moment(item.endTime).format('LT')}</Text>
                            </View>
                        }
                    />
                    
                </View>

                ):(
                <View style={[style.container2, style.horizontal]}>
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

const style = StyleSheet.create({
    container:{
        backgroundColor: "#FFFF",
        width: "100%",
        height: "100%",
        paddingTop :20,
        paddingHorizontal:5,        
    },
    listWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: .5
    },
    row:{
        backgroundColor: "#FFFF",
        flex: 1,
        fontSize: 14,
        paddingHorizontal:2,
        paddingVertical: 10,
    }

})

export default viewSchedule;
