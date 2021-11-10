import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
export default function ScheduleSet() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientSchedule, setPatientSchedule] = useState([]);
  const [patientLoader, setPatientLoader] = useState(false);
  const [token, setToken] = useState(null);
  const [medicine, setMedicine] = useState(null);
  const [medicineId, setMedicineId] = useState(null);
  const [scheduleBtnLoading, setScheduleBtnLoading] = useState(false);
  
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Token");
      if (value != null) {
        setToken(value);
        getPatient(value);
        getMedicines(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPatient = (token) => {
    var config = {
      method: "get",
      url: "https://optum-backend-deploy.herokuapp.com/users/getPatients",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        setPatients(response.data.users);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };
  const getMedicines = (token) => {
    var config = {
      method: "get",
      url: "https://optum-backend-deploy.herokuapp.com/schedule/getMedicine",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        setMedicine(response.data.medicines);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const addSchedule = () => {
    const schedule = patientSchedule;
    schedule.push({
      startTime: startDate,
      endTime: endDate,
      medicine: medicineId,
    });

    var data = JSON.stringify({
      patient: selectedPatient,
      schedule: schedule,
    });
    var config = {
      method: "post",
      url: "https://optum-backend-deploy.herokuapp.com/schedule/setSchedule",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    setScheduleBtnLoading(true);
    axios(config)
      .then((res) => {
        setScheduleBtnLoading(false);
        alert('New schedule added.Click get schedule button to get latest schedule of the patient.')
      })
      .catch((err) => {
        alert("Error occured");
        setScheduleBtnLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const currentTime = new Date(year, month, date, 8, 11, 0);
    setStartDate(currentTime);
    setEndDate(currentTime);
    retrieveData();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === "ios");
    console.log(currentDate);
    setStartDate(currentDate);
  };
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShow1(Platform.OS === "ios");
    console.log(currentDate);
    setEndDate(currentDate);
  };
  const getPatientInfo = (patientId) => {
    var config = {
      method: "get",
      url: `https://optum-backend-deploy.herokuapp.com/schedule/viewSchedule/${patientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(patientId, token);
    setPatientLoader(true);
    axios(config)
      .then(function (response) {
        setPatientSchedule(response.data.info);
        setPatientLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        setPatientLoader(false);
      });
  };
  const delSchedule=(idx)=>{
    console.log(idx);

    Alert.alert(
      'Are you sure you want to remove this schedule?',
      '',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK', 
          onPress: () => {
            let x=patientSchedule;
            let i=0;
            while(i<x.length){
              if(x[i]._id.toString()==idx.toString()){
                x.splice(i,1);
                
              }
              else{
                i++;
              }
            }

            var data = JSON.stringify({
              patient: selectedPatient,
              schedule: x,
            });
            var config = {
              method: "post",
              url: "https://optum-backend-deploy.herokuapp.com/schedule/setSchedule",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              data: data,
            };
            setLoading(true);
            axios(config)
              .then((res) => {
                setLoading(false);
                alert('New schedule added.Click get schedule button to get latest schedule of the patient.')
                getPatientInfo(selectedPatient);
              })
              .catch((err) => {
                alert("Error occured");
                setLoading(false);
                console.log(err);
              });
          }
        },
      ],
      {cancelable: true},
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header_sselect}>Medicine Schedule</Text>
      {!loading && patients && medicine && patientSchedule ? (
        <View style={{ height: "100%" }}>
          <Text style={styles.header_select}>Select Patient :</Text>
          <Picker
            selectedValue={selectedPatient}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedPatient(itemValue);
            }}
          >
            <Picker.Item label={`Select a patient`} value={null} />
            {patients.map((patient) => {
              return (
                <Picker.Item
                  label={`${patient.firstName} ${patient.lastName} (${patient.username})`}
                  value={patient._id}
                />
              );
            })}
          </Picker>
          <View>
            <Button
              title={!patientLoader ? "Get Schedule" : "Loading..."}
              color="#03A9F4"
              onPress={() => {
                getPatientInfo(selectedPatient);
              }}
            />
          </View>
          <View>
            {patientLoader ? (
              <View style={[styles.container2, styles.horizontal]}>
                <ActivityIndicator
                  style={{ marginTop: 70 }}
                  color="#0000ff"
                  size="large"
                />
              </View>
            ) : (
              <View style={styles.scheduleContainer}>
                {patientSchedule ? (
                  <FlatList
                    data={patientSchedule}
                    renderItem={({ item }) => (
                      <View style={styles.item}>
                        <Text style={styles.title}>
                          {JSON.stringify(moment(item.startTime).format('hh:mm'))?.slice(1,-1)} - {JSON.stringify((moment(item.endTime).format('hh:mm')))?.slice(1,-1)} -- {JSON.stringify(item.medicine.medicineName)?.slice(1,-1)}
                        </Text>
                        <View>
                          <View  style={styles.btnDel}>
                        <Button
                          onPress={()=>{delSchedule(item._id)}}
                          title="DEL"
                          color="gray"
                          style={styles.btnDel}
                        />
                        </View>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item._id}
                  />
                ) : (
                  ""
                )}
              </View>
            )}
          </View>
          <View style={styles.timer1}>
            <View style={styles.timer}>
              <Button
                onPress={() => {
                  setShow(true);
                }}
                title="Pick Start Time"
              />
              <Button
                onPress={() => {
                  setShow1(true);
                }}
                title="Pick End Time"
              />
            </View>
            <View>
              <Picker
                selectedValue={medicineId}
                onValueChange={(itemValue, itemIndex) => {
                  setMedicineId(itemValue);
                }}
              >
                <Picker.Item label={"Select a medicine"} value={null} />
                {medicine.map((medicine) => {
                  return (
                    <Picker.Item
                      label={`${medicine.medicineName} (${medicine.medicinePatent})`}
                      value={medicine._id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View>
              <Button
                onPress={addSchedule}
                title={scheduleBtnLoading ? "Loading ..." : "Add to Schedule"}
                color="#03A9F4"
              />
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode={"time"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          {show1 && (
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode={"time"}
              is24Hour={true}
              display="default"
              onChange={onChange1}
            />
          )}
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
}

const styles = StyleSheet.create({
  scheduleContainer: {
    marginBottom: 350,
    marginTop: 10,
  },
  container: {
    backgroundColor: "#FFFF",
    width: "100%",
    height: "100%",
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  header_sselect: {
    textAlign: "center",
    fontSize: 24,
    color: "#03A9F4",
    fontWeight: "bold",
    marginBottom: 30,
  },
  header_select: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timer1: {
    position: "absolute",
    width: "100%",
    bottom: 80,
  },

  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderWidth: 0,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  btnDel:{
   
    
    width:50,
    marginTop:10,
  }
});
