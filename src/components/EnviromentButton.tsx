import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string,
    active?: boolean,
}

export function EnviromentButton({ title, active = false, ...rest }: EnviromentButtonProps) {
    return (
        <RectButton
            style={[
                styles.container,
                active && styles.containerActive
            ]}
            {...rest}
        >
            <Text
                style={[
                    styles.text,
                    active && styles.textActive
                ]}
            >
                {title.slice(0, 3)}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.orange,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    containerActive: {
        backgroundColor: colors.orange_light
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text,

    },
    textActive: {
        fontFamily: fonts.heading,
        color: colors.orange_dark,
    }
})