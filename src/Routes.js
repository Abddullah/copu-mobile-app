import React, { Component } from 'react';
import { Scene, Router, } from 'react-native-router-flux'
import SignUpShop from './Component/signupshop'
import Login from './Component/signinshophelios'
import Home from './Component/Home'
import AdminHome from './Component/adminHome'
import AddCouponForm from './Component/addCouponForm'
import CouponDetail from './Component/CouponDetails'
import Header from './Component/header'
import Splash from './Component/Splashscreen'
import ForgotPassword from './Component/forgotPassword'
import Help from './Component/help'
import CouponsDataRander from './Component/couponsDataRender'
 import UserDetails from './Component/userDetails'
import firebase from 'firebase'


class Route extends Component {
  render() {
    return (
      <Router>
        <Scene>
          <Scene key='Splash' component={Splash} hideNavBar={true}  />
          <Scene key='signIn' component={Login} hideNavBar={true} />
          <Scene key='Home' component={Home} hideNavBar={true} />
          <Scene key='signUp' component={SignUpShop} hideNavBar={true} />
          <Scene key='AddCouponForm' component={AddCouponForm} hideNavBar={true} />
          {/* <Scene key='signIn' component={Login} hideNavBar={true} /> */}
          <Scene key='AdminHome' component={AdminHome} hideNavBar={true} />
          <Scene key='CouponDetail' component={CouponDetail} hideNavBar={true} />
          <Scene key='Header' component={Header} hideNavBar={true} />
          <Scene key='CouponDataRender' component={CouponsDataRander} hideNavBar={true} />
          <Scene key='UserDetails' component={UserDetails} hideNavBar={true} />
          <Scene key='ForgotPassword' component={ForgotPassword} hideNavBar={true} />
          <Scene key='Help' component={Help} hideNavBar={true} />
          {/* <Scene key='ForgotPassword' component={ForgotPassword} hideNavBar={true} /> */}
         {/* <Scene key='Help' component={Help} hideNavBar={true} /> */}
          {/* <Scene key='Loading' component={Loading} hideNavBar={true} /> */}

        </Scene>
      </Router>
    )
  }
}

export default Route