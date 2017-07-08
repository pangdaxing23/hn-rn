import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'

const Row = ({title, score, comments, onPress, enabled}) => {
  const commentsLabel = comments != 1 ? 'comments' : 'comment'
  return (
    <TouchableHighlight
      onPress={enabled ? onPress : () => {}}
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
            {comments} {commentsLabel}
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
