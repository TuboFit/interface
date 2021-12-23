import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { Button } from '../components/Button';
import { format, isBefore } from 'date-fns';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TreinoProps, } from '../libs/storage';

interface Params {
    treino: TreinoProps
}

export function TreinoSave() {

    const route = useRoute();
    const navigation = useNavigation();
    const { treino } = route.params as Params;

    function handleBackOnTreino() {
        navigation.navigate("TreinoSelect" as never);
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>

                    <Text style={styles.plantName}>
                        {treino.nivel.toLocaleUpperCase()}
                    </Text>
                    <Text style={styles.plantAbaut}>
                        {treino.grupMuscular}
                    </Text>
                </View>

                <FlatList
                    data={treino.exercicios}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View style={styles.spotlight}>
                            <Text style={styles.spotlightText}>
                                <Text style={styles.spotlightTitle}>{item.nome}{'\n'}</Text>
                                <Text style={styles.spotlightText}>
                                    {'Repetições: ' + item.numRepeticoes + '       '}
                                </Text>
                                <Text style={styles.spotlightText}>
                                    {'Carga: ' + item.carga}
                                </Text>
                            </Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    onEndReachedThreshold={0.1}
                />

                <View style={styles.controller}>

                    <Button
                        title='Finalizar treino'
                        onPress={handleBackOnTreino}
                    />
                </View>
            </View>
        </ScrollView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.background,

    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
    },
    plantName: {
        textAlign: 'center',
        fontFamily: fonts.heading,
        fontSize: 30,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbaut: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 24,
        marginTop: 10
    },
    controller: {
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complemet,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },

    spotlight: {
        flex: 2,
        backgroundColor: "#161618",
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    spotlightText: {
        flex: 1,
        color: colors.white,
        paddingHorizontal: 20,
        textAlign: 'justify',
        fontSize: 16,
    },

    spotlightTitle: {
        fontSize: 18,
        fontFamily: fonts.heading,
        color: colors.orange,
        marginVertical: 20,
    }

})