import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import DIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LIcon from 'react-native-vector-icons/Entypo';
import Header from './header'
import { StyleSheet, View, Image, StatusBar, TouchableHighlight, ActivityIndicator, Platform, Text, AppRegistry, SafeAreaView, Alert, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Items, Item, Input, Button, } from 'native-base';

import ImageSlider from 'react-native-image-slider';
import { saveWallet, removeWallet, useWallet, useWalletInWallet } from '../Store/Action/action';
import Modal from "react-native-modal";
// import ErrorMessage from '../Component/errorMessage';



class CouponDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isModalVisible1: false,
            count: false,
            walletCheck: false
        }


    }
    _toggleModal = () =>
        this.setState({
            isModalVisible: !this.state.isModalVisible,
        });

    _toggleModal1 = () =>
        this.setState({
            isModalVisible1: !this.state.isModalVisible1,
        });


    createOption() {
        this._toggleModal()

    }
    createOption1() {
        this._toggleModal1()
    }

    componentWillMount() {
        console.log('cloneUsedCoupons', this.props.usedCouponsData)
        let data = this.props.couponDetail
        console.log(data, 'dataaaaa', this.props.waletIndex)
        this.setState({
            data: data
        })
        let cloneData = this.props.allWalletData
        for (var i = 0; i < cloneData.length; i++) {
            if (cloneData[i].id == data.id) {
                console.log('matched', cloneData[i])
                this.setState({
                    walletCheck: true
                })
            }
        }

    }



    saveWallet() {
        // console.log("saveWallet")
        let cloneData = this.state.data
        this.props.saveWallet(cloneData)

    }
    removeWallet() {
        // console.log('waleet function')
        let cloneData = this.state.data
        this.props.removeWallet(cloneData, this.props.allWalletData, this.props.waletIndex)

    }

    openModel() {
        let cloneData = this.props.usedCouponsData
        let allData = this.state.data
        sortedUsedData = {}
        if (allData.noCoupons === 0) {
            alert("This coupon is no more available")
        }
        else {
            if (cloneData.length === 0) {
                this.createOption(this.bind)
            }
            else {
                for (var i = 0; i < cloneData.length; i++) {
                    if (cloneData[i].id == allData.id) {
                        // console.log('matched', cloneData[i])
                        sortedUsedData = cloneData[i]
                    }
                }
                if (sortedUsedData.used === true) {
                    alert("you have already used this coupon")
                }
                else {
                    this.createOption(this.bind)
                }
            }
        }
    }


    openModel1() {

        let cloneData = this.props.usedCouponsData
        let allData = this.state.data
        sortedUsedData = {}
        if (allData.noCoupons === 0) {
            alert("This coupon is no more available")
        }
        else {
            if (cloneData.length === 0) {
                this.createOption1(this.bind)
            }
            else {
                for (var i = 0; i < cloneData.length; i++) {
                    if (cloneData[i].id == allData.id) {
                        // console.log('matched', cloneData[i])
                        sortedUsedData = cloneData[i]
                    }
                }
                if (sortedUsedData.used === true) {
                    alert("you have already used this coupon")
                }
                else {
                    this.createOption1(this.bind)
                }
            }
        }



















        // let cloneData = this.props.usedCouponsData
        // console.log(cloneData, "clone use coupons")
        // let allData = this.state.data


        // if (allData.noCoupons === 0) {

        //     alert("This coupon is no more available")
        // }

        // else {

        //     // for (var i = 0; i < cloneData.length; i++) {
        //     //     if (cloneData[i].id == allData.id) {
        //     //         console.log('matched', cloneData[i])
        //     //         if (cloneData[i].used === true) {
        //     //             alert("you have already used this coupon")
        //     //             // console.log("sorry")
        //     //         }
        //     //         else {
        //     //             console.log("copon used")
        //     //             // this.props.openModel(cloneData)
        //     //             this.createOption1(this.bind)



        //     //         }

        //     //     }


        //     // }

        //     this.createOption1(this.bind)




        // }


        // if (cloneData.used === true) {
        //     alert("you have already used this coupon")
        // }
        // else {
        //     this.createOption1(this.bind)
        // }

    }



    useCoupons() {
        let cloneData = this.state.data
        if (this.state.couponPassword === cloneData.couponPassword) {
            // console.log("data saved")
            this.props.useWallet(cloneData)
            this.createOption(this.bind)

        }
        else {
            alert("Password mismatched")

        }
        this.setState({
            couponPassword: "",
        })
    }



    useCouponsInWallet() {
        let cloneData = this.state.data
        if (this.state.couponPassword === cloneData.couponPassword) {
            // console.log("data saved")
            // console.log(this.props.allWalletData)
            this.props.useWalletInWallet(cloneData, this.props.allWalletData, this.props.waletIndex)
            this.createOption1(this.bind)
        }
        else {
            alert("Password mismatched")

        }
        this.setState({
            couponPassword: "",
        })
    }


    render() {
        const data = this.props.couponDetail
        const images = this.props.couponDetail.couponImages
        // console.log(images, "copons images")
        console.log(this.state.walletCheck, "walletcheck")


        console.log(this.props.param2, "walletRoute")
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>

                <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "#fff" }} >
                    <Header />
                    <View style={{
                        flex: 1, flexDirection: "column", marginHorizontal: '1%', marginVertical: 6
                    }}>
                        <View style={{ flex: 1 }}>
                            {/* <Image
                            style={{
                                height: 212,
                                width: '100%',
                            }}
                            source={require("../Component/12.jpg")}
                        /> */}

                            <SafeAreaView style={styles.container}>
                                <ImageSlider
                                    // loopBothSides
                                    autoPlayWithInterval={5000}
                                    images={images}
                                    customSlide={({ index, item, style, width }) => (
                                        // It's important to put style here because it's got offset inside
                                        <View key={index} style={[style, styles.customSlide]}>
                                            <Image source={{ uri: item }} style={styles.customImage} />
                                        </View>
                                    )


                                    }

                                    // customButtons={(position, move) => (
                                    //     <View style={styles.buttons}>
                                    //         {images.map((image, index) => {
                                    //             // console.log(index,image,"indexxx")
                                    //             return (
                                    //                 <TouchableHighlight
                                    //                     key={index}
                                    //                     underlayColor="#ccc"
                                    //                     onPress={() => move(index)}
                                    //                     style={styles.button}
                                    //                 >
                                    //                     <Text style={position === index && styles.buttonSelected}>
                                    //                         {index + 1}
                                    //                     </Text>
                                    //                 </TouchableHighlight>
                                    //             );
                                    //         })}
                                    //     </View>
                                    // )}
                                />

                            </SafeAreaView>

                        </View>


                        <View style={{
                            flexDirection: "row", flex: 1,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <View style={{ flex: 3, justifyContent: "space-between", }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 5, color: '#000',fontWeight: 'bold'  }}> {data.merchantsName} </Text>
                                    <Text style={{ marginLeft: 5, color: '#000', }}> {data.merchantsAddress} </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: '3%', marginLeft: '2%' }}>
                                    <Image
                                        style={{
                                            height: 20,
                                            width: 20,
                                            marginLeft: 5,
                                            // backgroundColor: '#fd902a'
                                        }}
                                        source={require('../Images/copoicon.png')}
                                    />
                                    <Text style={{ marginLeft: 5, color: '#ad8950' }}> {data.noOfSold} || </Text>
                                    {/* <Text style={{ marginLeft: 5, color: '#ad8950' }}> {data.merchantsAddress} </Text> */}
                                </View>

                            </View>







                            {
                                (this.props.param2) ? (





                                    <View style={{
                                        flex: 1, height: 80, flexDirection: 'row', top: -41,
                                        alignItems: 'center', justifyContent: 'space-around', position: 'relative',
                                    }}>
                                        <TouchableOpacity style={{
                                            height: 60, width: 60, borderColor: '#fce5c8', borderWidth: 1, borderRadius: 5,
                                            justifyContent: 'center', alignItems: 'center', backgroundColor: '#fd902a'
                                        }}
                                        // onPress={() => { Actions.AddCouponForm({ formDetails: data }) }}
                                        >
                                            {(this.state.walletCheck === false) ?
                                                (
                                                    <Icon name='heart' size={35} color="#fff" />

                                                ) : (
                                                    // <Icon name='heart' size={35} color="#ff0000" />
                                                    <Icon name='heart' size={35} color="#fff" />


                                                )}

                                        </TouchableOpacity>
                                    </View>
                                    // null

                                ) :
                                    (

                                        <View style={{ flex: 1, height: 80,marginTop: '8%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                            <TouchableOpacity style={{
                                                height: 32, width: 32, borderColor: '#fce5c8', borderWidth: 1, borderRadius: 25,
                                                justifyContent: 'center', alignItems: 'center', backgroundColor: '#fd902a'
                                            }} onPress={() => { Actions.AddCouponForm({ formDetails: data }) }}>
                                                <Icon name='edit' size={16} color="#fff" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                height: 32, width: 32, borderColor: '#fce5c8', borderWidth: 1, borderRadius: 25,
                                                justifyContent: 'center', alignItems: 'center', backgroundColor: '#fd902a'
                                            }} onPress={() => {
                                                firebase.database().ref().child("Coupons/" + data.id).remove()
                                                Actions.AdminHome()
                                            }}
                                            >
                                                <DIcon name='delete-outline' size={16} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    )
                            }

                        </View>

                        <View style={{
                            height: 60, flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: '#e6d4b8',
                            borderBottomWidth: 1.5, marginHorizontal: '2%'
                            , borderTopColor: '#e6d4b8', borderTopWidth: 1.5, alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{

                                height: 40, width: '20%',
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                                <LIcon name='location-pin' size={20} color="#cccccc" />
                                <Text style={{ textAlign: 'center', color: '#ad8950' }} > Location </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 40, width: '20%',
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                                <Icon name='star' size={20} color="#cccccc" />
                                <Text style={{ textAlign: 'center', color: '#ad8950' }} > Review </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 40, width: '20%', flexDirection: 'column',
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                                <Icon name='share-alt' size={20} color="#cccccc" />
                                <Text style={{ textAlign: 'center', color: '#ad8950' }} > Share </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: '2%', marginTop: 6, flexDirection: 'column' }}>
                            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }} > Detail Voucher  </Text>
                            <Text style={{ color: '#000', fontSize: 14 }} > {data.couponsDetail}  </Text>
                        </View>

                    </View>



                </ScrollView >
                {
                    (this.props.param2 === "user") ? (
                        <View style={styles.Footer}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"

                                }}
                                onPress={this.openModel.bind(this)}
                            // onPress={this.createOption.bind(this)}

                            >
                                <DIcon name="scissors-cutting"
                                    size={20}
                                    style={{ color: 'white', }} />
                                <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                                    Use Coupon
                                 </Text>
                            </TouchableOpacity>

                            {
                                (this.state.walletCheck === false) ? (
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center"

                                        }}
                                        onPress={this.saveWallet.bind(this)}

                                    >
                                        <LIcon name="wallet"
                                            size={20}
                                            style={{ color: 'white', }} />
                                        <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                                            Save in the wallet
                                     </Text>
                                    </TouchableOpacity>



                                ) : (
                                        <TouchableOpacity
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center"

                                            }}

                                            onPress={() =>
                                                alert("you have already saved this coupon")
                                            }
                                            // onPress={}

                                        >
                                            <LIcon name="wallet"
                                                size={20}
                                                style={{ color: 'white', }} />
                                            <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                                                Saved
                                     </Text>
                                        </TouchableOpacity>
                                    )
                            }




                        </View>
                    ) : null
                }



                {
                    (this.props.param2 === "wallet") ? (
                        <View style={styles.Footer}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"

                                }}
                                onPress={this.openModel1.bind(this)}
                            // onPress={this.createOption.bind(this)}


                            // onPress={() => this.props.navigation.push("CreateJobs")}
                            >
                                <DIcon name="scissors-cutting"
                                    size={20}
                                    style={{ color: 'white', }} />
                                <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                                    Use Coupon
                                 </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"

                                }}
                                onPress={this.removeWallet.bind(this)}

                            >
                                <LIcon name="wallet"
                                    size={20}
                                    style={{ color: 'white', }} />
                                <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                                    Remove from Wallet
                                 </Text>
                            </TouchableOpacity>


                        </View>
                    ) : null
                }


                <Modal isVisible={this.state.isModalVisible}
                    backdropColor="black"
                    backdropOpacity={0.83}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View
                            style={{ width: "80%" }}
                        >

                            <Item style={{ borderBottomWidth: 0.5, borderColor: '#fd902a', }}>
                                <Input
                                    placeholder="Cuopon Password"
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="white"
                                    style={{
                                        //  marginLeft: "10%" ,


                                        fontSize: 15, color: "white",
                                    }}
                                    onChangeText={(e) => { this.setState({ couponPassword: e }) }}
                                    value={this.state.couponPassword}

                                />
                            </Item>

                            <Button
                                // style={styles.button}
                                style={{
                                    // color="#841584",
                                    backgroundColor: '#fd902a',
                                    width: "100%",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    marginTop: "3%"

                                }}
                                onPress={this.useCoupons.bind(this)}
                            >
                                <Text
                                    style={{ color: "white" }}
                                >Use Coupon</Text>
                            </Button>


                            <TouchableOpacity
                                onPress={this._toggleModal}
                            >
                                <Text style={{ textAlign: "center", color: "#fd902a", marginTop: "12%", textDecorationLine: "underline" }}>Go back</Text>
                            </TouchableOpacity>





                        </View>
                    </View>
                </Modal>




                <Modal isVisible={this.state.isModalVisible1}
                    backdropColor="black"
                    backdropOpacity={0.83}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View
                            style={{ width: "80%" }}
                        >

                            <Item style={{ borderBottomWidth: 0.5, borderColor: '#fd902a', }}>
                                <Input
                                    placeholder="Cuopon Password"
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="white"
                                    style={{
                                        //  marginLeft: "10%" ,


                                        fontSize: 15, color: "white",
                                    }}
                                    onChangeText={(e) => { this.setState({ couponPassword: e }) }}
                                    value={this.state.couponPassword}

                                />
                            </Item>

                            <Button
                                // style={styles.button}
                                style={{
                                    // color="#841584",
                                    backgroundColor: '#fd902a',
                                    width: "100%",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    marginTop: "3%"

                                }}
                                onPress={this.useCouponsInWallet.bind(this)}
                            >
                                <Text
                                    style={{ color: "white" }}
                                >Use Coupon</Text>
                            </Button>


                            <TouchableOpacity
                                onPress={this._toggleModal1}
                            >
                                <Text style={{ textAlign: "center", color: "#fd902a", marginTop: "12%", textDecorationLine: "underline" }}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

function mapStateToProp(state) {
    return ({
        allWalletData: state.root.walletData,
        usedCouponsData: state.root.usedCoupons,
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        saveWallet: (saveData, ) => {
            dispatch(saveWallet(saveData));
        },
        removeWallet: (data, allWaletData, waletIndex) => {
            dispatch(removeWallet(data, allWaletData, waletIndex));
        },
        useWallet: (data, ) => {
            dispatch(useWallet(data));
        },
        useWalletInWallet: (data, allWaletData, waletIndex) => {
            dispatch(useWalletInWallet(data, allWaletData, waletIndex));
        },
    })
}
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     // backgroundColor: '#F5FCFF',
    //     marginHorizontal: 4,
    //     marginVertical: 5,

    // },
    Footer: { position: "absolute", bottom: 0, width: "100%", height: 52, backgroundColor: "#fd902a", flexDirection: 'row', },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    slider: { backgroundColor: '#000', height: 550 },
    content1: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content2: {
        width: '100%',
        height: 100,
        marginTop: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: { color: '#fff' },
    buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        opacity: 1,
        color: 'red',
    },
    customSlide: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: "100%",
        height: 172,
    },



});

export default connect(mapStateToProp, mapDispatchToProp)(CouponDetail)