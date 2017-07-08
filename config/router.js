import React from 'react'
import { StackNavigator } from 'react-navigation'

import CommentsScreen from '../screens/CommentsScreen'
import HomeScreen from '../screens/HomeScreen'

export const FeedStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'HN',
      headerBackTitle: 'Back'
    }
  },
  Comments: {
    screen: CommentsScreen,
    navigationOptions: {
      title: 'Comments'
    }
  }
});
