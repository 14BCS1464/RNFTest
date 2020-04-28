import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CommonTextInput from '../../reuseableComponents/commonTextInput'
import AsyncStorage from '@react-native-community/async-storage';
import CommonButton from '../../reuseableComponents/commonButton'
import SqlLiteDataBase from '../../DataBase/SqlLiteDatabase'
import Header from '../../reuseableComponents/Header';

const dataBase = new SqlLiteDataBase();

function LogIn(props: any) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {


    }, [])



    const emailFiled = (val: any) => {
        setEmail(val)
    }

    const passwordField = (val: any) => {
        setPassword(val)
    }

    const validateEmail = (email: any) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //Vailidation check
    const onButtonPress = () => {
        if (!email) {
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
        } else {

            dataBase.userLogIn(email, password).then((data) => {
                console.warn("data" + JSON.stringify(data))
                storeData(JSON.stringify(data))
                props.navigation.navigate("Home", {
                    id: data
                })
            }).catch((err) => {
                console.warn(err);

            })
        }
    }

// store isd in to Async Store
    async function storeData (ID:any)  {
        try {
          await AsyncStorage.setItem('ID', ID)
        } catch (e) {
          // saving error
        }
      }

      // On sign up text Press
    signUpPress = () => {
        props.navigation.navigate("SignUp")
    }
    return (
        <View style={styles.parentConatiner}>
             <Header txt={"Login"}/>
            <CommonTextInput
                value={email}
                isPassword={false}
                keyboardType={'email-address'}
                extraStyle={styles.extraStyle}
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
            <CommonButton onButtonPress={() => onButtonPress()} txt={"LogIn"} />
            <Text onPress={() => signUpPress()} style={styles.signText}>
                {"SignUp"}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    parentConatiner: {
        flex: 1,
        backgroundColor: 'green',

        alignItems: 'center'
    }, RnfText: {


    }, extraStyle: {
        marginTop: hp('20%')
    }, signText: {
        marginTop: hp('5%')
    }
})
export default LogIn