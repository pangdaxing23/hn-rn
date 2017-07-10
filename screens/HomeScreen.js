import React, { Component } from 'react'
import { Alert } from 'react-native'
import Home from '../components/Home'
import { fetchItem } from '../network/api'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      refreshing: false
    }
  }

  async componentDidMount() {
    this.onRefresh()
  }

  fetchIds = async () => {
    return (await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json()
  }

  fetchItems = async () => {
    try {
      let ids = await this.fetchIds()
      // fill rows with objects with incrementing ids
      let rows = [...Array(500).keys()].map(el => {
        return {
          id: el,
          title: '',
          score: '',
          descendants: ''
        }
      })
      ids.forEach(async (id, i) => {
        try {
          rows[i] = await fetchItem(id)
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

  onPressRow = (item) => {
    this.props.navigation.navigate('Comments', item)
  }

  onRefresh = async () => {
    this.setState({refreshing: true})
    await this.fetchItems()
    this.setState({refreshing: false})
  }

  render() {
    const {posts, refreshing} = this.state
    return (
      <Home
        posts={posts}
        onPress={this.onPressRow}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    );
  }
}
