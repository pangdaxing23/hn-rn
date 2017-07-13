import React, { Component } from 'react'
import { Alert } from 'react-native'
import Comments from '../components/Comments'
import { fetchItem } from '../network/api'

const CHUNK_SIZE = 10

export default class CommentsScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      lastIndex: 0
    }
  }

  async componentDidMount() {
    await this.fetchComments()
  }

  fetchComments = async () => {
    try {
      let {kids, descendants} = this.props.navigation.state.params
      if (!kids) {
        return
      }
      let {lastIndex} = this.state
      let chunkIds = kids.slice(lastIndex, Math.min(lastIndex + CHUNK_SIZE, kids.length))
      this.setState({
        lastIndex: lastIndex + CHUNK_SIZE
      })

      let nextComments = await Promise.all(chunkIds.map(async (id, i) => {
        return fetchItem(id)
      }))

      this.setState(prevState => {
        return {comments: [...this.state.comments, ...nextComments]}
      })

    }
    catch (reason) {
      Alert.alert(reason.message)
    }
  }

  render() {
    return (
      <Comments
        post={this.props.navigation.state.params}
        comments={this.state.comments}
        loadMore={this.fetchComments}
      />
    )
  }
}
