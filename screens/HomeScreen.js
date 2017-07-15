import React, { Component } from 'react'
import { Alert } from 'react-native'
import Home from '../components/Home'
import { fetchIds, fetchItem } from '../network/api'

const CHUNK_SIZE = 10

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ids: [],
      posts: [],
      refreshing: false,
      lastIndex: 0
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  fetchItems = async () => {
    try {
      let {ids, lastIndex} = this.state
      if (ids.length === 0) {
        ids = await fetchIds(this.props.screenProps.section)
        this.setState({ ids })
      }
      if (lastIndex >= ids.length) {
        return
      }
      let chunkIds = ids.slice(lastIndex, lastIndex + CHUNK_SIZE)
      this.setState({
        lastIndex: lastIndex + CHUNK_SIZE
      })

      let nextPosts = await Promise.all(chunkIds.map(async (id, i) => {
        return fetchItem(id)
      }))

      this.setState(prevState => {
        return {posts: [...this.state.posts, ...nextPosts]}
      })
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
        loadMore={this.fetchItems}
      />
    );
  }
}
