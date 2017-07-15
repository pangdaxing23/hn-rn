import React from 'react'
import { Platform} from 'react-native'
import { Constants } from 'expo'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import CommentsScreen from '../screens/CommentsScreen'
import HomeScreen from '../screens/HomeScreen'
import { TOP, NEW, ASK, SHOW, JOB } from '../network/api'

const headerHeight = Constants.statusBarHeight + (Platform.OS === 'ios' ? 45 : 55)

export const FeedStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'HN',
      headerBackTitle: 'Back',
    }
  },
  Comments: {
    screen: CommentsScreen,
    navigationOptions: {
      title: 'Comments',
    }
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'orange',
      paddingTop: Constants.statusBarHeight,
      height: headerHeight
    },
  }
})

export const SectionStack = DrawerNavigator({
  Home: {
    screen: () => <FeedStack screenProps={{section: TOP}} />,
    navigationOptions: {
      drawerLabel: 'Home',
    }
  },
  New: {
    screen: () => <FeedStack screenProps={{section: NEW}} />,
    navigationOptions: {
      drawerLabel: 'New'
    }
  },
  Ask: {
    screen: () => <FeedStack screenProps={{section: ASK}} />,
    navigationOptions: {
      drawerLabel: 'Ask'
    }
  },
  Show: {
    screen: () => <FeedStack screenProps={{section: SHOW}} />,
    navigationOptions: {
      drawerLabel: 'Show'
    }
  },
  Job: {
    screen: () => <FeedStack screenProps={{section: JOB}} />,
    navigationOptions: {
      drawerLabel: 'Job'
    }
  },
},
{
  drawerPosition: 'right'
})
