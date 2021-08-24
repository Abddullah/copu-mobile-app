import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Header from './header'
import firebase from 'firebase'
import { DeckSwiper, Card, CardItem, Body, Thumbnail, Left, Footer, FooterTab, Button } from 'native-base';
import { Container, Content, } from "native-base";

import { StyleSheet, View, Image, StatusBar, TouchableHighlight, ActivityIndicator, Platform, Text, AppRegistry, Alert, TextInput, ScrollView, Dimensions, TouchableOpacity, } from 'react-native';
import { allCoupons } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'


class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        console.log(this.props.userDetails, "user")
    }

    render() {
        return (


            <View style={{ backgroundColor: "#fff", flex: 1 }}>
                <ScrollView
                // stickyHeaderIndices={[0]}
                >
                    <Header />

                    <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                        <Text style={{ marginBottom: "1%" ,fontSize: 11}}>User Name: </Text>
                        <Text style={{ color: "black", fontSize: 13 }}>{this.props.userDetails.userName} </Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                        <Text style={{ marginBottom: "1%",fontSize: 11 }}>Full Name: </Text>
                        <Text style={{ color: "black", fontSize: 13 }}>{this.props.userDetails.fullName} </Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                        <Text style={{ marginBottom: "1%" ,fontSize: 11}}>Email: </Text>
                        <Text style={{ color: "black", fontSize: 13 }}>{this.props.userDetails.userEmail} </Text>
                    </View>

                

                </ScrollView>






            </View>

        )
    }
}


function mapStateToProp(state) {
    return ({
        userDetails: state.root.currentUser,
    })
}

function mapDispatchToProp(dispatch) {
    return ({

        allCoupons: () => {
            dispatch(allCoupons())
        },
    })
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Footer: { position: "absolute", bottom: 0, width: "100%", height: 60, backgroundColor: "orange", flexDirection: 'row', },
    profile: { backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 0.5, width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
});

export default connect(mapStateToProp, mapDispatchToProp)(UserDetails)
