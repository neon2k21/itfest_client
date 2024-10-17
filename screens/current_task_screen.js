import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ip_address } from '../ipconfig';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';  // для удобной работы с датами



const TaskDetailScreen = () => {


  const navigation = useNavigation();
  const route = useRoute();
  const { task } = route.params;

  console.log(task.name)

  const setTaskCompleted = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "task_id": task.id,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(ip_address + '/updateTaskStage', requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result) })
      .catch(error => console.log('error', error));
  }

  const markAsCompleted = () => {
    setTaskCompleted();
    navigation.goBack();
    console.log('Задача выполнена');
  };

  const addToCalendar = () => {
    const startDate = moment(task.date_of_creation, 'YYYY-MM-DD HH:mm:ss').toISOString();

    // Преобразуем deadline из формата 'dd/mm/yy hh:mm:ss' в ISO 8601
    const endDate = moment(task.deadline, 'DD/MM/YY HH:mm:ss').toISOString();

    

    const eventConfig = {
      title: task.name,
      startDate,
      endDate,
      notes: task.description,
      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'black',
      },
    };
  
    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(eventInfo => {
        if (eventInfo.action === 'CANCELED') {
          console.log('Пользователь отменил создание события');
        } else {
          console.log('Событие добавлено с ID:', eventInfo.eventIdentifier);
        }
      })
      .catch(error => console.log('Ошибка при добавлении задачи в календарь:', error));
  };

  if(task.completed === 1){ return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.name}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.info}>Дата создания: {task.date_of_creation}</Text>
      <Text style={styles.info}>Дедлайн: {task.deadline}</Text>
      <Text style={styles.info}>Статус: {task.completed ? 'Выполнено' : 'Не выполнено'}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>

      </View>
    </View>
  );}
  else{
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.info}>Дата создания: {task.date_of_creation}</Text>
        <Text style={styles.info}>Дедлайн: {task.deadline}</Text>
        <Text style={styles.info}>Статус: {task.completed ? 'Выполнено' : 'Не выполнено'}</Text>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Назад</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button} onPress={markAsCompleted}>
            <Text style={styles.buttonText}>Отметить выполненным</Text>
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity style={styles.addCalendarButton} onPress={addToCalendar}>
          <Text style={styles.buttonText}>Добавить в календарь</Text>
        </TouchableOpacity>
      </View>
    );
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  addCalendarButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20, // Чтобы добавить отступ сверху
  },
});

export default TaskDetailScreen;
