  
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CommonTextInput = (props: any) => {
    return (
        <View style={[styles.parentContaineer,props.extraStyle]}>
            <TextInput 
            secureTextEntry={props.isPassword}  
            keyboardType={props.keyboardType}
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            style={[styles.textInputStyle,]} />
        </View>
    )
}

const styles = StyleSheet.create({
    parentContaineer: {
        height: hp("7%"),
        width: wp("70%"),
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor:'white'
    }, textInputStyle: {
        flex: 1,
        fontSize: wp("4%"),
        color: 'black',
        paddingHorizontal: wp('3%')
    }, searchIonStyle: {
        height: hp("5%"),
        width: wp("5%"),
        tintColor: 'white',
        marginHorizontal: wp('2%')

    }


});



export default CommonTextInput