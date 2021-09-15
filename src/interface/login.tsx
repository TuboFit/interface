
import React, {useState, useEffect} from "react";
import { KeyboardAvoidingView, 
  View,
  Image, 
  TextInput, 
  Text, 
  StyleSheet, 
  Animated
} from 'react-native'
import { Button } from "../components/Button";

export function cadastrarProfessor (){

  const[offset] = useState(new Animated.ValueXY({x: 0, y: 80}));

  //useEffect(()=>{Animated.spring(offset.y, {})}, []);

  return(
  <KeyboardAvoidingView style={styles.background}>
    <View style={styles.conteinerLogo}>
      <Image
      source={require('./assets/fit.png')}
      />
    </View>

    <Animated.View 
    style={[styles.conteiner,{
            transform: [{translateY: offset.y}
            ]}]}>

      <TextInput style={styles.input}
      placeholder="Email"
      autoCorrect={false}
      />
      <TextInput style={styles.input}
      placeholder="Senha"
      autoCorrect={false}
      />

      <Button>
        <Text>Entrar</Text>
      </Button>
      <Button>
        <Text>Cadastrar</Text>
      </Button>

    </Animated.View>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  conteinerLogo:{
    flex: 1,
    justifyContent: 'center'
  },
  conteiner:{
    flex: 1,
    alignItems: 'center',
    width: '90%',
    paddingBottom: 50,

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
//    btnSubmit:{
//    color: '#35AAFF',
//    width:'90%',
//    height: 45,
//    alingItems: 'center',
//    justifyContent:'center',
//    borderRadius: 7,
// },
//  btnRegister:{
//    marginTop: 10,
//  },
//// registerText:{
//  },
//  submitText:{
//   color:'yelow',
//   fontSize: 18
// }
});