import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { Content, Card, CardItem, Body } from 'native-base'
import { randomColor } from 'randomcolor'

export default class Comment extends Component {
  constructor(props) {
    super(props)
  }

  // this is why this component needs to be a class
  userColor = {color: randomColor({luminosity: 'dark'})}

  render() {
    const {text, by} = this.props.item

    return (
      <Card>
        <CardItem header>
          <Text style={[this.userColor, styles.username]}>{by}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <HTMLView value={text} />
          </Body>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  username: {
    fontWeight: 'bold'
  }
})
