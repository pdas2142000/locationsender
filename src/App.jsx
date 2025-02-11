/** React Imports */
import React, { useState, useEffect } from 'react';

/** Screen */
import Content from './screens/content';

/** Libraries */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

/** Main App */
const App = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const queryClient = new QueryClient();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 3000); // 3-second delay for the splash screen

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {isSplashVisible ? (
                <View style={styles.ls_splash_container}>
                    <View style={styles.ls_image_box}>
                        <Image style={styles.ls_img} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={styles.ls_indicator_box} >
                        <ActivityIndicator size="small" color="#3270a2" />
                    </View>
                </View>
            ) : (
                <>
                    <Content />
                    <Toast />
                </>
            )}
        </QueryClientProvider>
    );
};

const styles = StyleSheet.create({
    ls_splash_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Customize the background color
    },
    ls_splash_text: {
        fontSize: 24,
        color: '#ffffff',
        marginBottom: 20,
    },
    ls_image_box: {
        width: 220,
        height: 100,
        borderRadius: 10,
        overflow: "hidden"
    },
    ls_img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    ls_indicator_box:{
        marginVertical:30
    }
});

export default App;
