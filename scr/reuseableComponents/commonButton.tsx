
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CommonButton = (props: any) => {
    return (
        <View style={[styles.parentContaineer, props.extraStyle]}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => props.onButtonPress()}>
                <Text>
                    {props.txt}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    parentContaineer: {
        height: hp("5%"),
        width: wp("50%"),
        marginTop:hp('10%'),
        
      
        borderRadius: 10,
        flexDirection: 'row',
   
    }, buttonStyle: {
        flex: 1,
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: wp('3%')
    }, textStyle: {
        fontSize: wp('10%')

    }


});



export default CommonButton;