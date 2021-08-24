import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Header from './header'
import firebase from 'firebase'
import { DeckSwiper, Card, CardItem, Body, Thumbnail, Left, Footer, FooterTab, Button } from 'native-base';
import { Container, Content, } from "native-base";

import { StyleSheet, View, Image, Linking, StatusBar, TouchableHighlight, ActivityIndicator, Platform, Text, AppRegistry, Alert, TextInput, ScrollView, Dimensions, TouchableOpacity, } from 'react-native';
import { allCoupons } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'


class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.props.allCoupons()
    }

    render() {
        return (


            <View style={{ backgroundColor: "#fff", flex: 1 }}>
                <ScrollView
                // stickyHeaderIndices={[0]}
                >
                    <Header />

                    <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                        <Text style={{ color: "black", marginBottom: "3%", fontSize: 20 }}>Frequently Asked Question</Text>
                        <Text style={{ marginBottom: "1%", fontSize: 20 , fontWeight:"bold"}}>1.Apa itu Cupo? </Text>
                        <Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>Cupo adalah sebuah aplikasi yang menawarkan promo-promo makanan yang ditawarkan oleh Usaha Kecil dan Menengah. Konsep yang digunakan oleh Cupo ialah bermitra dengan para penyedia layanan yang diharapkan dapat meningkatkan brand awareness UKM tersebut. Terdapat 2 tipe pelanggan yang terlibat dalam aplikasi ini, yaitu pengguna atau pemakai kupon dan UKM atau pemasok kupon. 

                        </Text>


                        <Text style={{ marginBottom: "1%", fontSize: 20, fontWeight:"bold" }}>2.Bagaimana cara mengambil kupon di Cupo?</Text>
                        <Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>a.	Pilih promo yang ingin kamu gunakan  </Text>
                        <Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>b.	Setelah masuk ke halaman promo, maka tekan “Save to Wallet”   </Text>
                        <Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>c.	Kupon sudah dapat kamu gunakan sebelum masa kadaluwarsa habis</Text>



                        <Text style={{ marginBottom: "1%", fontSize: 20, fontWeight:"bold" }}>3.Di mana aku bisa menemukan kupon yang sudah diambil?</Text>

                        <Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>Kamu bisa menemukan kuponmu yang sudah diambil di bagian “Wallet” </Text>

                        <Text style={{ marginBottom: "1%", fontSize: 20, fontWeight:"bold" }}>4.Di mana aku bisa memakai kupon?</Text>


                        <Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>Di tempat makan dengan spesifik alamat yang sama di tempat kamu mengambil kupon 
</Text>

                        <Text style={{ marginBottom: "1%", fontSize: 20 , fontWeight:"bold"}}>5.Bagaimana cara aku menambahkan bisnisku di Cupo?
</Text>


                        <Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>Kamu bisa menghubungi kami via Whatsapp di 082-11111-CUPO (2876)
</Text>


          <Text style={{ marginBottom: "1%", fontSize: 20, fontWeight:"bold"}}>6.Bagaimana cara menggunakan kupon yang sudah diambil?

</Text>
<Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>a.	Kamu datang ke tempat makan di mana kamu mengambil kupon
 </Text>
<Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>b.	Pesan dan nikmati hidangan sesuai kupon yang diambil

 </Text>
<Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>
c.	Lakukan pembayaran ke kasir dengan menunjukkan halaman kupon yang digunakan
</Text>
<Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>
d.	Kasir akan memasukkan kode tertentu sebagai tanda bahwa kupon sudah digunakan
 </Text>
<Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>e.	Kamu sudah melakukan proses penggunaan kupon

 </Text>



          <Text style={{ marginBottom: "1%", fontSize: 20 , fontWeight:"bold"}}>7.Bagaimana cara membatalkan pengambilan kupon?</Text>

<Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>a.  Tekan “Wallet”

</Text>

<Text style={{ marginBottom: "1%", marginLeft: "6.5%", fontSize: 20 }}>b.  Pilih kupon yang ingin kamu batalkan pengambilannya

</Text>

<Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>c.	Tekan “Remove from Wallet”

</Text>


          <Text style={{ marginBottom: "1%", fontSize: 20, fontWeight:"bold" }}>8.Bagaimana jika kuponnya sudah kadaluwarsa?
</Text>
<Text style={{ marginBottom: "3%", marginLeft: "6.5%", fontSize: 20 }}>Kamu tidak dapat menggunakan kupon itu lagi dan akan secara otomatis terhapus  

</Text>


                        {/* <Text style={{ marginBottom: "1%", fontSize: 16 }}
                            onPress={() => Linking.openURL("https://cms.skygear.io/?utm_source=makeappicon&utm_medium=email&utm_campaign=mai_email2&utm_campaign=website&utm_source=sendgrid.com&utm_medium=email")}>
                            We are also building more developer tools. Need a admin dashboard for your app database? Check out this
                            Admin Interface
                            for your PostgreSQL Databases. </Text>
                        <Text style={{ marginBottom: "1%", fontSize: 16 }}> </Text>
                        <Text style={{ marginBottom: "1%", fontSize: 16 }}
                            onPress={() => Linking.openURL("https://twitter.com/chpapa?utm_campaign=website&utm_source=sendgrid.com&utm_medium=email")}

                        >- Ben Cheng @chpapa</Text>
                        <Text style={{ marginBottom: "1%", fontSize: 16 }}
                            onPress={() => Linking.openURL("https://skygear.io/?utm_campaign=website&utm_source=sendgrid.com&utm_medium=email")}

                            >Brought to you by Skygear</Text> */}

                    </View>




                </ScrollView>






            </View>

        )
    }
}


function mapStateToProp(state) {
    return ({
        userDetails: state.root.currentUser,
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
    },
    Footer: { position: "absolute", bottom: 0, width: "100%", height: 60, backgroundColor: "orange", flexDirection: 'row', },
    profile: { backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 0.5, width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
});

export default connect(mapStateToProp, mapDispatchToProp)(Help)
