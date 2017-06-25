import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import Row from './Row'

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: 'HN',
  };

  constructor(props) {
    super(props)
    this.state = {rows: []}
  }

  componentDidMount() {
    this.fetchRows().then(rows => {
      this.setState({
        'rows': rows
      })
    })
  }

  fetchIds = async () =>
  	(await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json()

  fetchRow = async (id) =>
    (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json()

  fetchRows = async () => {
    let rows = []
    let i = 0
    try {
      let ids = await this.fetchIds()
      ids.forEach(async (id) => {
        try {
          rows[i++] = await this.fetchRow(id)
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


  _onPressButton = e => {
    const { navigate } = this.props.navigation
    navigate('Comments')
  }

  renderItem = ({item}) => {
      return (
        <Row
          item={item}
          onPress={this._onPressButton}
        />
      )
    }

  render() {

    return (
      <FlatList
        style={styles.container}
        data={this.state.rows}
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
