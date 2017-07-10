import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import { Card, CardItem, Body, Left, Right } from 'native-base'

const Row = ({title, by, score, comments, onPress, enabled}) => {
  const commentsLabel = comments != 1 ? 'comments' : 'comment'
  return (
    <TouchableHighlight
      onPress={enabled ? onPress : () => {}}
      underlayColor='white'
    >
      <Card>
        <CardItem header>
          <Text style={styles.title}>
            {title}
          </Text>
        </CardItem>
        <CardItem footer>
          <Left>
            <Text style={styles.score}>
              {score} points
            </Text>
          </Left>
          <Body>
            <Text style={styles.by}>
              {by}
            </Text>
          </Body>
          <Right>
            <Text style={styles.comments}>
              {comments} {commentsLabel}
            </Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
  by: {
    fontSize: 10
  },
  score: {
    fontSize: 10,
  },
  comments: {
    fontSize: 10,
  },
})

export default Row
