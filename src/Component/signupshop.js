import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signUpAction } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import Inbox from '../Common/Inbox'
import Button from '../Common/Button'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Loading from '../Component/Loader';
import ErrorMessage from '../Component/errorMessage';
class SignUpShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            userName: '',
            email: '',
            password1: '',
            password2: '',
            passwordErr: ''
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fd902a' }}>
                <ImageBackground source={require('../Images/Photo.png')} style={styles.imageStye}>
                    <Image
                        style={{
                            height: '40%',
                            width: '70%',
                        }}
                        source={require('../Images/Logo.png')}
                    />
                </ImageBackground >
                <View style={styles.bottomDiv}>

                    <Inbox placeholder='Full Name'
                        onChange={(text) => { this.setState({ fullName: text }) }}
                        iconName='user' />
                    <Inbox placeholder='User Name'
                        onChange={(text) => { this.setState({ userName: text }) }}
                        iconName='user' />
                    <Inbox placeholder='User Email'
                        onChange={(text) => { this.setState({ email: text }) }}
                        iconName='envelope-o' />
                    <Inbox placeholder='Password'
                        onChange={(text) => { this.setState({ password1: text }) }}
                        iconName='lock' secure={true} />
                    <Inbox placeholder='Confirm Password'
                        onChange={(text) => { this.setState({ password2: text }) }}
                        iconName='lock' secure={true} />
                    {/* {
                        this.state.password2 !== '' ?
                         <View>
                            <Text> {this.state.password2} </Text>
                        </View> : null
                        } */}



                    {
                        (this.props.isLoader === true) ?
                            (
                                <Loading />
                            ) :
                            (
                                <Button btnText='Sign Up'
                                    onBtnPress={() => {
                                        this.props.getUserSignUp(this.state)
                                        this.setState({
                                            email: '',
                                            password: '',
                                            userName: '',
                                            fullName: '',
                                            password2: ''
                                        })
                                    }}
                                />
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
                            }}>Already have an account</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </ScrollView>
        )
    }
}

function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
    })
}
function mapDispatchToProps(dispatch) {
    return ({
        getUserSignUp: (data) => {
            dispatch(signUpAction(data))
        }
    })
}
const styles = StyleSheet.create({
    imageStye: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 212,
        backgroundColor: '#00758b',
    },
    bottomDiv: {
        flex: .5,
        marginRight: 34,
        marginLeft: 34,
        marginTop: 6,
        paddingVertical: 24,
    },
    inputText: {
        fontWeight: 'bold',
        marginBottom: 2,
        marginLeft: 5,
    },
    inputDiv: {
        margin: 3,
        marginRight: 12,
        marginLeft: 12,
        // paddingHorizontal: 8,

    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#2db5ff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        elevation: 4,
    },

    signUpBtn: {
        // marginRight: 21,
        // marginLeft:21,
        // marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 3
    },
    signUpBtnTxt: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold'
    }
})
export default connect(mapStateToProp, mapDispatchToProps)(SignUpShop)