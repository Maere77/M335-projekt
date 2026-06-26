import {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Barometer} from 'expo-sensors';

export default function Height() {
    const [{pressure, relativeAltitude, timestamp}, setData] = useState({pressure: 0, relativeAltitude: 0});
    const [subscription, setSubscription] = useState(null);

    const toggleListener = () => {
        subscription ? unsubscribe() : subscribe();
    };

    const subscribe = () => {
        setSubscription(Barometer.addListener(setData));
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };


    return (
        <View style={{paddingTop: 100, color: "white"}}>
            <Text style={{color: "white"}}>Barometer: Listener {subscription ? 'ACTIVE' : 'INACTIVE'}</Text>
            <Text style={{color: "white"}}>Pressure: {pressure} hPa</Text>
            <Text style={{color: "white"}}>
                Relative Altitude:{' '}
                {Platform.OS === 'ios' ? `${relativeAltitude} m` : `Only available on iOS`}
            </Text>
            <Text style={{color: "white"}}>Timestamp: {timestamp}</Text>
            <TouchableOpacity onPress={toggleListener} style={{backgroundColor: "green", padding: 10, marginTop: 10}}>
                <Text style={{color: "white"}}>Toggle listener</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
})