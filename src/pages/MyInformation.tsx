import React, { useEffect, useState } from 'react';
import { Alert, Animated, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';
import { Header } from '../components/Header';

import waterdrop from '../assets/waterdrop.png'
import { TreinoProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export interface AlunoProps {
    id?: string;
    imc: number;
    tmb: number;
    idade: number;
    peso: number;
    altura: number;
    obs?: string;
}

export function MyInformation() {

    const [loading, setLoading] = useState(true);
    const [aluno, setAluno] = useState<AlunoProps>();
    const [nextWaterd, setNextWaterd] = useState<number | undefined>();


    async function handleGetDataAluno() {
        const userId = await AsyncStorage.getItem('@turbofit:userId');
        const response = await api.get(`usuarios/${userId}`)
            .then(() => setLoading(false))
            .catch(e => e)
            .finally(() => setLoading(false))
        if (response) {
            setAluno(response)
        }
    }

    function handleWaltering() {
        if (aluno) {
            const water = aluno?.peso * 35
            setNextWaterd(water)
        }
    }

    useEffect(() => {
        handleGetDataAluno()
    }, [])

    if (loading) return <Load />

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd ? nextWaterd : "Beba bastante agua"}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Dados:
                </Text>
                <Animated.View>
                    <View style={styles.spotlight}>
                        <Text style={styles.spotlightText}>
                            {aluno?.altura}
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },

    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    spotlightImage: {
        width: 60,
        height: 60,
    },

    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify'
    },

    plants: {
        flex: 1,
        width: '100%',
    },

    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }

})