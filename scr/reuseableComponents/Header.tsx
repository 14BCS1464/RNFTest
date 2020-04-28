
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Header = (props: any) => {
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
        height: hp("7%"),
        width:"100%",
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor:'white',
        alignItems: 'center',
      justifyContent:'center',
        flexDirection: 'row',
      
    },  textStyle: {
        fontSize: wp('10%')

    }


});



export default Header;