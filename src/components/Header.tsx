import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AntDesign } from "@expo/vector-icons"

import userImg from '../assets/user.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header() {
    const [username, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorgeUserName() {
            const user = await AsyncStorage.getItem('@turbofit:username')
            setUserName(user || '');
        }
        loadStorgeUserName();
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>{username || "Usuario"}</Text>
            </View>
            {userImg ? <Image source={userImg} style={styles.image} /> : <AntDesign size={20} color={"#FFF"} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
        padding: 20,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#FFF"
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})