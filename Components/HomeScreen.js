import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import Row from './Row'

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: 'HN',
  };

  constructor(props) {
    super(props)
    this.state = {posts: []}
  }

  async componentWillMount() {
    await this.fetchRows()
  }

  fetchIds = async () => {
    return (await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json()
  }

  fetchRow = async (id) => {
    return (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json()
  }

  fetchRows = async () => {
    try {
      let ids = await this.fetchIds()
      // fill rows with objects with incrementing ids
      let rows = [...Array(500).keys()].map(el => {
        return {id: el}
      })
      ids.forEach(async (id, i) => {
        try {
          rows[i] = await this.fetchRow(id)
          this.setState((prevState) => {
            return {posts: rows}
          })
        }
        catch (reason) {
          Alert.alert(reason.message)
        }
      })
      return rows
    }
    catch (reason) {
      Alert.alert(reason.message)
    }
  }

  onPress = (e) => {
    const { navigate } = this.props.navigation
    navigate('Comments')
  }

  extractKey = ({id}) => id

  renderItem = ({item}) => {
    return (
      <Row
        item={item}
        onPress={this.onPressRow}
      />
    )
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.posts}
        renderItem={this.renderItem}
        keyExtractor={this.extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    marginTop: 20
  },
})
