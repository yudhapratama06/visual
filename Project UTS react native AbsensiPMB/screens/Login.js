import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Template from '../tempcol/Template';

const { color, radius } = Template();


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
 
  const handlerLogin = () => {

    navigation.navigate('Beranda');
  };

  return (
    <ScrollView style={styles.allpage}>
      <View style={{
        padding: 24,
        paddingTop: Constants.statusBarHeight,
      }}
      >
        <View style={[styles.logpmb]}>
        <Image
      source ={require ('../assets/img/primakara_login.png')}
      style= {{width:"110%", height:300, marginTop:100}}/>
        </View>

        <View style={{
          marginTop: 20
        }}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            type="text"
            placeholder="Email"
            keyboardType="email-address"
            style={[styles.inputtx, { marginBottom: 8 }]}
          />
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            textContentType="password"
            placeholder="Password"
            style={styles.inputtx}
          />
         
          <TouchableOpacity
            style={styles.buttonlog}
            onPress={handlerLogin}
          >
            <Text style={{ 
              color: color.common.white,
              fontWeight:"bold"
               }}>Login</Text>
          </TouchableOpacity>

          <View style={[
            styles.logpmb, 
            styles.row
            ]}>
      <Text style={{ 
        color: color.text.primary 
        }}>
        Belum memiliki akun ?
      </Text>
      <TouchableOpacity
        style={{ marginLeft: 4}}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={{ 
          color: color.primakara.orange,
          fontWeight:"bold",
          fontSize:15,
          }}>
            Sign up</Text>
      </TouchableOpacity>
    </View>
</View>
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  allpage: {
    flex: 1,
    backgroundColor: color.common.white,
  },
  logpmb: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputtx: {
    borderColor: color.primakara.orange,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'Roboto',
    borderRadius: radius.normal,
  },
  buttonlog: {
    marginTop:20,
    backgroundColor: color.primakara.birutua,
    borderRadius: radius.pills,
    padding: 16,
    alignItems: 'center',
  },
  row: { 
    flexDirection: 'row',
    marginTop:20 },
  });

export default LoginScreen;
