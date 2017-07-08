import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native'
import TopSection from '../components/TopSection'
import HTMLView from 'react-native-htmlview'

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
          by: '-',
          text: '',
          time: '-'
        }
      })
      kids.forEach(async (id, i) => {
        try {
          comments[i] = await this.fetchComment(id)
          this.setState((prevState) => {
            return {'comments': comments}
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

  extractKey = ({id}) => id

  _renderItem = ({item}) => {
    return (
      <View>
      <HTMLView value={item.text} />
      <Text>{item.by}</Text>
      </View>
    )
  }

  render() {
    const {title, by, score} = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <TopSection
          title={title}
          by={by}
          score={score}
          style={styles.topSection}
        />
        <FlatList
          style={styles.list}
          data={this.state.comments}
          renderItem={this._renderItem}
          keyExtractor={this.extractKey}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    marginTop: 20
  },
  list: {
    flex: 3,
    backgroundColor: '#f6f6ef',
    marginTop: 20
  },
  topSection: {
    flex: 1,
    padding: 20
  },
  bottomSection: {
    flex: 3,
    padding: 15
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18
  }
})
