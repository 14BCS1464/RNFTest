import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';





function Splash(props: any) {

    useEffect(() => {
        handlLogIn()
    }, [])


    //check where to go
    async function handlLogIn() {
        const value = await AsyncStorage.getItem('ID');
        console.warn(value)
        if (value === null) {
            props.navigation.navigate("LogIn")
        } else {
            props.navigation.navigate("Home", {
                id: JSON.parse(value)
            })
        }
    }
    return (
        <View style={styles.parentConatiner}>
            <Text style={styles.RnfText}>{"RNF Test"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    parentConatiner: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }, RnfText: {
        color: "white",
        fontSize: wp('10%')
    }
})
export default Splash