import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import Row from './Row'

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: 'HN',
  };

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      refreshing: false
    }
  }

  async componentWillMount() {
    this._onRefresh()
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
        return {
          id: el,
          title: '',
          score: '-',
          descendants: '-'
        }
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

  extractKey = ({id}) => id

  renderItem = ({item}) => {
    return (
      <Row
        item={item}
        nav={this.props.navigation}
      />
    )
  }

  _onRefresh = async () => {
    this.setState({refreshing: true})
    await this.fetchRows()
    this.setState({refreshing: false})
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.posts}
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
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
