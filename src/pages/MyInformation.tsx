import React, { useEffect, useState } from 'react';
import { Alert, Animated, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

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

    const [loading, setLoading] = useState(false);
    const [aluno, setAluno] = useState<AlunoProps>();
    const [nextWaterd, setNextWaterd] = useState<number | undefined>();
    const navigation = useNavigation()


    async function handleGetDataAluno() {
        setLoading(true)
        const alunoId = await AsyncStorage.getItem('@turbofit:aluno');
        const response = await api.get(`alunos/${alunoId}`)
        if (response) {
            setAluno(response.data)
            aluno ? setNextWaterd(aluno.peso * 40) : null
            setLoading(false)
        }
        setLoading(false)

    }

    function handleNavigateEditDados() {
        navigation.navigate('Confirmation' as never, { aluno } as never)
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
                    {nextWaterd ? `Você deve beber pelo menos ${nextWaterd} ml de água por dia` : "Beba bastante agua"}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Dados
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.spotlightUserInformation}>
                        <Text style={styles.spotlightTitle}>
                            {'Altura:'}
                        </Text>
                        <Text style={styles.spotlightTextUserIformation}>
                            {aluno ? `${(aluno?.altura / 100)}m ` : 'Sem dados de altura'}
                        </Text>
                    </View>
                    <View style={styles.spotlightUserInformation}>
                        <Text style={styles.spotlightTitle}>
                            {'Peso: '}
                        </Text>
                        <Text style={styles.spotlightTextUserIformation}>
                            {aluno ? `${aluno?.peso} kg ` : 'Sem dados de peso'}
                        </Text>
                    </View>
                    <View style={styles.spotlightUserInformation}>
                        <Text style={styles.spotlightTitle}>
                            {'IMC:  '}
                        </Text>
                        <Text style={styles.spotlightTextUserIformation}>
                            {aluno ? `${aluno?.imc.toFixed(1)} ` : 'Sem dados de peso'}
                        </Text>
                    </View>
                    <View style={styles.spotlightUserInformation}>
                        <Text style={styles.spotlightTitle}>
                            {'TMB: '}
                        </Text>
                        <Text style={styles.spotlightTextUserIformation}>
                            {aluno ? `${aluno?.tmb.toFixed(1)} ` : 'Sem dados de peso'}
                        </Text>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <Button
                            title='Editar dados'
                            onPress={handleNavigateEditDados}
                        />
                    </View>

                </ScrollView>
            </View>
        </View >
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
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    spotlightImage: {
        width: 60,
        height: 60,
    },

    spotlightUserInformation: {
        flex: 1,
        backgroundColor: '#161618',
        borderRadius: 20,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        marginTop: 10
    },

    spotlightTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.white,
        marginRight: '45%',
    },

    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify',
        fontFamily: fonts.heading,
    },

    spotlightTextUserIformation: {
        flex: 1,
        color: colors.white,
        paddingHorizontal: 20,
        textAlign: 'justify',
        fontFamily: fonts.heading,
        fontSize: 18
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