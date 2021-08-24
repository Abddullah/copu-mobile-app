import ActionTypes from '../Constant/constant';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDwpj5N3kXiu7e7KgZ0HNb49Nt0mO7_UXU",
    authDomain: "copos-81684.firebaseapp.com",
    databaseURL: "https://copos-81684.firebaseio.com",
    projectId: "copos-81684",
    storageBucket: "copos-81684.appspot.com",
    messagingSenderId: "811948429560"
};
firebase.initializeApp(config);

export const action = {
    hideLoader: () => ({
        type: ActionTypes.HIDELOADER,
    }),
    loggedIn: () => ({
        type: ActionTypes.ISLOGGEDIN,
    }),
    showLoader: () => ({
        type: ActionTypes.SHOWLOADER,
    }),
    errorMsg: (paylaod) => ({
        type: ActionTypes.SHOWERROR,
        paylaod
    }),
    noError: (paylaod) => ({
        type: ActionTypes.SHOWERROR,
        paylaod: ''
    }),
}

export function startLoader() {
    return dispatch => {
        dispatch(action.showLoader());
    }
}
export function loggedIn() {
    return dispatch => {
        dispatch(action.loggedIn());
    }
}
export function hideLoader() {
    return dispatch => {
        dispatch(action.hideLoader());
    }
}
export function noError() {
    return dispatch => {
        dispatch(action.noError());
    }
}
export function showError(paylaod) {
    console.log(paylaod, 'payload')
    return dispatch => {
        dispatch(action.errorMsg(paylaod));
    }
}
export function signUpAction(data) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        if (data.password1 === data.password2) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password1)
                .then((user) => {
                    // dispatch(allCoupons());
                    // console.log(user)
                    let userData = {
                        uid: user.uid,
                        userEmail: data.email,
                        userName: data.userName,
                        fullName: data.fullName,
                        date: Date.now()
                    }
                    // console.log('dataTosave', userData);
                    firebase.database().ref('users/' + user.uid + '/').set(userData)
                    Actions.signIn()
                    dispatch({ type: ActionTypes.LOADER })


                })
                .catch((error) => {
                    var errorMessage = error.message;
                    // alert(errorMessage)
                    console.log(errorMessage, "save authentication");
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })



        } else {
            var errorMessage = "Please check password";
            // alert(errorMessage)
            dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)
        }



    }
}
export function signinAction(users) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().signInWithEmailAndPassword(users.email, users.password)
            .then((signedinUser) => {

                if (signedinUser.uid === 'LB2xoa0PGee9wqEgr52Sei7vnM03') {
                    Actions.AdminHome()
                }
                else {
                    firebase.database().ref('/users/' + signedinUser.uid).once('value')
                        .then((userData) => {

                            console.log(userData.val(), "user in signin func")
                            dispatch({ type: ActionTypes.CURRENTUSER, payload: userData.val() })
                            dispatch(allCoupons())
                            Actions.Home()

                        })
                }
                dispatch({ type: ActionTypes.LOADER })

            })
            .catch((error) => {
                var errorMessage = error.message;
                // alert(errorMessage)
                console.log(errorMessage, "save authentication");
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })




    }
}
export function userData(uid) {
    return dispatch => {
        console.log(uid)
        firebase.database().ref('/users/' + uid).once('value')
            .then((userData) => {
                console.log(userData.val(), "user in signin func")
                dispatch({ type: ActionTypes.CURRENTUSER, payload: userData.val() })
            })
    }
}
export function allCoupons() {
    let allCouponsArray = []
    let walletDataArray = []
    let useCouponsArray = []
    return dispatch => {
        let userId = firebase.auth().currentUser.uid;
        console.log(userId)

        firebase.database().ref('/Coupons/').on('child_added',
            (data) => {
                // console.log('')
                let newCooupons = data.val();
                // console.log(newC p6ooupons)
                newCooupons.id = data.key;
                allCouponsArray = allCouponsArray.concat(newCooupons)
                dispatch({ type: ActionTypes.COUPONS, payload: allCouponsArray })
            })


        firebase.database().ref('/saveToWallet/' + userId).on('child_added',
            (data) => {
                let walletData = data.val();
                console.log(walletData, "wallet")
                walletData.id = data.key;
                walletDataArray = walletDataArray.concat(walletData)
                dispatch({ type: ActionTypes.WALLET, payload: walletDataArray })
            })


        firebase.database().ref('/useCoupons/' + userId).on('child_added',
            (data) => {
                let useCoupons = data.val();
                console.log(useCoupons, "useCoupons")
                useCoupons.id = data.key;
                useCouponsArray = useCouponsArray.concat(useCoupons)
                dispatch({ type: ActionTypes.USEDCOUPONS, payload: useCouponsArray })
            })

    }
}
export function saveWallet(walletData) {
    return dispatch => {
        let userId = firebase.auth().currentUser.uid;
        // walletData.used = false
        // console.log(walletData, userId, "dataSave")
        firebase.database().ref().child("saveToWallet/" + userId + "/" + walletData.id).update(walletData)
            .then(() => {
                alert("Saved")
                Actions.Home()

            })
    }
}


export function useWallet(walletData) {
    return dispatch => {
        let userId = firebase.auth().currentUser.uid;
        walletData.used = true
        walletData.noCoupons--
        walletData.noOfSold++
        // console.log(walletData.noCoupons)

        firebase.database().ref().child("useCoupons/" + userId + "/" + walletData.id).update(walletData)
            .then(() => {

                firebase.database().ref('/Coupons/' + walletData.id).once('value',
                    (data) => {
                        let couponData = data.val();
                        console.log(couponData, "saveCoupons")
                        couponData.noCoupons--
                        couponData.noOfSold++
                        firebase.database().ref().child('/Coupons/' + walletData.id).update(couponData)
                    })




                firebase.database().ref("/saveToWallet/" + userId + "/" + walletData.id).once('value',
                    (data) => {
                        let couponData1 = data.val();
                        console.log(couponData1, "savewallet")

                        if (couponData1 !== null) {

                            couponData1.noCoupons--
                            couponData1.noOfSold++
                            firebase.database().ref().child("/saveToWallet/" + userId + "/" + walletData.id).update(couponData1)
                        }




                    })

                alert("congratulations coupon activated")
                Actions.Home()

            })





    }
}

export function useWalletInWallet(walletData, allWaletData, waletIndex) {
    console.log(walletData, allWaletData, waletIndex, 'all wallet data ')
    return dispatch => {
        let userId = firebase.auth().currentUser.uid;
        walletData.used = true
        walletData.noCoupons--
        walletData.noOfSold++
        // console.log(walletData.noCoupons)
        firebase.database().ref().child("useCoupons/" + userId + "/" + walletData.id).update(walletData)
            .then(() => {

                firebase.database().ref('/Coupons/' + walletData.id).once('value',
                    (data) => {
                        let couponData = data.val();
                        console.log(couponData, "saveCoupons")
                        couponData.noCoupons--
                        couponData.noOfSold++
                        firebase.database().ref().child('/Coupons/' + walletData.id).update(couponData)
                        alert("congratulations coupon activated")
                        dispatch(removeWallet(walletData, allWaletData, waletIndex))
                    })

                // firebase.database().ref("/saveToWallet/" + userId + "/" + walletData.id).once('value',
                //     (data) => {
                //         let couponData1 = data.val();
                //         console.log(couponData1, "savewallet")
                //         couponData1.noCoupons--
                //         couponData1.noOfSold++
                //         firebase.database().ref().child("/saveToWallet/" + userId + "/" + walletData.id).update(couponData1)
                //     })

            })
    }
}


export function removeWallet(walletData, allWaletData, waletIndex) {
    return dispatch => {
        console.log(walletData, "remove Func working", allWaletData)
        let userId = firebase.auth().currentUser.uid;
        allWaletData.splice(waletIndex, 1);
        firebase.database().ref().child("saveToWallet/" + userId + "/" + walletData.id).remove()
            .then(() => {
                // alert("Remove From wallet")
                // dispatch(allCoupons())
                dispatch({ type: ActionTypes.WALLET, payload: allWaletData })
                Actions.Home()
            })

    }
}
export function logOut() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            Actions.signIn()
        }, function (error) {
            // An error happened.
            console.log('log out nahen hua', error.message)
        });

    }
}


export function forgotPassword(user) {
    return dispatch => {


        console.log(user, "userrrrrrrr")
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().sendPasswordResetEmail(user.email)
            .then(function (user) {
                dispatch({ type: ActionTypes.LOADER })
                alert("Please check your Email  ")
                Actions.signIn()
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.SHOWERROR, payload: error.message })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
                var errorMessage = error.message;
                console.log(errorMessage)
            });

    }
}
