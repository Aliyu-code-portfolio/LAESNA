import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, paddingSizes } from '../app_utils/sizes';



const minutesToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? ('0${time}') : time);
// return {formatTime(minute)}:{formatTime(second)}
export const Countdown = ({ minutes = 20, onEnd }) => {
    const interval = React.useRef(null);
    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                clearInterval(interval.current)
                onEnd()
                return time;
            }
            const timeLeft = time - 1000;
            //
            return timeLeft;
        });
    };
    useEffect(() => {
        console.log(minutes)
        setMillis(minutesToMillis(minutes))
    }, [minutes]);

    useEffect(() => {
        //
        interval.current = setInterval(countDown, 1000);
        return () => clearInterval(interval.current);
    }, []);
    const [millis, setMillis] = useState(minutesToMillis(minutes));
    const minute = Math.floor(millis / 1000 / 60) % 60;
    const second = Math.floor(millis / 1000) % 60;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Expected Time of Arrival {minutes} minutes
        </Text>
            <Text style={{ textAlign: 'center', }}>The emergency team will arrive in {minutes} minutes Please remain calm while help arrive</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '40%',
        elevation: 10,
        backgroundColor: '#efefef'
    },
    text: {
        fontSize: fontSizes.lg,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: paddingSizes.l,
    },
});
