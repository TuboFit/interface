import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage'

export function UserIdentificationData() {
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [peso, setPeso] = useState<string>();
    const [altura, setAltura] = useState<string>();
    const [idade, setIdade] = useState<string>();
    const [genero, setGenero] = useState<string>();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!peso)
    }
    function handleInputFocus() {
        setIsFocused(true);
    }

    async function handleSubimit() {
        if (!peso || !altura || !idade || !genero) {
            return Alert.alert('Infome todos os dados!')
        }

        try {
            await AsyncStorage.setItem('@plantmanager:peso', peso);
            await AsyncStorage.setItem('@plantmanager:altura', altura);
            await AsyncStorage.setItem('@plantmanager:idade', idade);
            await AsyncStorage.setItem('@plantmanager:genero', genero);
            navigation.navigate("Confirmation", {
                title: 'Protinho',
                subtitle: 'Agora vamos começar seu acompanhamento de forma rápida e prática.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch (error) {
            Alert.alert('Não foi possível salvar seus dados')
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.title}>
                                    Agora nos diga
                                </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu peso(kg)"
                                placeholderTextColor="#FFF"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(evt) => setPeso(evt)}

                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite sua altura(cm)"
                                placeholderTextColor="#FFF"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(evt) => setAltura(evt)}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite sua idade"
                                placeholderTextColor="#FFF"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(evt) => setIdade(evt)}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu gênero"
                                placeholderTextColor="#FFF"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(evt) => setGenero(evt)}
                            />
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubimit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#000"
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 52,
        alignItems: 'center',
        width: '100%'
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    },
})