import { useNavigation } from "@react-navigation/core"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert,Image, StyleSheet } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { ip_address } from "../ipconfig";
import CryptoJS from 'crypto-js';
import { GetFCMToken } from "../notification_helper";




export default function LoginScreen(){



    const {navigate} = useNavigation()
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState(1);


    const sendData = async () =>{
       
        if(activeTab==2){

          if(password != '' && login != ''){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "login": CryptoJS.SHA256(login.toLowerCase()).toString(),
              "pass": CryptoJS.SHA256(password.toLowerCase()).toString()
            });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/createUser', requestOptions)
              .then(response => response.json())
              .then(async result => {
                console.log(CryptoJS.SHA256(login.toLowerCase()).toString())})
              .catch(error => console.log('error', error));
              Alert.alert('Вы успешно зарегистрировались!', '', [
                {
                  text: 'Отлично!',
                  onPress: () => {setActiveTab(1)},
                }
              ]);
    
            }
            else{
              Alert.alert('Ошибка!', '', [
                {
                  text: 'Проверьте данные!',
                 
                }
              ]);
            }
           
        }
        else{
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "login": CryptoJS.SHA256(login.toLowerCase()).toString(),
          "password": CryptoJS.SHA256(password.toLowerCase()).toString()
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(ip_address+'/getUser', requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result[0].id)
            global.user_id = result[0].id
            if(result != "Данные не совпадают! Проверьте и повторите попытку") {
                navigate('Главный экран')
                GetFCMToken()
            }
            else {

                
                 Alert.alert('Авторизация',
                    result ,[
                    {
                      text: 'ОК'
                    }
                   ])  
            }
          
        })
          .catch(error => console.log('error', error));
        }
        
    } 
     

    return (
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 1 && styles.activeTab]} 
            onPress={() => setActiveTab(1)}>
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Вход</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 2 && styles.activeTab]} 
            onPress={() => setActiveTab(2)}>
            <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>Регистрация</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.form}>
          <Text style={styles.title}>{activeTab === 1 ? 'Вход' : 'Регистрация'}</Text>
  
          <TextInput 
            style={styles.input} 
            placeholder="Логин" 
            value={login} 
            onChangeText={setLogin} />
  
          <TextInput 
            style={styles.input} 
            placeholder="Пароль" 
            secureTextEntry={true} 
            value={password} 
            onChangeText={setPassword} />
  
          <TouchableOpacity style={styles.button} onPress={sendData}>
            <Text style={styles.buttonText}>
              {activeTab === 1 ? 'Войти' : 'Зарегистрироваться'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#F5F5DC', // Светло-бежевый фон
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 30,
    },
    tab: {
      width: widthPercentageToDP(40),
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: '#A8D5BA', // Пастельный зелёный для табов
    },
    activeTab: {
      backgroundColor: '#F7C8D0', // Пастельный розовый для активной вкладки
    },
    tabText: {
      fontSize: 16,
      color: '#4A4A4A', // Тёмно-серый текст
    },
    activeTabText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    form: {
      paddingHorizontal: 20,
      paddingVertical: 40,
      backgroundColor: '#FFF',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: '#4A4A4A',
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: '#FFF',
    },
    button: {
      backgroundColor: '#A8D5BA', // Пастельный зелёный для кнопок
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  