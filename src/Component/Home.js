import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Header from './header'
import firebase from 'firebase'
import { DeckSwiper, Card, CardItem, Body, Thumbnail, Left, Footer, FooterTab, Button } from 'native-base';
import { StyleSheet, View, Image, StatusBar, TouchableHighlight, BackHandler, Platform, Text, AppRegistry, Alert, TextInput, ScrollView, Dimensions, TouchableOpacity, } from 'react-native';
import { allCoupons, userData, logOut } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'
// import Loading from '../Component/Loader';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArrBestSaller: [],
      selectedArrlimited: [],
      selectedArrRecomended: [],
      selectedArrFoodAndDrink: [],
      walletData: [],
      cards: [],
    }
  }
  componentDidMount() {
    this.props.allCoupons()
    this.props.userDetails(firebase.auth().currentUser.uid)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
  }
  static getDerivedStateFromProps(props, state) {
    console.log(props)
    if (props.allCouponss || props.walletData) {
      //////sorted best saller/////////
      let selectedArrBestSaller = []
      selectedArrBestSaller = props.allCouponss.filter((data) => {
        return data.noOfSold > 20
      })
      ////////sorted best recomended///////////
      let selectedArrRecomended = []
      selectedArrRecomended = props.allCouponss.filter((data) => {
        return data.recommended === true
      })
      ////sorted limited///////////
      let selectedArrlimited = []
      selectedArrlimited = props.allCouponss.filter((data) => {
        return data.noCoupons <= 20
      })
      ////////sorted Food and Drink///////////
      let selectedArrFoodAndDrink = []
      selectedArrFoodAndDrink = props.allCouponss.filter((data) => {
        return data.category === "Food and Drink"
      })

      return ({
        selectedArrBestSaller: selectedArrBestSaller,
        selectedArrRecomended: selectedArrRecomended,
        selectedArrlimited: selectedArrlimited,
        selectedArrFoodAndDrink: selectedArrFoodAndDrink,
        cards: props.allCouponss,
        walletData: props.walletData
      })
    }

  }
  render() {
    return (

      (this.state.cards.length === 0) ? (
        <View style={{
          flex: 1,
          backgroundColor: "#fff",
          // backgroundColor: 'rgba(52, 52, 52,alpha)',

          justifyContent: "center",
          alignItems: "center"

        }}>
          <Text style={{ marginBottom: "5%" }}>Loading....</Text>
          <Bubbles size={10} color="#fd902a" />

        </View>
      ) :


        <View style={{
          flex: 1,
          backgroundColor: "#fff"
        }}>

          <View style={{
            height: 60,
            backgroundColor: '#fd902a',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "row"
          }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Icon name='arrow-circle-left' size={30} color="#fff" style={{
                paddingLeft: 15,
              }} onPress={() => { Actions.pop() }} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image source={require('../Images/Logo.png')}
                style={{ height: 40, width: 140, }} />
            </View>

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <IconAntDesign name='logout' size={30} color="#fff" style={{
                paddingRight: 15,
              }} onPress={() => console.log(this.props.logOut())} />
            </View>


          </View>



          <View style={{ flex: 1 }}>
            <DeckSwiper
              dataSource={this.state.cards}
              renderItem={item =>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    Actions.CouponDetail({
                      couponDetail: item,
                      param2: "user",
                    })
                  }}
                >

                  <Card >
                    <CardItem cardBody>
                      <Image style={{ height: 190, width: 100, flex: 1, resizeMode: 'contain' }}
                        source={{ uri: item.couponImages[0] }}
                      />
                    </CardItem>
                    <CardItem>
                      <Text
                        style={{ fontWeight: "bold" }}

                      >{item.merchantsName}</Text>
                      <Text
                        style={{ marginLeft: 8, }}
                      >{item.merchantsAddress}</Text>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              }
            />
          </View>

          <View style={{
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
            justifyContent: 'center'
            // alignContent: "center",
            // marginLeft: "15%",
            // marginTop: "75%",
          }}>
            <TouchableOpacity
              onPress={() =>
                Actions.CouponDataRender({ param1: this.state.selectedArrBestSaller, param2: "user" })
              }
              style={{
                width: "21%",
                height: "28%",
                margin: "3%",
                backgroundColor: "#fd902a",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7
              }}>
              <Icon name="star"
                size={32}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white", fontSize: 10 }}>
                Best Seller
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.CouponDataRender({ param1: this.state.selectedArrRecomended, param2: "user" })
              }
              style={{
                width: "21%",
                height: "28%",
                margin: "3%",
                backgroundColor: "#fd902a",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7
              }}>
              <IconAntDesign name="like2"
                size={32}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white", fontSize: 10 }}>
                Recommended
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.CouponDataRender({ param1: this.state.selectedArrlimited, param2: "user" })
              }
              style={{
                width: "21%",
                height: "28%",
                margin: "3%",
                backgroundColor: "#fd902a",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7
              }}>
              <IconMaterialCommunityIcons name="timetable"
                size={32}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white", fontSize: 10 }}>
                Limited
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.CouponDataRender({ param1: this.state.selectedArrFoodAndDrink, param2: "user" })
              }
              style={{
                width: "21%",
                height: "28%",
                margin: "3%",
                backgroundColor: "#fd902a",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7
              }}>
              <IconMaterialCommunityIcons name="food-fork-drink"
                size={32}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white", fontSize: 10 }}>
                Food and Drink
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "21%",
                height: "28%",
                margin: "3%",
                backgroundColor: "#fd902a",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7
              }}>
              <IconMaterialCommunityIcons name="play-box-outline"
                size={32}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white", fontSize: 10 }}>
                Entertainment
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "21%",
                height: "28%",
                margin: "3%",
                backgroundColor: "#fd902a",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7
              }}>
              <IconAntDesign name="shoppingcart"
                size={23}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white", fontSize: 10 }}>
                Shopping
                </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Footer}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={
                () => Actions.Home()
              }          >
              <Icon name="home"
                size={20}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                // marginLeft: "5%",
                justifyContent: "center",
                alignItems: "center",
                // position: 'relative'

              }}
              onPress={() =>
                Actions.CouponDataRender(
                  { param1: this.state.walletData, param2: "wallet", }
                )
              }
            >
              <IconEntypo name="wallet"
                size={20}
                style={{ color: 'white', marginTop: this.props.walletData.length === 0 ? 0 : 17 }} />

              {
                (this.props.walletData.length === 0) ? (<Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                  Wallet
              </Text>) :
                  <View>
                    <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                      Wallet
              </Text>
                    <Text style={{ color: "#fd902a", top: -41, left: 12 }}>{this.props.walletData.length}</Text>
                  </View>
              }


            </TouchableOpacity>


            <TouchableOpacity
              style={{
                flex: 1,
                // marginLeft: "5%",
                justifyContent: "center",
                alignItems: "center"

              }}
              onPress={
                () => Actions.Help()
              }
            >
              <IconEntypo name="help-with-circle"
                size={20}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                Help
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                // marginLeft: "5%",
                justifyContent: "center",
                alignItems: "center"

              }}
              onPress={
                () => Actions.UserDetails()
              }
            >
              <IconEntypo name="user"
                size={20}
                style={{ color: 'white', }} />
              <Text style={{ textAlign: "center", marginTop: 5, color: "white" }}>
                User
                </Text>
            </TouchableOpacity>
          </View>
        </View>


    )
  }
}


function mapStateToProp(state) {
  return ({
    allCouponss: state.root.allCoupons,
    walletData: state.root.walletData
  })
}

function mapDispatchToProp(dispatch) {
  return ({

    allCoupons: () => {
      dispatch(allCoupons())
    },
    userDetails: (uid) => {
      dispatch(userData(uid))
    },
    logOut: () => {
      dispatch(logOut())
    }

  })
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Footer: { position: "absolute", bottom: 0, width: "100%", height: 52, backgroundColor: "#fd902a", flexDirection: 'row', },
  profile: { backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 0.5, width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
});

export default connect(mapStateToProp, mapDispatchToProp)(Home)
