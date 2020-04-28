import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../container/Splash/Splash';
import LogIn from '../container/login/LogIn';
import SignUp from '../container/SignUp/SignUp';
import Home from '../container//Home/Home';
import EditProfile from '../container/EditProfile//EditProfile';

const RootStack = createStackNavigator();

export default class AppContainer extends React.PureComponent<{}>{

  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="Splash">

          <RootStack.Screen name="Splash" component={Splash} />
          <RootStack.Screen name="LogIn" component={LogIn} />
          <RootStack.Screen name="SignUp" component={SignUp} />
          
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="EditProfile" component={EditProfile} />


        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};