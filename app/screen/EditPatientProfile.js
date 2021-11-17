import React,{useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

const EditPatientProfile = ({navigation, route}) => {

    const [age,setAge] = useState("");
    const [maritalSta,setMatrialSta] = useState("");
    const [gender,setGender] = useState("");
    const [loc,setloc] = useState("");
    const [expense,setexpense] = useState("");
    const [comp,setcomp] = useState("");

    return (
        <View
            style={styles.container}
        >
            <View
                style={{flexDirection: 'column', top:70, padding:20}}
            >
                <View
                    style={{flexDirection: 'row',marginTop:15}}
                >
                    <View
                        style={{flex: 2,display:'flex', flexDirection:'column',alignItems:'center'}}
                    >
                        <Text>
                            age
                        </Text>
                    </View>
                    <View
                        style={{flex: 4,display:'flex', flexDirection:'row',alignItems:'center'}}
                    >
                        <TextInput
                            style={styles.input} 
                            placeholder="age"
                            value={age}
                            onChangeText={(text) => setAge(text)}
                        />
                    </View>
                </View>

                <View
                    style={{flexDirection: 'row',marginTop:15}}
                >
                    <View
                        style={{flex: 2,display:'flex', flexDirection:'column',alignItems:'center'}}
                    >
                        <Text>
                            marital status
                        </Text>
                    </View>
                    <View
                        style={{flex: 4,display:'flex', flexDirection:'row',alignItems:'center'}}
                    >
                        <TextInput
                            style={styles.input} 
                            placeholder="marital status"
                            value={maritalSta}
                            onChangeText={(text) => setMatrialSta(text)}
                        />
                    </View>
                </View>

                <View
                    style={{flexDirection: 'row',marginTop:15}}
                >
                    <View
                        style={{flex: 2,display:'flex', flexDirection:'column',alignItems:'center'}}
                    >
                        <Text>
                            gender
                        </Text>
                    </View>
                    <View
                        style={{flex: 4,display:'flex', flexDirection:'row',alignItems:'center'}}
                    >
                        <TextInput
                            style={styles.input} 
                            placeholder="gender"
                            value={gender}
                            onChangeText={(text) => setGender(text)}
                        />
                    </View>
                </View>

                <View
                    style={{flexDirection: 'row',marginTop:15}}
                >
                    <View
                        style={{flex: 2,display:'flex', flexDirection:'column',alignItems:'center'}}
                    >
                        <Text>
                            lat/long(location)
                        </Text>
                    </View>
                    <View
                        style={{flex: 4,display:'flex', flexDirection:'row',alignItems:'center'}}
                    >
                        <TextInput
                            style={styles.input} 
                            placeholder="lat/long(location)"
                            value={loc}
                            onChangeText={(text) => setloc(text)}
                        />
                    </View>
                </View>

                <View
                    style={{flexDirection: 'row',marginTop:15}}
                >
                    <View
                        style={{flex: 2,display:'flex', flexDirection:'column',alignItems:'center'}}
                    >
                        <Text>
                            avg health_care expense
                        </Text>
                    </View>
                    <View
                        style={{flex: 4,display:'flex', flexDirection:'row',alignItems:'center'}}
                    >
                        <TextInput
                            style={styles.input} 
                            placeholder="avg health_care expense"
                            value={expense}
                            onChangeText={(text) => setexpense(text)}
                        />
                    </View>
                </View>

                <View
                    style={{flexDirection: 'row',marginTop:15}}
                >
                    <View
                        style={{flex: 2,display:'flex', flexDirection:'column',alignItems:'center'}}
                    >
                        <Text>
                            health_insurance_company
                        </Text>
                    </View>
                    <View
                        style={{flex: 4,display:'flex', flexDirection:'row',alignItems:'center'}}
                    >
                        <TextInput
                            style={styles.input} 
                            placeholder="health_insurance_company"
                            value={comp}
                            onChangeText={(text) => setcomp(text)}
                        />
                    </View>
                </View>

                
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
        // alignContent: "center",
        // alignItems: "center",
    },
    input:{
        width: "100%",
        height: 18,
        // borderStyle: "solid",
        borderColor: "#8B91AB",
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
    },
})

export default EditPatientProfile
