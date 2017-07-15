import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SectionStack } from './config/router'

export default class App extends Component {
  render() {
    return (
      <SectionStack />
    )
  }
}
