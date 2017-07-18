import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { WebBrowser } from 'expo'
import TopSection from './TopSection'
import Comment from './Comment'

const Comments = ({post, comments, loadMore}) => {
  const {title, by, time, score, url} = post

  handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  }

  extractKey = ({id}) => id

  renderEmpty = () => {
    return (
      <Text style={styles.empty}>
        No comments yet!
      </Text>
    )
  }

  renderItem = ({item}) => {
    return (
      <Comment
        item={item}
      />
    )
  }

  renderHeader = () => {
    return (
      <TopSection
        title={title}
        by={by}
        time={time}
        score={score}
        onPress={() => handlePressButtonAsync(url)}
        style={styles.topSection}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={extractKey}
        initialNumToRender={3}
        onEndReached={loadMore}
        onEndThreshold={5}
        ListEmptyComponent={renderEmpty}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    padding: 10,
  },
  topSection: {
    flex: 1,
    padding: 20,
  },
  list: {
    flex: 3,
  },
  empty: {
    fontSize: 20
  }
})

export default Comments
