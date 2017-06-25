import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Row from './Components/Row'
import CommentsScreen from './Components/CommentsScreen'
import HomeScreen from './Components/HomeScreen'
import { StackNavigator } from 'react-navigation'

const HackerNews = StackNavigator({
  Home: { screen: HomeScreen },
  Comments: { screen: CommentsScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    marginTop: 20
  },
})

export default HackerNews
