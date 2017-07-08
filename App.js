import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { FeedStack } from './config/router'

export default class App extends Component {
  render() {
    return (
      <FeedStack />
    )
  }
}
