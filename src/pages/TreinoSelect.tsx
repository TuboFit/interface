import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import api from '../services/api';
import { useNavigation } from '@react-navigation/core';
import { TreinoProps } from '../libs/storage';

export function TreinoSelect() {
    const [treinos, setTreinos] = useState<TreinoProps[]>([]);
    const [filteredTreinos, setFilteredTreinos] = useState<TreinoProps[]>([]);
    const [daySelected, setDaySelected] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    function handleDaySelected(day: string) {
        setDaySelected(day);

        if (day === ' ') {
            return setFilteredTreinos(treinos)
        }
        const filtered = treinos.filter(treino => treino.dia.includes(day))

        setFilteredTreinos(filtered)
    }

    async function fetchTreinos() {
        const { data } = await api.get(`/treinos`);
        if (!data) {
            return setLoading(true)
        }
        setTreinos(data)
        setLoading(false)
    }


    useEffect(() => {
        fetchTreinos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Vamos começar
                </Text>
            </View>
            <View>
                <FlatList
                    data={treinos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.grupMuscular}
                            onPress={() => { }}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredTreinos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => { }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => { }
                        //handleFetchMore(distanceFromEnd)
                    }
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})