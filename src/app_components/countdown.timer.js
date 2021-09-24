import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, paddingSizes } from '../app_utils/sizes';



const minutesToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? (`0${time}`) : time);
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
            <Text style={styles.text}>Expected Time of Arrival is {minutes} minutes
        </Text>
            <Text style={{ textAlign: 'center', fontFamily: 'Oswald_400Regular', }}>Please remain calm while help arrive. {'\n'} {formatTime(minute)}:{formatTime(second)}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '40%',
        elevation: 30,
        backgroundColor: '#efefef',
        borderRadius: 5
    },
    text: {
        fontSize: fontSizes.lg,
        fontFamily: 'Oswald_400Regular',
        color: 'black',
        textAlign: 'center',
        padding: paddingSizes.l,
    },
});
