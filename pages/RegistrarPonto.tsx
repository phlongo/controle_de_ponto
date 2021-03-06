import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ponto, iModalProps } from '../types';
import { NavigationContainer } from '@react-navigation/native';
import Firebase from '../firebase';
import { collection, onSnapshot, addDoc, setDoc, query, where, orderBy, limit, doc} from "firebase/firestore";
import db from '../firebase';
import { async } from '@firebase/util';


export default function App ({navigation}: any) {
  let logoUri = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 841.9 595.3'><g fill='#61DAFB'><path d='M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z' /><circle cx='420.9' cy='296.5' r='45.7' /><path d='M520.5 78.1z' /></g></svg>`;

  const [numLastIdPonto, updateIdPonto] = useState(1);
  const [lstPontos, updateLstPontos] = useState<Ponto[]>([]);

  
   // Por padr??o a primeira intera????o ?? entrada.
  const [blnEntradaSaida, setEntradaSaida] = useState(true);
  
  const [dtaClock, setDtaClock] = useState(new Date(Date.now()));

  useEffect(() => {
    let clockId = setInterval(() => setDtaClock(new Date(Date.now())), 1000)

    return () => {
      clearInterval(clockId);
    }
  }, []);
  const diadoponto = dtaClock.getUTCDate();
  const mesdoponto = dtaClock.getUTCMonth() + 1;
  const anodoponto = dtaClock.getFullYear();
  const [pontos, setPontos] = useState([]);
  
  //consulta para pegar os pontos do dia pelo firestore
  useEffect( ()=> {
    const collectionRef = (collection(db, "pontos"));
    const q= query(collectionRef, where("dia", "==", diadoponto ), where("mes","==", mesdoponto), where("ano","==", anodoponto), orderBy("entrada_saida", "desc"));
    //const q = query(collectionRef,  orderBy("mes", "desc"), where("mes", "==", 5));

  const unsub = onSnapshot(q, (snapshot) => 
    setPontos(snapshot.docs.map(doc => doc.data()))
  );
  return unsub;
    },[]);

  function GetLiveClock() {
    console.log('setInterval: ' + dtaClock);
    return (<Text style={styles.text}>{dtaClock.getUTCDate()}/{dtaClock.getUTCMonth() + 1}/{dtaClock.getFullYear()} - {dtaClock.getHours()}:{dtaClock.getMinutes()}:{dtaClock.getSeconds()}</Text>);
  }

  function LinkComponent(pLink: string) {
    return (
      <Text
        accessibilityRole="link"
        style={StyleSheet.compose(styles.link, styles.link)}
      >
        { pLink }
      </Text>
    );
  }
  
  function ListarPonto({lstPonto}: iModalProps) {
    console.log(lstPonto);
  
    return (
      <View>
        {
          lstPonto.map((e:Ponto) => (
            <Text key={e.id}>{e.tipo} - {e.datahora.toString()}</Text>
          ))        
        }
      </View>
    );
  }

  const handleNew = async () => {
    const hora = dtaClock.getHours();
    const minutos = dtaClock.getMinutes();
    const segundos = dtaClock.getSeconds();
    const entrada_saida = dtaClock;
    //const ultimoponto = setUltimoPonto;
    const dia = dtaClock.getUTCDate();
    const mes = dtaClock.getUTCMonth() + 1;
    const ano = dtaClock.getFullYear();

    const collectionRef = collection(db, "pontos");
    const payload = {hora, minutos, segundos,dia, mes, ano, entrada_saida};
    await addDoc(collectionRef, payload);
}
 

  //consulta para retornar o ultimo dado do dia
 // const [ultimoponto, setUltimoPonto] = useState({pontovalor: 'banana'});

  //useEffect( ()=> {
  //  const collectionRef = (collection(db, "pontos"));
  //  const w= query(collectionRef, where("dia", "==", diadoponto ), where("mes","==", mesdoponto), where("ano","==", anodoponto), orderBy("entrada_saida", "desc"), limit(1));
    //const q = query(collectionRef,  orderBy("mes", "desc"), where("mes", "==", 5));

  //const unsub2 = onSnapshot(w, (snapshot) => 
  //  setUltimoPonto(snapshot.docs.map(doc => doc.data()))
  //);
  //return unsub2;
  //  },[]);
  

  
  //function RegistrarEntrada_Saida() {
  //  onSnapshot.docs.map() => {
  //    if (ultimoponto.valordeentradaesaida == "Entrada") {
  //      const pontovalorf = "Saida";
  //      return pontovalorf;
  //   } else if(ultimoponto.valordeentradaesaida == "Saida"){
  //     const pontovalorf = "Entrada";
  //     return pontovalorf;
  //   } else if (ultimoponto.valordeentradaesaida = false){
  //       const pontovalorf = "Entrada";
  //       return pontovalorf;
  //   }
  //  }
    
  //  return setUltimoPonto;
  //  }
  

  function RegistrarPonto() {
    console.log("Salvando ponto!");
    if (blnEntradaSaida) {
      lstPontos.push({ id: numLastIdPonto, tipo: "Entrada", datahora: dtaClock });
      console.log("Entrada: " + dtaClock.getUTCDate()+'/'+dtaClock.getUTCMonth()+'/'+dtaClock.getFullYear()+'-'+dtaClock.getHours()+':'+dtaClock.getMinutes()+':'+dtaClock.getSeconds());
      setEntradaSaida(false); // Proxima intera????o ser?? de sa??da.
    } else {
      lstPontos.push({ id: numLastIdPonto, tipo: "Sa??da", datahora: dtaClock });
      console.log("Saida: " + + dtaClock.getUTCDate()+'/'+dtaClock.getUTCMonth()+'/'+dtaClock.getFullYear()+'-'+dtaClock.getHours()+':'+dtaClock.getMinutes()+':'+dtaClock.getSeconds());
      setEntradaSaida(true); // Proxima intera????o ser?? de entrada.
    }
    updateIdPonto(numLastIdPonto+1);
    updateLstPontos(lstPontos);

   
  }
  function Callfunction() {
    RegistrarPonto();
    //RegistrarEntrada_Saida();
    handleNew();
  }
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={ () => navigation.navigate('Configuracao')}
            style={styles.botton}
          >
            <Text style={styles.buttonText}>Historico de Ponto</Text>
          </TouchableOpacity>
         
        </View>
        <View style={styles.header}>
          <Image
            accessibilityLabel="React logo"
            source={{ uri: logoUri }}
            resizeMode="contain"
            style={styles.logo}
          />
  
          <View style={styles.title}>
            <Text style={styles.text}>Marcar Ponto</Text>
  
            <Text>
             <GetLiveClock />
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={Callfunction}
              style={styles.botton}
            >
              <Text style={styles.buttonText}>Registrar ponto</Text>
          </TouchableOpacity>
        </View>
  
        <View>
          <Text style={styles.text}>Hist??rico</Text>
  
          <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <ListarPonto  lstPonto={lstPontos}/>
           
            </ScrollView>
          </View>
        </View>
        <ul>
        {pontos.map((pontos) => (
          <li>
           Data: {pontos.dia}/{pontos.mes}/{pontos.ano} | Hora: {pontos.hora}-{pontos.minutos}-{pontos.segundos}
          </li>

          
        ))}

        </ul>
      </View>
      
    );
      
}


const styles = StyleSheet.create({
  botton: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: '#C0C0C0',
    marginHorizontal: 20,
  },
  app: {
    marginHorizontal: 'auto',
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 1.5,
    marginVertical: 1,
    textAlign: 'center'
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  },
  link: {
    color: '#1B95E0'
  },
  code: {
    fontFamily: 'monospace, monospace'
  }
});
