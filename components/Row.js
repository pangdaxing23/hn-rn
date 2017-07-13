import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import { Card, CardItem, Body, Left, Right } from 'native-base'
import { randomColor } from 'randomcolor'

export default class Row extends Component {
  constructor(props) {
    super(props)
  }

  // this is why this component needs to be a class
  userColor = {color: randomColor({luminosity: 'dark'})}

  render() {
    const {title, index, by, score, comments, onPress, enabled} = this.props
    const commentsLabel = comments != 1 ? 'comments' : 'comment'
    return (
      <TouchableHighlight
        onPress={enabled ? onPress : () => {}}
        underlayColor='white'
      >
        <Card>
          <CardItem header>
            <Left>
              <View style={[styles.index, {borderColor: this.userColor.color}]}>
                <Text>{index + 1}</Text>
              </View>
              <Text style={styles.title}>
                {title}
              </Text>
            </Left>
          </CardItem>
          <CardItem footer>
            <Left>
              <Text style={styles.score}>
                {score} points
              </Text>
            </Left>
            <Body>
              <Text style={[styles.by, this.userColor]}>
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
}

const styles = StyleSheet.create({
  index: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 33,
    padding: 4,
    marginRight: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 500
  },
  title: {
    fontSize: 16,
    paddingRight: 35
  },
  by: {
    fontSize: 12
  },
  score: {
    fontSize: 12,
  },
  comments: {
    fontSize: 12,
  },
})
