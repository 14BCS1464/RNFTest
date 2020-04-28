import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import CommonButton from '../../reuseableComponents/commonButton'
import SqlLiteDataBase from '../../DataBase/SqlLiteDatabase'
import Header from '../../reuseableComponents/Header';

const dataBase = new SqlLiteDataBase();

function Home(props: any) {
    const [data, setData] = useState({})
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getDataByID()
        });
        return unsubscribe;
    }, [])


    //get user Details from ID
    const getDataByID = () => {
        dataBase.userById(props.route.params.id).then((result) => {
            console.warn("result" + JSON.stringify(result))
            setData(result)

        }).catch((err) => {
            console.warn(err)
        });
    }

    //on Edit profile press
    const onEditPress = () => {
        props.navigation.navigate("EditProfile", {
            details: data
        })
    }

    //on Log OUt Press
    const logOutPress = () => {
        AsyncStorage.clear();
        props.navigation.navigate("LogIn")
    }

    return (
        <View style={styles.parentConatiner}>
            <Header txt={"Home"} />
            <View style={{ width: '100%', marginTop: hp('10%') }}>
                <Text style={styles.textStyle}>
                    {"Full Name    " + data.fullName}
                </Text>
                <Text style={styles.textStyle}>
                    {"Eamil   " + data.email}
                </Text>
                <Text style={styles.textStyle}>
                    {"Phone   " + data.phoneNumber}
                </Text>
                <Text style={styles.textStyle}>
                    {"Parent Name  " + data.parentName}
                </Text>
                <Text style={styles.textStyle}>
                    {"Height   " + data.height}
                </Text>
                <Text style={styles.textStyle}>
                    {"overallGPA   " + data.overallGPA}
                </Text>
                <Text style={styles.textStyle}>
                    {"TestScore   " + data.testScore}
                </Text>
            </View>
            <CommonButton onButtonPress={() => logOutPress()} txt={"Logout"} />
            <CommonButton onButtonPress={() => onEditPress()} txt={"Edit"} />
        </View>
    )
}
const styles = StyleSheet.create({
    parentConatiner: {
        flex: 1,
        backgroundColor: 'pink',

        alignItems: 'center'
    }, textStyle: {
        fontSize: wp('5%'),
        marginLeft: wp('20%')
    }
})
export default Home