import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card, CardItem, Body, Left, Right } from 'native-base'
import { randomColor } from 'randomcolor'

const TopSection = ({title, by, score, onPress}) => {
  return (
    <Card>
      <CardItem header>
        <Text style={styles.title}
              onPress={onPress}>{title}
        </Text>
      </CardItem>
      <CardItem footer>
        <Left>
          <Text style={{color: randomColor({luminosity: 'dark'})}}>{by}</Text>
        </Left>
        <Right>
          <Text>{score} points</Text>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18
  }
})

export default TopSection
