import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'

const Row = (props) => {
  const { title, score, descendants } = props.item
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor='white'
      style={styles.row}
    >
      <View>
        <Text style={styles.title}>
          {title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.score}>
            {score} points
          </Text>
          <Text style={styles.comments}>
            {descendants} comments
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 80,
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#ffa970',
  },
  title: {
    fontSize: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {
    fontSize: 10,
  },
  comments: {
    fontSize: 10,
  },
})

export default Row
