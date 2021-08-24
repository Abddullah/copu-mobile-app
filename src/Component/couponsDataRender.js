import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Header from './header'
import firebase from 'firebase'
import { DeckSwiper, Card, CardItem, Body, Thumbnail, Left, Footer, FooterTab, Button, H1 } from 'native-base';
import { StyleSheet, View, Image, StatusBar, FlatList, TouchableHighlight, ActivityIndicator, Platform, Text, AppRegistry, Alert, TextInput, ScrollView, Dimensions, TouchableOpacity, } from 'react-native';
import { allCoupons } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'


class CouponsDataRander extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedArr: [],
            cards: []
        }
    }


    componentWillMount() {
        this.setState({
            selectedArr: this.props.param1
        })

    }


    render() {

        console.log(this.state.selectedArr, "selected arr")
        return (
            <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "#fff", }} >
                <Header />

                {(this.state.selectedArr.length === 0) ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{marginTop:"50%",fontWeight:"bol" }}> There is no coupons </Text>
                    </View>


                ) :
                    <FlatList
                        data={this.state.selectedArr}
                        renderItem={({ item, index }) =>


                            <View>
                                {
                                    (this.props.param2 === "user") ? (
                                        <TouchableOpacity
                                            onPress={() => {
                                                Actions.CouponDetail({
                                                    couponDetail: item,
                                                    param2: "user",
                                                })
                                            }}>
                                            <View style={{
                                                flex: 1, flexDirection: "column", marginHorizontal: '6%', borderColor: 'black',
                                                borderWidth: 0, marginVertical: 6,
                                            }} >
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
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ) :
                                        (this.props.param2 === "wallet") ? (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Actions.CouponDetail({
                                                        couponDetail: item,
                                                        param2: "wallet",
                                                        waletIndex: index
                                                    })

                                                }}>
                                                <View style={{
                                                    flex: 1, flexDirection: "column", marginHorizontal: '6%', borderColor: 'black',
                                                    borderWidth: 0, marginVertical: 6,
                                                }} >
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
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ) : <TouchableOpacity
                                            onPress={() => {
                                                Actions.CouponDetail({
                                                    couponDetail: item,

                                                })


                                            }}>
                                                <View style={{
                                                    flex: 1, flexDirection: "column", marginHorizontal: '6%', borderColor: 'black',
                                                    borderWidth: 0, marginVertical: 6,
                                                }} >
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
                                                    </View>
                                                </View>
                                            </TouchableOpacity>



                                }
                            </View>


                        }
                    />
                }

            </ScrollView>





        )
    }
}

// width: this.props.input ? 100 : 270
function mapStateToProp(state) {
    // console.log(state.root.allCoupons, 'state in admin')
    return ({
        allCouponss: state.root.allCoupons
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
        // backgroundColor: '#F5FCFF',
        // marginHorizontal: 4,
        // marginVertical: 5,


    },
    deleteModalText: {
        fontSize: 18,
        // color: '#fff',
        marginTop: "3%", marginBottom: "2%", marginLeft: "5%"
    },
    Footer: { position: "absolute", bottom: 0, width: "100%", height: 60, backgroundColor: "#fd902a", flexDirection: 'row', },
    profile: { backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 0.5, width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
});

export default connect(mapStateToProp, mapDispatchToProp)(CouponsDataRander)
// export default Home