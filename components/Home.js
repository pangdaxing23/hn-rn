import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Row from '../components/Row'

const Home = ({posts, onPress, refreshing, onRefresh, loadMore}) => {

  extractKey = ({id}) => id

  renderItem = ({item}) => {
    const { title, by, score, descendants } = item
    const enabled = title !== ''
    return (
      <Row
        title={title}
        by={by}
        score={score}
        comments={descendants}
        enabled={enabled}
        onPress={() => onPress(item)}
      />
    )
  }

  return (
    <FlatList
      style={styles.container}
      data={posts}
      initialNumToRender={8}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndThreshold={5}
      renderItem={renderItem}
      keyExtractor={extractKey}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef'
  },
})

export default Home
