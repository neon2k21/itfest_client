
import { useEffect } from "react";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./navigation/navigation";
import {PermissionsAndroid} from 'react-native';
import { firebaseConfig } from "./firebase_config";
import { firebase } from "@react-native-firebase/messaging";
import { NotificationListener, requestUserPermission } from "./notification_helper";
import RNCalendarEvents from 'react-native-calendar-events';


firebase.initializeApp(firebaseConfig)


export default function App() {
 PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


useEffect(()=>{
     requestUserPermission()
     NotificationListener()
     
 },[])

  
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
       <AppNavigation/>
    </GestureHandlerRootView>
   
  );
}