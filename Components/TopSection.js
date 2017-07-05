import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const TopSection = ({item}) => {
  return (
    <View style={styles.topSection}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.postInfo}>
        <Text>{item.by}</Text>
        <Text>{item.score} points</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topSection: {
    flex: 1,
    padding: 20
  },
  bottomSection: {
    flex: 3,
    padding: 15
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18
  }
})

export default TopSection
