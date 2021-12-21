import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from 'react-native-svg'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


interface AlunoProps extends RectButtonProps {
    data: {
        imc: number;
        tmb: number;
        idade: number;
        peso: number;
        altura: number;
    }
}

export function PlantCardSecondary({ data, ...rest }: AlunoProps) {
    console.log(data)
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={() => { }}
                        >
                            <Feather name="trash" size={32} color={colors.white} />

                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.container}
                {...rest}
            >

                <Text style={styles.title}>
                    {data.imc}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar às:
                    </Text>
                    <Text style={styles.time}>
                        {data}
                    </Text>
                </View>
            </RectButton >
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },
    details: {
        alignItems: 'flex-end',
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
    buttonRemove: {
        width: 100,
        height: 100,
        backgroundColor: colors.red,
        marginTop: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 30,
        paddingLeft: 25
    }
})