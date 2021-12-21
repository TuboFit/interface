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
import { useAuth } from '../context/AuthContext';
import { Load } from '../components/Load';

export function UserIdentification() {
    const navigation = useNavigation();
    const { signIn, token } = useAuth()
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!email)
        setIsFilled(!!password)
    }
    function handleInputFocus() {

        setIsFocused(true);
    }

    async function handleSubimit() {
        if (!email || !password) {
            return Alert.alert('Digite o email e a senha 😥')
        }
        setLoading(true)
        try {
            await signIn({ email, password }).then(() => {
                setLoading(false)
                navigation.navigate("TreinoSelect" as never);
            }).catch(e => {
                setLoading(false)
            }).finally(() => setLoading(false))

        } catch (error) {
            console.log('error', error, 'retornou')
            Alert.alert('Não foi possível entrar 😥')
        }


    }
    if (loading) return <Load />
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
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄' : '😃'}
                                </Text>
                                <Text style={styles.title}>
                                    Informe
                                </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused && isFilled) && { borderColor: colors.orange },
                                ]}
                                placeholder="Digite o email"
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                placeholderTextColor="#FFF"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(e) => setEmail(e)}
                                autoCapitalize='none'

                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused && isFilled) && { borderColor: colors.orange },
                                ]}
                                placeholder="Digite a senha"
                                textContentType='password'
                                placeholderTextColor="#FFF"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(e) => setPassword(e)}
                                secureTextEntry={true}
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
        paddingHorizontal: 54,
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
        width: '40%',
        marginTop: 40,
        borderRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: colors.orange
    },
})