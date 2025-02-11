/** React Imports */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Alert, Image, Animated, Button, TouchableOpacity } from 'react-native';

/** Libraries */
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { useMutation } from '@tanstack/react-query';
import BackgroundService from 'react-native-background-actions';

/** Local Imports */
import { AddLocation } from '../utils/api-call';
import { ContentStyles } from './style';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const Content = () => {
    const [Location, SetLocation] = useState(null);
    const [count, setCount] = useState(0); // Track API call count
    const bounceValue = useRef(new Animated.Value(1)).current;

    const styles = ContentStyles;

    const AddLocationMutation = useMutation({
        mutationKey: ['location_mutation', Location?.coords?.latitude, Location?.coords?.longitude],
        mutationFn: (data) => AddLocation(data),
        onSuccess: (response) => {
            console.log("🚀 ~ Content ~ response:", response);
        },
        enabled: !!Location?.coords,
    });

    const RequestLocationPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
            GetCurrentLocation();
        } else {
            Alert.alert('Permission Denied', 'Location permission is required to access your location.');
        }
    };

    const GetCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => SetLocation(position),
            (error) => {
                console.error(error);
                Alert.alert('Error', error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handleAddLocation = () => {
        const payload = {
            email: 'pratik@react.com',
            lat: Location?.coords?.latitude,
            long: Location?.coords?.longitude,
        };
        AddLocationMutation.mutate(payload);
    };

    const veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;
        let localCount = 0;
        for (let i = 0; BackgroundService.isRunning(); i++) {
            localCount++;
            handleAddLocation();
            setCount((prev) => prev + 1);
            await BackgroundService.updateNotification({
                taskDesc: `Location send count: ${localCount}`,
            });
            await sleep(delay);
        }
    };

    useEffect(() => {
        RequestLocationPermission();
    }, []);

    /**
     * Start background api call
     */
    const StartBackgroundService = async () => {
        try {
            console.log('Starting background service...');
            await BackgroundService.start(veryIntensiveTask, {
                taskName: 'Example',
                taskTitle: 'Location send every 15 minutes',
                taskDesc: 'Location send count: 0',
                taskIcon: {
                    name: 'ic_launcher',
                    type: 'mipmap',
                },
                color: '#ff00ff',
                linkingURI: 'yourSchemeHere://chat/jane',
                parameters: {
                    delay: 900000,
                },
            });
            console.log('Background service started.');
        } catch (error) {
            console.error('Failed to start background service:', error);
        }
    };

    const StopBackgroundService = async () => {
        await BackgroundService.stop();
        setCount(0); // Reset count when stopping the service
        console.log('Background service stopped.');
    };

    return (
        <View style={styles.ls_container}>
            <Animated.View style={[styles.ls_image_box, { transform: [{ scale: bounceValue }] }]}>
                <Image style={styles.ls_img} source={require('../../assets/images/Location.png')} />
            </Animated.View>
            <View style={styles.ls_text_container}>
                <Text style={styles.ls_text}>
                    Easily share your real-time location with friends and family for instant updates and safety.
                </Text>
                <Text style={styles.ls_info_heading}>Current Location Information</Text>
                <View style={styles.ls_info_box}>
                    <Text style={styles.ls_info_box_text}>Latitude: </Text>
                    {
                        !Location ?
                            <Text style={styles.ls_info_loading_text}>Loading...</Text> :
                            <Text style={styles.ls_info_box_text}>{Location?.coords?.latitude}</Text>
                    }
                </View>
                <View style={styles.ls_info_box}>
                    <Text style={styles.ls_info_box_text}>Longitude: </Text>
                    {
                        !Location ?
                            <Text style={styles.ls_info_loading_text}>Loading...</Text> :
                            <Text style={styles.ls_info_box_text}>{Location?.coords?.longitude}</Text>
                    }
                </View>
            </View>

            <View style={styles.ls_btn_container}>
                <TouchableOpacity
                    style={[styles.ls_btn, styles.ls_btn_start]}
                    onPress={StartBackgroundService}
                >
                    <Text style={styles.ls_btn_text}>Start background location</Text>
                    {
                        count > 0 && (
                            <View style={styles.ls_badge}>
                                <Text style={[styles.ls_btn_text, { color: "black" }]}>{count}</Text>
                            </View>
                        )
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.ls_btn}
                    onPress={StopBackgroundService}
                >
                    <Text style={styles.ls_btn_text}>Stop background location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Content;
