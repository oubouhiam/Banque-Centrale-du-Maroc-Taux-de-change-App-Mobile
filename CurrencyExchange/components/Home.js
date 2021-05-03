import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

import { SafeAreaView, StyleSheet, Text, View, Icon, ImageBackground, Image, Pressable, Picker, TextInput, TextComponent } from 'react-native';
import axios from 'axios';

const image = { uri: "https://img.freepik.com/free-photo/perspective-exterior-nobody-empty-box_1258-260.jpg?size=338&ext=jpg" };

function HomeScreen({navigation}) {
  const [selectedFromValue, setSelectedFromValue] = useState("EUR");
  const [selectedToValue, setSelectedToValue] = useState(String);

  const [selectedCurrency, setSelectedCurrency] = useState([]);

  const [input, setInput] = useState()

  const [currencyVal, setCurrencyVal] = useState(0)

  const getDataUsingSimpleGetCall = async () => {
    let data = {currencyVal: currencyVal}
    let requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json"
      }
    };

    await axios
      .get('http://api.exchangeratesapi.io/v1/latest?access_key=774246bf225880ef504b4963c5fd2903&symbols=USD,MAD,AUD,CAD,PLN,MXN&format=1')
      .then(function (response) {
        setSelectedCurrency(response.data.rates)
        // console.log(selectedToValue)
      })
      .catch(function (error) {
        console.log(error.message);
      })

      if(selectedToValue == "USD")
        setCurrencyVal(selectedCurrency.USD * input)

      if(selectedToValue == "CAD")
        setCurrencyVal(selectedCurrency.CAD * input)

      if(selectedToValue == "AUD")
        setCurrencyVal(selectedCurrency.AUD * input)

      if(selectedToValue == "EUR")
        setCurrencyVal(selectedCurrency.EUR * input)

      if(selectedToValue == "MXN")
        setCurrencyVal(selectedCurrency.MXN * input)

      if(selectedToValue == "PLN")
        setCurrencyVal(selectedCurrency.PLN * input)

      if(selectedToValue == "MAD")
        setCurrencyVal(selectedCurrency.MAD * input)

      console.log(currencyVal)

      await axios.post('https://currencyexchangeb.herokuapp.com/addData', data)
      .then(() => {
        console.log("data is inserted")
      })
      .catch((e) => {
        console.log("data is not inserted" + e)
      })
  };

  return (
    <View style={styles.container1}>
      <ImageBackground source={image} style={styles.image}>
        <SafeAreaView style={styles.container2}>

          <Image source={require("../assets/logo.png")} style={styles.logoBackground} />

          

          <View style={styles.contents2}>

            

            

            <View style={{flexDirection:'row', flexWrap:'wrap', top: 60 }}>

              <Picker
                selectedValue={selectedFromValue}
                style={{color: '#000000', height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) => setSelectedFromValue(itemValue)}
              >
                <Picker.Item label="EUR" value="EUR" />

              </Picker>
              <AntDesign name="retweet" size={30} color="black" />
                
              <Picker
                selectedValue={selectedToValue}
                style={{color: '#000000', height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) => setSelectedToValue(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="MAD" value="MAD" />
                <Picker.Item label="AUD" value="AUD" />
                <Picker.Item label="CAD" value="CAD" />
                <Picker.Item label="MXN" value="MXN" />
                <Picker.Item label="PLN" value="PLN" />
                {/* AUD CAD EUR MXN PLN*/}
              </Picker>
              </View>

              <View style={{flexDirection:'row', flexWrap:'wrap', top: 90}} >
                  <TextInput
                    style={styles.default}
                    onChangeText={(text) => setInput(text)}
                    value={input}
                    keyboardType="numeric"
                  />

                  <View style={styles.contents}>

                    <Pressable onPress={() => { getDataUsingSimpleGetCall() }} style={[styles.contentsText, styles.marginButtom]}>
                      <Text style={[styles.contentsText2]}>Convert</Text>
                    </Pressable>

                  </View>        
              </View>

              {selectedToValue == "USD" && (
                  <Text style={{color: '#000000', textAlign:'center', top: 200}}>USD: {selectedCurrency.USD * input}</Text>
              )}
              {selectedToValue == "MAD" && (
                  <Text style={{color: '#000000', textAlign:'center', top: 200}}>MAD: {selectedCurrency.MAD * input}</Text>
              )}
              {selectedToValue == "CAD" && (
                  <Text style={{color: '#000000', textAlign:'center', top: 200}}>CAD: {selectedCurrency.CAD * input}</Text>
              )}
              {selectedToValue == "AUD" && (
                  <Text style={{color: '#000000', textAlign:'center', top: 200}}>AUD: {selectedCurrency.AUD * input}</Text>
              )}
              {selectedToValue == "EUR" && (
                  <Text style={{color: '#000000', textAlign:'center', top: 200}}>EUR: {selectedCurrency.EUR * input}</Text>
              )}
              {selectedToValue == "MXN" && (
                  <Text style={{color: '#000000', textAlign:'center', top: 200}}>MXN: {selectedCurrency.MXN * input}</Text>
              )}
              {selectedToValue == "PLN" && (
                  <Text style={{color: '#000000', textAlign:'center', top: 200}}>PLN: {selectedCurrency.PLN * input}</Text>
              )}         
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  logoBackground:{  
    width: 200,
    height: 200,
    marginLeft: 140
  },

  container1: {
    flex: 1,
  },
  container2: {
    flex: 1,
    
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    zIndex: 2
  },
  contents: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  contents2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginButtom: {
    marginBottom: 10
  },
  contentsText: {
    color: '#000000',
    padding: 10,
    width: '80%',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 30
  },
  contentsText2: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 30,
  },
  default: {
    backgroundColor: '#ffffff',
    borderWidth:1,
    borderColor: '#ffd333',
    borderRadius: 20,
    width: '50%',
    marginLeft:10,
    height: 50,
    padding: 10,
    top: 150,
  }
});

export default HomeScreen

//https://manage.exchangeratesapi.io/quickstart