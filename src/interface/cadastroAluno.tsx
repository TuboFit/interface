import React from "react";
import { KeyboardAvoidingView, 
  View,
  Image, 
  TextInput, 
  Text, 
  StyleSheet, 
} from 'react-native'
import { Button } from "../components/Button";

export function cadastroProf(){
  return(
    <KeyboardAvoidingView style={styles.background}>

    <View >
    <TextInput style={styles.input}
      placeholder="ID"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Nome"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="CPF"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Peso"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Altura"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Genero"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Logradouro"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Numero"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Bairro"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Cidade"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="UF"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="E-mail"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Telefone"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Senha"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Idade"
      autoCorrect={false}
      />

      <Button>
        <Text>Enviar</Text>
      </Button>
      <Button>
        <Text>Cancelar</Text>
      </Button>

    </View>
  </KeyboardAvoidingView>

  )
}
const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  input:{
    backgroundColor: '#ffff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
})