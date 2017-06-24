import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Row = ({item}) => {
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


const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
})

export default Row
