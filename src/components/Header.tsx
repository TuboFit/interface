import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/perfil.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header() {
    const [username, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorgeUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '');
        }
        loadStorgeUserName();
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>{username}</Text>
            </View>
            <Image source={userImg} style={styles.image} />
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
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})