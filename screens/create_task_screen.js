import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { ip_address } from '../ipconfig';

const CreateTaskScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const createTask = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "user_id": global.user_id,
      "name": name,
      "description": description,
      "deadline": deadline, 
      "category_id": 0
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch(ip_address + '/createTask', requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result) })
      .catch(error => console.log('error', error));
  };

  const handleSaveTask = () => {
    const isValidDate = moment(deadline, 'DD/MM/YY HH:mm', true).isValid();

    if (!isValidDate) {
      Alert.alert('Ошибка', 'Введите дату в формате dd/mm/yy hh:mm');
      return;
    }

    const deadlineDate = moment(deadline, 'DD/MM/YY HH:mm');

    if (deadlineDate.isBefore(moment())) {
      Alert.alert('Ошибка', 'Дата не может быть меньше текущей');
      return;
    }

    const [hours, minutes] = deadline.split(' ')[1].split(':');
    if (parseInt(hours) >= 24) {
      Alert.alert('Ошибка', 'Часы не могут быть больше или равны 24');
      return;
    }
    if (parseInt(minutes) >= 60) {
      Alert.alert('Ошибка', 'Минуты не могут быть больше или равны 60');
      return;
    }

    console.log('Создать задачу:', { name, description, deadline });
    createTask();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Название задачи</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите название"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#A9A9A9"
      />

      <Text style={styles.label}>Описание задачи</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите описание"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#A9A9A9"
      />

      <Text style={styles.label}>Дедлайн (dd/mm/yy hh:mm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите дату"
        value={deadline}
        onChangeText={setDeadline}
        placeholderTextColor="#A9A9A9"
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
        <Text style={styles.buttonText}>Создать задачу</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF3E0', // Пастельный мягкий фон
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F6D7A', // Спокойный темно-синий цвет для текста
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3', // Светло-серый цвет границ ввода
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#F8F0E3', // Пастельный фон для полей ввода
    color: '#4F6D7A', // Тема текста ввода
  },
  button: {
    backgroundColor: '#7C98B3', // Пастельный синий цвет кнопки
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateTaskScreen;
