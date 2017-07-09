import React from 'react'
import { Platform} from 'react-native'
import { Constants } from 'expo'
import { StackNavigator } from 'react-navigation'

import CommentsScreen from '../screens/CommentsScreen'
import HomeScreen from '../screens/HomeScreen'

const headerHeight = Constants.statusBarHeight + (Platform.OS === 'ios' ? 45 : 55)

export const FeedStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'HN',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'orange',
        paddingTop: Constants.statusBarHeight,
        height: headerHeight
      },
      headerBackTitle: 'Back',
    }
  },
  Comments: {
    screen: CommentsScreen,
    navigationOptions: {
      title: 'Comments',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'orange',
        paddingTop: Constants.statusBarHeight,
        height: headerHeight
      }
    }
  }
});
