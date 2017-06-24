import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

let rows = [];
let ids;
let i = 0;

const fetchIds = async () =>
	(await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json()

const fetchRow = async (id) =>
  (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json()

async function fetchRows() {
  try {
    ids = await fetchIds()
    ids.forEach(async (id) => {
      try {
        let response = await fetchRow(id)
        rows[i++] = response
      }
      catch (reason) {
        console.log(reason.message)
      }
    })
  }
  catch (reason) {
    console.log(reason.message)
  }
}

fetchRows()

const extractKey = ({id}) => id

export default class App extends Component {
  renderItem = ({item}) => {
      return (
        <View style={styles.row}>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.score}>
              {item.score} points
            </Text>
            <Text style={styles.comments}>
              {item.descendants} comments
            </Text>
          </View>

        </View>
      )
    }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={rows}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
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
  row: {
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
});
