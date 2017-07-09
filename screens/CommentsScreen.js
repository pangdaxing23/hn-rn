import React, { Component } from 'react'
import { Alert } from 'react-native'
import Comments from '../components/Comments'
import { fetchItem } from '../network/api'

export default class CommentsScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {'comments': []}
  }

  async componentDidMount() {
    await this.fetchComments()
  }

  fetchComment = async (id) => {
    return (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json()
  }

  fetchComments = async () => {
    try {
      let {kids, descendants} = this.props.navigation.state.params
      // fill comments with objects with incrementing ids
      let comments = [...Array(descendants).keys()].map(el => {
        return {
          id: el,
          by: '',
          text: '',
          time: ''
        }
      })
      kids.forEach(async (id, i) => {
        try {
          comments[i] = await fetchItem(id)
          this.setState((prevState) => {
            return {comments: comments}
          })
        }
        catch (reason) {
          Alert.alert(reason.message)
        }
      })
      return comments
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
      />
    )
  }
}
