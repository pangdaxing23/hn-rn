import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'

export default class Row extends Component {

  constructor(props) {
    super(props)
  }

  onPressRow = (e) => {
    const { navigate } = this.props.nav
    navigate('Comments', {item: this.props.item})
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.onPressRow}
        underlayColor='white'
        style={styles.row}
      >
        <View>
          <Text style={styles.title}>
            {this.props.item.title}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.score}>
              {this.props.item.score} points
            </Text>
            <Text style={styles.comments}>
              {this.props.item.descendants} comments
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
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
