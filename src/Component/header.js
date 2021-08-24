import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {logOut } from '../Store/Action/action'
import { StyleSheet, View, Image, Text, StatusBar, AppRegistry, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor='#fdb458'
                    barStyle="light-content"
                />
                <View style={{
                    height: 60,
                    backgroundColor: '#fd902a',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: "row"
                }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Icon name='arrow-circle-left' size={30} color="#fff" style={{
                            paddingLeft: 15,
                        }} onPress={() => { Actions.pop() }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image source={require('../Images/Logo.png')}
                            style={{ height: 40, width: 140, justifyContent: "flex-start" }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <AIcon name='logout' size={30} color="#fff" style={{
                            paddingRight: 15,
                        }} onPress={() => console.log(this.props.logOut()) } />
                    </View>

                </View>
            </View>
        )
    }
}

function mapStateToProp(state) {
    // console.log(state.root.allCoupons, 'state in admin')
    return ({
        // allCouponss: state.root.allCoupons,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        logOut: () => {
            dispatch(logOut())
        }
    })
}

export default connect(mapStateToProp , mapDispatchToProp)(Header)