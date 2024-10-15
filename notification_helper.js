import messaging from '@react-native-firebase/messaging'
import { ip_address } from './ipconfig';





export async function requestUserPermission(){
    
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      GetFCMToken();
    }
  }

 export async function GetFCMToken(){

    const sendToken=(token)=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "user": global.user_id,
          "token": token
        });
    
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(ip_address + '/setUserToken', requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result)})
          .catch(error => console.log('error', error));
          
    
    }
    
        try{
            const fcmtoken = await messaging().getToken();
            if(fcmtoken){
              console.log('fcmtoken',fcmtoken)
                           sendToken(fcmtoken)
            }
            
        } catch (error) {
            console.log(error)
        }
    
  }

  export const NotificationListener=()=>{

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log("notification caused app to open", remoteMessage.notification,)

    })

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        if (remoteMessage) {
            console.log("notification caused app to open from  quit", 
            remoteMessage.notification,
            )

        }
    })
    
    messaging()
    .onMessage( async remoteMessage =>{
        console.log("notification on foreground", remoteMessage)
    }
    )
    messaging().setBackgroundMessageHandler(async remoteMessage =>{
      console.log("notification on background", remoteMessage)
    })

  }