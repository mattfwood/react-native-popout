import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Card from './components/Card';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card />
        {/* <Card />
        <Card />
        <Card /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    // padding: 20,
    backgroundColor: '#EBEBEB',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
