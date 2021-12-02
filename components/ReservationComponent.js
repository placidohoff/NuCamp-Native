import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable'
import * as Notifications from 'expo-notifications'

class Reservation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleReservation() {
        console.log(JSON.stringify(this.state))
        this.toggleModal()
    }

    resetForm() {
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        })
    }

    //This function waits to actually send the notification to first check if we have permissions on the device to do so.
    //So we create the notification we want to send, then check permissions and actually send it if we are allowed.
    async presentLocalNotification(date) {
        function sendNotification() {
            //By default apps do not show alerts for notifications.
            //We first set this to true:
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                })
            })

            //Now we create the alert to be shown.. or is it just the notification
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Campsite Reservation Search',
                    body: `Search for ${date} requested`
                },
                //sets the alert/notification to be sent immediately
                trigger: null
            })
        }

        //check to see if this app has permissions saved via async call locally, not to the device itself but to app storage:
        let permissions = await Notifications.getPermissionsAsync()

        //If this app doesn't have persmissions stored, request it from the device to be saved/stored
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync()
        }

        //finally send if we are allowed:
        if (permissions.granted) {
            sendNotification()
        }
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Campers</Text>
                        <Picker
                            style={styles.formRow}
                            selectedValue={this.state.campers}
                            onValueChange={itemValue => this.setState({ campers: itemValue })}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />

                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Hike-In?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.hikeIn}
                            trackColor={{ true: '#5637DD', false: null }}
                            onValueChange={value => this.setState({ hikeIn: value })}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date</Text>
                        <Button
                            onPress={() => {
                                this.setState({ showCalendar: !this.state.showCalendar })
                            }}
                            title={this.state.date.toLocaleDateString('en-US')}
                            color='#5637DD'
                            accessibilityLabel='Tap me to select a reservation date'
                        />
                    </View>
                    {
                        this.state.showCalendar && (
                            <DateTimePicker
                                style={styles.formItem}
                                value={this.state.date}
                                mode={'date'}
                                display='default'
                                onChange={(event, selectedDate) => {
                                    selectedDate && this.setState({ date: selectedDate, showCalendar: false })
                                }}
                            />
                        )
                    }
                    <View style={styles.formRow}>

                        <Button
                            onPress={() => Alert.alert(
                                'Begin Search?',
                                `Number of Campers: ${this.state.campers} \nHike In: ${this.state.hikeIn}\nDate: ${this.state.date.toLocaleDateString('en-US')}`,
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {
                                            console.log('Not Deleted')
                                            this.resetForm()
                                        },
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            this.presentLocalNotification(this.state.date.toLocaleDateString('en-US'))
                                            this.resetForm()
                                        }
                                    }
                                ],
                                { cancelable: false }

                            )}
                            title='Search'
                            color='#5637DD'
                            accessibilityLabel='Tap me to search for available campsites to reserve'
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation