import React from 'react';
import { Image, StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from 'react-native-svg'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


interface TreinoProps extends RectButtonProps {
    data: {
        grupMuscular: string,
    }
}

export function PlantCardPrimary({ data, ...rest }: TreinoProps) {
    return (
        <RectButton {...rest} style={styles.container}>
            <Text style={styles.text}>{data.grupMuscular}</Text>
        </RectButton >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.orange,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10,
    },
    text: {
        color: colors.white,
        fontFamily: fonts.heading,
        fontSize: 24,
        marginVertical: 16
    }
})