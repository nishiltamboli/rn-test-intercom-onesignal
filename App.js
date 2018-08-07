/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, Text, View, TextInput, Image} from 'react-native';
import Intercom from 'react-native-intercom';
import OneSignal from 'react-native-onesignal';

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
  
    this.state = {};
    this.onIds = this.onIds.bind(this);
    this.registerIntercom = this.registerIntercom.bind(this);
  }

  componentWillMount() {
    console.log("inside");
    OneSignal.setLogLevel(6, 0);
    OneSignal.init("xxxxxxxx");
    OneSignal.addEventListener('ids', this.onIds);
    this.registerIntercom();
  }

  onIds(device) {
    this.registerIntercom(device.userId, device.pushToken);
  }

  registerIntercom() {
    try {
      Intercom.registerIdentifiedUser({ userId: 'rn-user1' });
      Intercom.updateUser({
        email: 'nktamboli@gmail.com',
        user_id: 'rn-user1',
        name: 'Nishil Tamboli'
      });
    }
    catch(e) {
      
    }
  }

  sendNotification() {
    if(!this.state.message) {
      alert("Please enter a message");
      return;
    }
    let otherParameters = {};
    let data = {}; // some array as payload
    let contents = {
      'en': this.state.message,
    }
    try {
      OneSignal.postNotification(contents, data, 'xxxxxxx', otherParameters);
      this.setState({ message: '' });
      if(this.refTxt) {
        this.refTxt.blur();
      }
    }
    catch(e) {
      
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appMenu}>
          <Text style={styles.appMenuText}>
            WELCOME
          </Text>
        </View>
        <View style={styles.chatContainer}>
          <View style={styles.chatTextInputContainer}>
            <TextInput ref={(refTxt) => { this.refTxt = refTxt; }} style={styles.chatTextInput} value={this.state.message} onChangeText={(message) => this.setState({ message })} />
          </View>
        </View>
        <View style={styles.appButtonContainer}>
          <TouchableOpacity onPress={() => this.sendNotification()} style={styles.appButton}>
            <Text numberOfLines={1} style={styles.appButtonText}>
              SEND MESSAGE
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Intercom.displayMessageComposer()} style={styles.appFloatingButton}>
          <Image style={styles.appFloatingButtonChatIcon} source={require('./assets/images/chat.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#e6e9ea',
  },
  appMenu: {
    backgroundColor: '#000000',
    height: 60,
    justifyContent: 'center',
  },
  appMenuText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  chatContainer: {
    padding: 15,
  },
  chatTextInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 200,
    padding: 5,
  },
  chatTextInput: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  appButtonContainer: {
    padding: 15,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButton: {
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#63c8d3',
    borderRadius: 3,
  },
  appButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  appFloatingButton: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 32,
    elevation: 10,
    backgroundColor: '#5180c0',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15,
    right: 15,
  },
  appFloatingButtonChatIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
