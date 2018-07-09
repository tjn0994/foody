import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput, TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modalbox';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newFoodName: '',
            newFoodDescription: ''
        };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
      return "kasan";
        // return require('random-string')({length: numberOfCharacters});
    }
    create = () => {
      if (this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0) {
          alert("You must enter food's name and description");
          return;
      }
      const newKey = this.generateKey(24);
      const newFood = {
          key: newKey,
          name: this.state.newFoodName,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Foods_%28cropped%29.jpg",
          foodDescription: this.state.newFoodDescription
      };
      flatListData.push(newFood);
      this.props.parentFlatList.refreshFlatList(newKey);
      this.refs.myModal.close();
    }

    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>New food is information</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ newFoodName: text })}
                    placeholder="Enter new food's name"
                    value={this.state.newFoodName}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}

                    onChangeText={(text) => this.setState({ newFoodDescription: text })}
                    placeholder="Enter new food's description"
                    value={this.state.newFoodDescription}
                />
                <TouchableOpacity
                    onPress={() => this.create()}>
                    <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      alignSelf: 'center',
                    }}
                    >Save</Text>
                </TouchableOpacity>
            </Modal>
        );
    }
}
