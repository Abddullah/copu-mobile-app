import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './header'
import RNFetchBlob from 'react-native-fetch-blob'
import Inbox from '../Common/Inbox'
import CButton from '../Common/Button'
import MultiImage from 'react-native-multi-image-selector'
import firebase from 'firebase'
import {
  Container, Drawer, Left,
  // DatePicker,
  Item,
  Picker, Body, Textarea, Form, ListItem,
  CheckBox,
  Item as FormItem,
  Button
} from 'native-base';
import { StyleSheet, View, Image, StatusBar, TouchableHighlight, ActivityIndicator, Platform, Text, AppRegistry, Alert, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;
import DatePicker from 'react-native-datepicker'
import SelectMultiple from 'react-native-select-multiple'




class AddCouponForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: 'Category',
      promotionsName: "",
      merchantsName: "",
      address: "",
      recommendedFlag: false,
      chosenDate: "",
      couponsDetail: "",
      couponPassword: "",
      useCouponAndunused: "unused",
      noOfSold: 0,
      formErr: '',
      recomendedCheckBox: [],

      images: ['1', '2', '3'],

      imgUrl: [],
      imageArrFrmMulti: [],

      uploadFlag: false

    }
    // this.saveCoupons = this.saveCoupons.bind(this)
  }

  // setDate(newDate) {
  //   this.setState({ chosenDate: newDate });
  // }
  componentDidMount() {
    // console.log(this.props.formDetails, 'asddsadasdasdasd')
    if (this.props.formDetails !== undefined) {
      this.setState({
        selected1: this.props.formDetails.category,
        promotionsName: this.props.formDetails.promotionsName,
        merchantsName: this.props.formDetails.merchantsName,
        address: this.props.formDetails.merchantsAddress,
        recommendedFlag: this.props.formDetails.recommended,
        chosenDate: this.props.formDetails.chosenDate,
        couponsDetail: this.props.formDetails.couponsDetail,
        imageArrFrmMulti: this.props.formDetails.couponImages,
        imgUrl: this.props.formDetails.couponImages,
        noCoupons: this.props.formDetails.noCoupons,
        noOfSold: this.props.formDetails.noOfSold,
        couponPassword: this.props.formDetails.couponPassword
      }, () => { console.log(this.state) })
    }
  }
  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  onSelectionsChange = (recomendedCheckBox) => {
    // selectedFruits is array of { label, value }
    this.setState({
      recomendedCheckBox,
      recommendedFlag: !this.state.recommendedFlag

    })


    console.log(this.state.recommendedFlag, "RECOMMENDEDFLAFG")
  }


  uploadImage(images) {
    console.log(images, "inupload image function")

    this.setState({
      uploadImageErroe: "value"
    });

    if (images === undefined) {
      console.log("notupload")
      alert("please upload picture")
    }
    else {
      return new Promise((resolve, reject) => {
        images.forEach((image, i) => {
          const Blob = RNFetchBlob.polyfill.Blob;
          const fs = RNFetchBlob.fs;
          const originalXMLHttpRequest = window.XMLHttpRequest;
          window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
          window.Blob = Blob;
          let uploadBlob = null;
          let mime = 'image/jpg';
          const imageRef = firebase.storage().ref(`photos/`).child(image)
          fs.readFile(image, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
              uploadBlob = blob;
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
              uploadBlob.close();
              window.XMLHttpRequest = originalXMLHttpRequest;
              return imageRef.getDownloadURL()
            })
            .then(downloadUrl => {
              console.log(downloadUrl, "URLlllllllllllllllllllll")
              let allImg = this.state.imgUrl
              allImg.push(downloadUrl)

              this.setState({
                uploadFlag: true,
                uploadImageErroe: ""

              })

              // console.log(allImg, "Alllllllllllllllllllll")
            })
            .catch((error) => {
              console.log(error)
              reject('Not uploaded')
            });
        })
      })
    }
  }

  saveCoupons() {
    console.log(this.state.imageArrFrmMulti)
    console.log(this.state.imgUrl, "imgUrl")

    if (this.state.imgUrl.length != 0) {
      const CouponForm = {
        promotionsName: this.state.promotionsName,
        merchantsName: this.state.merchantsName,
        noCoupons: this.state.noCoupons,
        merchantsAddress: this.state.address,
        recommended: this.state.recommendedFlag,
        couponImages: this.state.imgUrl,
        category: this.state.selected1,
        couponsDetail: this.state.couponsDetail,
        chosenDate: this.state.chosenDate,
        noOfSold: this.state.noOfSold,
        couponPassword: this.state.couponPassword,
        used: false
      }
      if (this.state.promotionsName === "" || this.state.merchantsName === "" || this.state.noCoupons === "" || this.state.address === "" || this.state.selected1 === "" ||
        this.state.data === "" || this.state.couponsDetail === "" || this.state.couponPassword === "") {
        alert("Please fill all fields")
      }
      else {

        if (this.props.formDetails !== undefined) {
          firebase.database().ref().child("Coupons/" + this.props.formDetails.id).set(CouponForm)
          Actions.AdminHome()
        }
        // else if (this.state.selected1 === '' || this.state.promotionsName === '' || this.state.merchantsName === '' ||
        //   this.state.address === '' || this.state.chosenDate === '' || this.state.couponsDetail === '' ||
        //   this.state.imgUrl.length === 0) {
        //   this.setState({ formErr: 'Please fill all fields' })
        // }
        else {

          firebase.database().ref().child("Coupons").push(CouponForm)
            .then((val) => {
              console.log(val, '*******************///////////////////////')

            })
            .catch((err) => {
              console.log(err, '*******************///////////////////////')
            }
            )

          Actions.AdminHome()
        }
      }






    }


    else {
      alert("Please upload at least 1 picture")
    }






  }


  render() {
    console.log(this.state.imgUrl, "imgUrl")
    console.log(this.state.imageArrFrmMulti, "imageArrFrmMulti")
    recomendedCheckBox = ["Recommended"]


    return (
      <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "#fff" }} >
        <Header />
        <View >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={{
              justifyContent: "center", alignItems: "center",
              height: 50, width: "80%",
              backgroundColor: "#ffad48",
              borderWidth: 0.75,
              borderColor: '#ffad48'
              ,
              // borderRadius: 12,
              marginTop: 12,
            }} onPress={() => {
              MultiImage.pickImage({
                // showCamera: true,
                maxNum: 5,
                multiple: true
              }).then((imageArray) => {
                this.setState({
                  imageArrFrmMulti: imageArray,
                  uploadFlag: false,
                  imgUrl: []
                })
                this.uploadImage(imageArray)

                // if (this.props.formDetails !== undefined) {
                //   this.setState({ imageArrFrmMulti: imageArray,})

                // } else {
                //   this.setState({ imageArrFrmMulti: imageArray })
                // }

              }).catch(e => {
              });
            }}>
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}> Add Image </Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {
              this.state.imageArrFrmMulti.length !== 0 ?
                <View style={{
                  flex: 1, flexDirection: "row", justifyContent: "center",
                  marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap"
                }}>
                  {
                    this.state.imageArrFrmMulti.map((data) => {
                      return (
                        <Image
                          style={{
                            height: 80,
                            width: 80,
                            marginHorizontal: 6,
                            marginTop: 2
                          }}
                          source={{ uri: data }}
                        />
                      )
                    })
                  }
                </View>
                : <View style={{
                  flex: 1, flexDirection: "row", justifyContent: "center",
                  marginHorizontal: "10%", marginVertical: 5,
                }}>
                  {
                    this.state.images.map((data) => {
                      return (
                        <Image
                          style={{
                            height: 80,
                            width: 80,
                            marginHorizontal: 6
                          }}
                          source={require("../Images/default.png")}
                        />
                      )
                    })
                  }
                </View>
            }



            {
              (this.state.uploadImageErroe) ? (
                <Text style={{ color: "red" }}>
                  Please wait Uploading image....
            </Text>

              ) : null
            }



          </View>
          <View style={{ marginHorizontal: "5%", marginTop: 5, width: "90%" }}>
            <Inbox
              value={this.state.promotionsName}
              placeholder='Promotions name' placeholderColor='#cfcac3'
              onChange={(text) => {
                this.setState({ promotionsName: text })
              }}
            />
          </View>
          <View style={{ marginHorizontal: "5%", marginTop: 5, width: "90%" }}>
            <Inbox
              value={this.state.merchantsName}
              placeholder='Merchants name' placeholderColor='#cfcac3'
              onChange={(text) => {
                this.setState({ merchantsName: text })
              }}
            />
          </View>
          <View style={{ marginHorizontal: "5%", marginTop: 5, width: "90%" }}>
            <Inbox placeholder='No of coupons'

              value={this.state.noCoupons}
              placeholderColor='#cfcac3'
              keyboardType={'numeric'}

              onChange={(text) => {
                this.setState({ noCoupons: text })
              }}
            />
          </View>
          <View style={{ marginHorizontal: "5%", marginTop: 5, width: "90%" }}>
            <Inbox
              value={this.state.address}
              placeholder='Where to use ?' placeholderColor='#cfcac3'
              // multiLine={true} numberOfLines='2'
              onChange={(text) => {
                this.setState({ address: text })
              }}
            />
          </View>
          <View style={{ marginHorizontal: "5%", marginTop: 5, width: "90%" }}>
            <Inbox
              value={this.state.couponPassword}
              placeholder='Coupon Password' placeholderColor='#cfcac3'
              // multiLine={true} numberOfLines='2'
              onChange={(text) => {
                this.setState({ couponPassword: text })
              }}
            />
          </View>

          <View style={{
            // marginHorizontal: "10%", 
            // marginTop: 5,
            borderBottomColor: "#DCE0DE",
            borderBottomWidth: 1,
            // borderRadius: 12
            width: "81%",
            marginLeft: "10%"
            // justifyContent:"center",
            // alignItems:"center"
          }}>
            <Picker
              mode="dropdown"
              style={{ fontSize: 8, marginLeft: "2.5%" }}
              // headerTitleStyle={{ color: "#fce5c8",fontSize:8 ,}}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label='Food and Drink' value='Food and Drink' />
              <Item label='Category' value='Category' />
              <Item label='Another' value='Another' />
            </Picker>
          </View>
          <View style={{
            marginHorizontal: "10%", marginTop: 5,
            borderBottomColor: "#fce5c8",
            bovarderBottomWidth: 1,
            borderRadius: 12
          }}>

            <Item style={{ backgroundColor: '#ffffff', width: '100%', height: 40 }}>
              <DatePicker
                // customStyles={{dateInput:{borderWidth: 0}}}
                style={{
                  width: "100%",
                  borderWidth: 0,

                  // borderBottomColor: "#fce5c8"
                }}

                date={this.state.chosenDate}
                mode="date"
                placeholder="Select Date"
                format='MMMM Do YYYY'
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"

                customStyles={{
                  dateInput: {
                    marginLeft: "-30%",
                    // width: "100%
                    borderWidth: 0,
                    fontSize: 10,
                    // color:"red"
                    // backgroundColor:"red"
                    // borderBottomColor: "red"


                  },
                  placeholderText: {
                    // textAlign: "left",
                    marginLeft: "-17%",
                    // backgroundColor:"red"

                  }

                }}
                onDateChange={(dateAndTimeStart) => { this.setState({ chosenDate: dateAndTimeStart }) }}
              />
            </Item>




          </View>
          <View style={{
            marginHorizontal: "10%", marginTop: 5,
            // borderBottomColor: "#fce5c8", 
            // borderBottomWidth: 1,
            // borderRadius: 12
          }}>
            <Form>
              <Textarea rowSpan={6}
                value={this.state.couponsDetail}
                bordered placeholder="Coupons Detail" placeholderTextColor="grey"
                onChangeText={(text) => { this.setState({ couponsDetail: text }) }} />
            </Form>
          </View>




          <SelectMultiple
            style={{
              width: '80%',
              // width: 270,
              marginLeft: "10%",
              // borderBottomColor,""
              // borderWidth: 0.75,
              // borderBottomWidth: 0,
              // borderColor: '#ffad48'
            }}
            selectedCheckboxSource={this.state.recommendedFlag}
            items={recomendedCheckBox}
            selectedItems={this.state.recomendedCheckBox}
            onSelectionsChange={this.onSelectionsChange} />
          {/* <View style={{
          marginHorizontal: "10%", marginTop: 5, borderBottomColor: "#fce5c8", borderBottomWidth: 1,
          borderRadius: 12
        }}>

          <ListItem>
            <CheckBox checked={this.state.couponsDetail} color="#fee7d3"
              onPress={() => this.setState({ recommended: !this.state.recommended })} />
            <Body>
              <Text style={{ marginLeft: 7 }}>Recommended</Text>
            </Body>
          </ListItem>
        </View>



        {
          (this.state.formErr !== '') ?
            <View style={{
              marginHorizontal: "10%", marginTop: 5, borderBottomColor: "#fce5c8", borderBottomWidth: 1,
              borderRadius: 12
            }}>
              <ListItem>
                <CheckBox checked={this.state.couponsDetail} color="#fee7d3"
                  onPress={() => this.setState({ recommended: !this.state.recommended })} />
                <Body>
                  <Text style={{ marginLeft: 7 }}>Recommended</Text>
                </Body>
              </ListItem>
            </View> : null
        } */}




          {/* <View

            style={{
              marginHorizontal: "10%", marginTop: 5, marginBottom: 15
              // borderBottomColor: "#fce5c8", borderBottomWidth: 1,
              // borderRadius: 12
            }}

          >
            <CButton
              btnText={this.props.formDetails !== undefined ? "Save Changes" : 'Add Coupon'}
              borderColor="#ed8c37"

              // <Button block info style={styles.button} onPress={this.savePRform.bind(this)} >

              onBtnPress={() => {

                this.saveCoupons.bind(this)



              }}

              
            />
          </View> */}


          {
            (this.state.uploadFlag === true) ? (
              <Button warning
                onPress={this.saveCoupons.bind(this)}
                style={{ width: "80%", justifyContent: "center", alignItems: "center", marginLeft: "10%", marginTop: 10, marginBottom: 15 }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.formDetails !== undefined ? "Save Changes" : 'Add Coupon'}</Text>
              </Button>

            ) : null
          }






        </View>




      </ScrollView>

    )
  }
}

// function mapStateToProp(state) {
//   }

// function mapDispatchToProp(dispatch) {
//   return ({

//     // getOrderDetail: (data) => {
//     //   dispatch(orderDetail(data))
//     // },
//   })
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
    marginHorizontal: 4,
    marginVertical: 5,
  },
});

// export default connect(mapStateToProp, mapDispatchToProp)(Home)

export default AddCouponForm