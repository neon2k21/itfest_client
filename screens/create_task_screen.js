import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { ip_address } from '../ipconfig';

const CreateTaskScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const createTask = () => {
    const formattedDeadline = moment(deadline).format('DD/MM/YY HH:mm:ss');
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": global.user_id,
      "name": name,
      "description": description,
      "deadline": formattedDeadline,
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
    const deadlineDate = moment(deadline);

    if (deadlineDate.isBefore(moment())) {
      Alert.alert('Ошибка', 'Дата не может быть меньше текущей');
      return;
    }

    console.log('Создать задачу:', { name, description, deadline });
    createTask();
    navigation.goBack();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    setDeadline(selectedDate); // Сохраняем выбранную дату
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

      <Text style={styles.label}>Дедлайн</Text>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={{ color: '#4F6D7A' }}>{moment(deadline).format('DD/MM/YY HH:mm:ss')}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime" // Указываем режим выбора даты и времени
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={true} // Устанавливаем 24-часовой формат времени
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
