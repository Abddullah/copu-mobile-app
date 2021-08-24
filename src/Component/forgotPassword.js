import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,

} from "react-native";
import { connect } from "react-redux";
import Inbox from '../Common/Inbox'
import Button from '../Common/Button'
import { forgotPassword } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import Loading from './Loader';
import ErrorMessage from './errorMessage';



class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: "admin@gmail.com",
            // email: "test@gmail.com",
            // password: "123456"
        };
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, height: "100%" }}>
                <ImageBackground source={require('../Images/Photo.png')}
                    style={styles.imageStye}>
                    <Image
                        style={{
                            height: '40%',
                            width: '70%',
                        }}
                        source={require('../Images/Logo.png')}
                    />
                </ImageBackground >
                <View style={styles.bottomDiv}>
                    <View style={styles.inputDiv}>
                        <Inbox placeholder='Email'
                            value={this.state.email}
                            onChange={(text) => { this.setState({ email: text }) }}
                            iconName='user' />
                    </View>
                    {/* <View style={styles.inputDiv}>
                        <Inbox placeholder='Password'
                            value={this.state.password}
                            onChange={(text) => { this.setState({ password: text }) }}
                            iconName='lock' secure={true} />
                    </View> */}

                    {
                        (this.props.isLoader === true) ?
                            (
                                <Loading />
                            ) :
                            (
                                <View style={styles.inputDiv}>
                                    <Button btnText='Send Email'
                                        onBtnPress={() => {
                                            this.props.forgotPassword(this.state)
                                            // this.setState({
                                            //     email: '',
                                            //     password: ''
                                            // })
                                        }}
                                    />
                                </View>
                            )
                    }

                    {
                        (this.props.isError === true) ? (
                            <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                        ) : null
                    }








                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >


                        <TouchableOpacity
                            onPress={() =>
                                Actions.signIn()
                            }
                        >
                            <Text style={{
                                color: 'white', fontWeight: 'bold', marginTop: 10
                            }}>back to login page</Text>
                        </TouchableOpacity>

                     




                        <Image
                            style={{
                                height: 165,
                                width: '100%',
                            }}
                            source={require('../Images/Graphic.png')}
                        />
                    </View>

                </View>
            </ScrollView>
        );
    }
}
let mapStateToProps = state => {
    return {
        // isLogin: state.AuthReducer.isLogin
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        forgotPassword: (data) => {
            dispatch(forgotPassword(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    inputContainer: {
        borderBottomColor: "#F5FCFF",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: "#FFFFFF",
        flex: 1
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: "center"
    },
    buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 250,
        borderRadius: 30
    },
    loginButton: {
        backgroundColor: "#5F4B8B"
    },
    loginText: {
        color: "white"
    },
    imageStye: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        backgroundColor: '#00758b',
    },
    inputDiv: {
        margin: 3,
        marginRight: 34,
        marginLeft: 34,
    },
    bottomDiv: {
        paddingTop: 24,
        backgroundColor: '#fd902a'
    },
});