import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';
import { TextInput } from 'react-native-gesture-handler';
import api from '../services/api';
import { Load } from '../components/Load';

interface Params {
    aluno: {
        id?: string;
        imc: number;
        tmb: number;
        idade: number;
        peso: number;
        altura: number;
        obs?: string;
        dados: Object;
        usuario: Object;
    }
}

export function Confirmation() {
    const navigation = useNavigation()
    const routes = useRoute();
    const {
        aluno,
        ...rest
    } = routes.params as Params;

    const [loading, setLoading] = useState(false)
    const [idade, setIdade] = useState<number>(aluno.idade)
    const [peso, setPeso] = useState<number>(aluno.peso)
    const [altura, setAltura] = useState<number>(aluno.altura)
    const [obs, setObs] = useState<string>('')

    async function handleEditDados() {
        setLoading(true)
        console.log(aluno.dados, aluno.usuario)
        await api.patch(`/alunos/${aluno.id}`, {
            idade,
            peso,
            altura,
            obs,
            dados: aluno.dados,
            usuario: aluno.usuario
        })
            .then(() => {
                setLoading(false)
                navigation.goBack()
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    if (loading) return <Load />

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <TextInput
                    style={styles.input}
                    placeholder="Digite sua idade"
                    keyboardType='number-pad'
                    placeholderTextColor="#FFF"
                    onChangeText={(e) => setIdade(e as unknown as number)}
                    autoCapitalize='none'
                />

                <TextInput
                    style={styles.input}
                    placeholder="Digite seu peso"
                    keyboardType='number-pad'
                    placeholderTextColor="#FFF"
                    onChangeText={(e) => setPeso(e as unknown as number)}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua altura (cm)"
                    keyboardType='number-pad'
                    placeholderTextColor="#FFF"
                    onChangeText={(e) => setAltura(e as unknown as number)}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Observações"
                    keyboardType='web-search'
                    placeholderTextColor="#FFF"
                    onChangeText={(e) => setObs(e)}
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.footer}>
                <Button
                    title='Editar dados'
                    onPress={handleEditDados}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#000"
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: 30
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.orange,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginVertical: 20

    },
})