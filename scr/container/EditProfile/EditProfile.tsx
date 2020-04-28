import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CommonTextInput from '../../reuseableComponents/commonTextInput'

import CommonButton from '../../reuseableComponents/commonButton'
import SqlLiteDataBase from '../../DataBase/SqlLiteDatabase'
import Header from '../../reuseableComponents/Header';

const dataBase = new SqlLiteDataBase();

function EditProfile(props: any) {

    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [confrimPassword, setconfrimPassword] = useState("")
    const [phoneNumber, setphoneNUmber] = useState("")
    const [parentName, setParentName] = useState("")
    const [height, setHeight] = useState("")
    const [overallGPA, setOverallGPA] = useState("")
    const [testScore, setTestScore] = useState("")

    useEffect(() => {
        setEmail(props.route.params.details.email)
        setFullName(props.route.params.details.fullName)
        setPassword(props.route.params.details.password)
        setconfrimPassword(props.route.params.details.confrimPassword)
        setphoneNUmber(props.route.params.details.phoneNumber)
        setParentName(props.route.params.details.parentName)
        setHeight(props.route.params.details.height)
        setOverallGPA(props.route.params.details.overallGPA)
        setTestScore(props.route.params.details.testScore)

    }, [])




    const fullNameFiled = (val: any) => {
        setFullName(val)
    }
    const emailFiled = (val: any) => {
        setEmail(val)
    }

    const passwordField = (val: any) => {
        setPassword(val)
    }

    const confrimPasswordField = (val: any) => {
        setconfrimPassword(val)
    }
    const phoneNumberFiled = (val: any) => {
        setphoneNUmber(val)
    }
    const parentNameFiled = (val: any) => {
        setParentName(val)
    }
    const heightField = (val: any) => {
        setHeight(val)
    }
    const overallGPAField = (val: any) => {
        setOverallGPA(val)
    }

    const testScoreField = (val: any) => {
        setTestScore(val)
    }

    //Email Vailidate
    const validateEmail = (email: any) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //Check All the Vailidation
    const onButtonPress = () => {
        if (!fullName) {
            alert("Plaese Eneter Full Name")
            return
        } else if (!email) {
            alert("Plaese Eneter Email")

            return
        }
        else if (!validateEmail(email)) {
            alert("PLease Enter VAilid Email")
            return
        }
        else if (!password) {
            alert("PLease Enter password")
            return
        }
        else if (password.length < 6) {
            alert("password length should be more then 6 charecter ")
            return
        }
        else if (!confrimPassword) {
            alert("PLease Enter confrimPassword")
            return
        }
        else if (confrimPassword.length < 6) {
            alert(" confrimPassword  length should be more then 6 charecter ")
            return
        }
        else if (confrimPassword !== password) {
            alert(" confrimPassword and password  should be same ")
            return
        }
        else if (!phoneNumber) {
            alert("Please enter  Phone number")
            return
        }
        else if (phoneNumber.lenght >= 10) {
            alert("Please enter  vailid   Phone number")
            return
        }
        else if (!parentName) {
            alert("Please enter parent name ")
            return
        }
        else if (!height) {
            alert("Please enter Height ")
            return
        }
        else if (!overallGPA) {
            alert("Please enter overallGPA ")
            return
        }
        else if (!testScore) {
            alert("Please enter test Score ")
            return
        } else {

            upadateTODB()
        }
    }

    // Update user Deatails to DB
    const upadateTODB = () => {
        let data = {
            id: props.route.params.details.email.id,
            fullName: fullName,
            email: email,
            password: password,
            confrimPassword: confrimPassword,
            phoneNumber: phoneNumber,
            parentName: parentName,
            height: height,
            overallGPA: overallGPA,
            testScore: testScore
        }
        dataBase.updateUser(props.route.params.details.id, data).then((result) => {
            props.navigation.pop()

        }).catch((err) => {
            console.warn(err);

        })
    }

    return (
        <View style={{ flex: 1 }}>
            <Header txt={"Edit Profile"} />
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.parentConatiner}>
                <CommonTextInput
                    value={fullName}
                    isPassword={false}
                    keyboardType={'default'}
                    extraStyle={styles.extraStyle}
                    onChangeText={(val: string) => fullNameFiled(val)}
                    placeholder={"Full Name"}
                />
                <CommonTextInput
                    value={email}
                    isPassword={false}
                    keyboardType={'email-address'}
                    extraStyle={{ marginTop: hp('5%') }}
                    onChangeText={(val: string) => emailFiled(val)}
                    placeholder={"Email"}
                />
                <CommonTextInput
                    value={password}
                    isPassword={true}
                    keyboardType={'default'}
                    extraStyle={[styles.extraStyle, { marginTop: hp('5%') }]}
                    onChangeText={(val: string) => passwordField(val)}
                    placeholder={"Password"}
                />
                <CommonTextInput
                    value={confrimPassword}
                    isPassword={true}
                    keyboardType={'default'}
                    extraStyle={[styles.extraStyle, { marginTop: hp('5%') }]}
                    onChangeText={(val: string) => confrimPasswordField(val)}
                    placeholder={" Confrim Password"}
                />
                <CommonTextInput
                    value={phoneNumber}
                    isPassword={false}
                    keyboardType={'numeric'}
                    extraStyle={{ marginTop: hp('5%') }}
                    onChangeText={(val: string) => phoneNumberFiled(val)}
                    placeholder={"Phone number"}
                />
                <CommonTextInput
                    value={parentName}
                    isPassword={false}
                    keyboardType={'default'}
                    extraStyle={{ marginTop: hp('5%') }}
                    onChangeText={(val: string) => parentNameFiled(val)}
                    placeholder={"Parent Name"}
                />
                <CommonTextInput
                    value={height}
                    isPassword={false}
                    keyboardType={'numeric'}
                    extraStyle={{ marginTop: hp('5%') }}
                    onChangeText={(val: string) => heightField(val)}
                    placeholder={"Height"}
                />
                <CommonTextInput
                    value={overallGPA}
                    isPassword={false}
                    keyboardType={'numeric'}
                    extraStyle={{ marginTop: hp('5%') }}
                    onChangeText={(val: string) => overallGPAField(val)}
                    placeholder={"overall GPA"}
                />
                <CommonTextInput
                    value={testScore}
                    isPassword={false}
                    keyboardType={'numeric'}
                    extraStyle={{ marginTop: hp('5%') }}
                    onChangeText={(val: string) => testScoreField(val)}
                    placeholder={"Total Scrore"}
                />
                <CommonButton onButtonPress={() => onButtonPress()} txt={"update"} />

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    parentConatiner: {
        flex: 1,
        backgroundColor: 'yellow',
    }, RnfText: {
    }, extraStyle: {
        marginTop: hp('10%')
    }, signText: {
        marginTop: hp('5%')
    }
})

export default EditProfile