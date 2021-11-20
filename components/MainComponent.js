import React, { Component } from 'react'
import Home from './HomeComponent'
import Directory from './DirectoryComponent'
import CampsiteInfo from './CampsiteInfoComponent'
import Constants from 'expo-constants'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Reservation from './ReservationComponent'
import { View, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
// import SafeAreaView from 'react-native-safe-area-view'
import { connect } from 'react-redux'
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators'


const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
}

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo },
    },
    {
        initialRouteName: 'Directory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }


)

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
            // headerLeft: 
            //     <Icon 
            //         name='tree'
            //         type='font-awesome'
            //         iconStyle={styles.stackIcon}
            //         onPress{() => NavigationPreloadManager.toggleDrawer()}
            //     />
        }
    }
)

//Notice we want the components to get mapped to via their navigators
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        Reservation: {
            screen: ReservationNavigator
            // navigationOptions: {
            //     drawerLabel: 'Reserve Campsite',
            //     drawerIcon: ({tintColor}) => (
            //         <Icon 
            //             name='tree'
            //             type='font-awesome'
            //             size={24}
            //             color={tintColor}
            //         />
            //     )
            // }

        },
        About: { screen: AboutNavigator },
        Contact: { screen: ContactNavigator }


    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
)

const AppNavigator = createAppContainer(MainNavigator)

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites()
        this.props.fetchComments()
        this.props.fetchPromotions()
        this.props.fetchPartners()
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Constants.stausBarHeight

                }}

            >
                <AppNavigator />
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Main);