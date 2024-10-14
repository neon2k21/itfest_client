import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/login_screen';
import Tasks_Screen from '../screens/tasks_screen';
import Tasks_Dashboard from '../screens/tasks_dashboard';
import TaskDetailScreen from '../screens/current_task_screen';
import CreateTaskScreen from '../screens/create_task_screen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Login_Stack = createNativeStackNavigator()
const MainScreen_Stack = createNativeStackNavigator()
const Task_Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


function Task_StackNavigator(){
  return(
    <Task_Stack.Navigator>
      <Task_Stack.Screen name="уу" options={{headerShown: false}} component={Tasks_Screen} />
      <Task_Stack.Screen name="Задача" options={{headerShown: false}} component={TaskDetailScreen}/>
      <Task_Stack.Screen name="СоздатьЗадачу" options={{headerShown: false}} component={CreateTaskScreen}/>
    </Task_Stack.Navigator>
  )

}




function Main_StackNavigator(){
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Задачи') {
            iconName = focused ? 'list-circle' : 'list-circle-outline'; // Иконка для списка задач
          } else if (route.name === 'Дашбоард') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline'; // Иконка для диаграмм
          }

          // Возвращаем компонент Ionicons с указанной иконкой
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >

      <Tab.Screen name="Задачи" options={{headerShown: false}} component={Task_StackNavigator} />
      <Tab.Screen name="Дашбоард" options={{headerShown: false}} component={Tasks_Dashboard}/>
    </Tab.Navigator>
  )
}




function Login_StackNavigator(){
    return(
    <Login_Stack.Navigator>
      <Login_Stack.Screen name="Авторизация" options={{headerShown: false}} component={LoginScreen} />
      <Login_Stack.Screen name="Главный экран" options={{headerShown: false}} component={Main_StackNavigator}/>
    </Login_Stack.Navigator>
  )
}


export default function AppNavigation(){
    return(
        <NavigationContainer>
           <Login_StackNavigator/>
        </NavigationContainer>
    )
}