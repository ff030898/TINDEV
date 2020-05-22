import React, { useState, useEffect } from 'react';
import AsyncStored from '@react-native-community/async-storage';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    //quando as variavies mudarem ele executa essa função
    useEffect(() => {

        AsyncStored.getItem('user').then(user => {

            if (user) {
                navigation.navigate('Main', { user });
            }
        })

    }, []);

    async function handleLogin() {

        const response = await api.post('/devs', { username: user })

        const { _id } = response.data;

        await AsyncStored.setItem('user', _id);

        console.log("teste");

        navigation.navigate('Main', { user: _id });
    }

    return (

        <View style={styles.container}>
            <Image source={logo} />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário no GitHub"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>
                    Enviar
             </Text>
            </TouchableOpacity>
        </View>

    );
}

//auto capitalize é para abrir teclado sem a primeira letra ser maiuscula
//criar estilização

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        //ocupar toda a largura possível
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16
    }
});