import React, { Component } from 'react';
import { connect } from 'react-redux'
import FIcon from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import { allCoupons, logOut } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import { Fab, Icon } from 'native-base';
import { StyleSheet, View, Image, FlatList, TouchableHighlight, ActivityIndicator, BackHandler, Text, TouchableOpacity } from 'react-native';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        this.props.allCoupons()
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
    }
    render() {
        console.log('dasdsadadsadsadsadas')
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <View style={{
                    height: 60,
                    backgroundColor: '#fd902a',
                    // width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row"
                }}>
                    <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Image source={require('../Images/Logo.png')}
                            style={{ height: 40, width: 140, }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <AIcon name='logout' size={30} color="#fff" style={{
                            paddingRight: 12,
                        }} onPress={() => {
                            console.log('log out'),
                                this.props.logOut()
                        }} />
                    </View>
                </View>

                {
                    this.props.allCouponss.length !== 0 ?
                        <FlatList
                            data={this.props.allCouponss}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => { Actions.CouponDetail({ couponDetail: item }) }}>

                                    <View style={{
                                        flex: 0.8, flexDirection: "column", marginHorizontal: '6%', borderColor: 'black',
                                        borderWidth: 0, marginVertical: 6,
                                    }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Image
                                                style={{
                                                    height: 184,
                                                    width: '100%',
                                                    resizeMode: 'contain'
                                                }}
                                                source={{ uri: item.couponImages[0] }}
                                            />
                                        </View>
                                        <View style={{
                                            flexDirection: "row", flex: 1, marginVertical: 3,
                                            justifyContent: 'space-around', alignItems: 'center'
                                        }}>
                                            <View style={{ flex: 3, flexDirection: 'row' }}>
                                                <Text style={{ marginLeft: 5, color: 'grey' }}> {item.merchantsName} </Text>
                                                <Text style={{ marginLeft: 5, color: 'black' }}> {item.merchantsAddress} </Text>
                                            </View>
                                            {/* <View style={{ flex: 1, }}>
                                            <TouchableOpacity style={{
                                                height: 30, width: '80%', borderColor: '#fce5c8', borderWidth: 1, borderRadius: 4,
                                                justifyContent: 'center', alignItems: 'center', backgroundColor: '#fd902a'
                                            }} onPress={() => { Actions.CouponDetail({ couponDetail: item }) }}>
                                                <Text style={{ textAlign: 'center', color: '#fff' }} > Details </Text>
                                            </TouchableOpacity>
                                        </View> */}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />

                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text> You dont added any coupons </Text>

                        </View>
                }

                <Fab
                    style={{
                        backgroundColor: '#f8a721', marginBottom: 25
                    }}
                    position="bottomRight"
                    onPress={() => Actions.AddCouponForm()} >
                    <Icon name="add" />

                </Fab>

            </View>

        )
    }
}

function mapStateToProp(state) {
    // console.log(state.root.allCoupons, 'state in admin')
    return ({
        allCouponss: state.root.allCoupons,
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        allCoupons: () => {
            dispatch(allCoupons())
        },
        logOut: () => {
            dispatch(logOut())
        }
    })
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5FCFF',
        marginHorizontal: 4,
        marginVertical: 5,

    },
});

export default connect(mapStateToProp, mapDispatchToProp)(AdminHome)