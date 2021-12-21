import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AntDesign } from "@expo/vector-icons"

import userImg from '../assets/perfil.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header() {
    const [username, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorgeUserName() {
            const user = await AsyncStorage.getItem('@turbofit:user')
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
            <Image source={userImg ? userImg : AntDesign} style={styles.image} />
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
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})