import React, { Component } from 'react';
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { Container, Header, Drawer, Left, Body, Right, Title, Item, Input, Picker, Form, Item as FormItem } from 'native-base';
import { StyleSheet, View, Image, Text, AppRegistry, Alert, StatusBar,ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
class Splash extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid )
                if (user.uid === 'LB2xoa0PGee9wqEgr52Sei7vnM03') {
                    Actions.AdminHome()
                } else {
                    Actions.Home()
                }
            }
            else {
                console.log('no user')
                Actions.signIn()
            }
        })
    }
    render() {
        return (
            <ImageBackground source={require('../Images/Photo.png')}
             style={{ backgroundColor: '#fd902a', flex: 1, 
            justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar
                    backgroundColor='#fd902a'
                    barStyle="light-content"
                />
                    <View style = {{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
                    <Image  style = {{ flex : 1, resizeMode : 'contain' ,height : 112 ,  width : 300}}  
                    source={require('../Images/Logo.png')}
                    />
                        </View>
            </ImageBackground>
        )
    }
}
export default Splash