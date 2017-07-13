import React, { Component } from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { Card, CardItem, Left, Right } from 'native-base'
import { randomColor } from 'randomcolor'

export default class TopSection extends Component {
  constructor(props) {
     super(props)
  }

  // this is why this component needs to be a class
  userColor = {color: randomColor({luminosity: 'dark'})}

  render() {
    const {title, by, score, onPress} = this.props
    return (
      <Card>
        <TouchableHighlight
          onPress={onPress}
          underlayColor='white'
        >
          <CardItem header>
            <Text style={styles.title}>
              {title}
            </Text>
          </CardItem>
        </TouchableHighlight>
        <CardItem footer>
          <Left>
            <Text style={[this.userColor, styles.username]}>{by}</Text>
          </Left>
          <Right>
            <Text>{score} points</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  username: {
    fontWeight: 'bold'
  }
})
