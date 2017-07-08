import React from 'react'
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native'
import TopSection from '../components/TopSection'
import HTMLView from 'react-native-htmlview'
import { WebBrowser } from 'expo'

const Comments = ({post, comments}) => {
  const {title, by, score, url} = post

  handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  }

  extractKey = ({id}) => id

  renderItem = ({item}) => {
    const {text, by} = item
    return (
      <View style={styles.listItem}>
        <HTMLView value={text} />
        <Text>{by}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TopSection
        title={title}
        by={by}
        score={score}
        onPress={() => handlePressButtonAsync(url)}
        style={styles.topSection}
      />
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={extractKey}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    padding: 20,
  },
  topSection: {
    flex: 1,
    padding: 20
  },
  list: {
    flex: 3,
    marginTop: 20,
    backgroundColor: '#f6f6ef',
  },
  listItem: {
    backgroundColor: '#f6f6ef'
  },
})

export default Comments
