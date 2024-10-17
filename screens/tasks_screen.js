import { useFocusEffect } from '@react-navigation/core';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import Taks_Card from '../components/task_card';
import { ip_address } from '../ipconfig';
import { AntDesign } from '@expo/vector-icons'; // Иконка для кнопки
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Tasks_Screen() {
  const navigation = useNavigation(); 
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  const getAllTasks = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": global.user_id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(ip_address + '/getAllUserTasks', requestOptions)
      .then(response => response.json())
      .then(result => { setData(result) })
      .catch(error => console.log('error', error));
  }

  const handleDeleteTask = async (taskId) => {
    Alert.alert(
      'Удалить задачу',
      'Вы уверены, что хотите удалить эту задачу?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: async () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "task_id": taskId,
            });

            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(ip_address + '/deleteTask', requestOptions)
              .then(response => response.json())
              .then(result => { console.log(result) })
              .catch(error => console.log('error', error));

            // Обновляем список задач после удаления
            setData(prevTasks => prevTasks.filter(task => task.id !== taskId));
          },
        },
      ]
    );
  };

  const renderRightActions = (taskId) => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(taskId)}>
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  useFocusEffect(() => {
    getAllTasks();
  });

  const handleTaskPress = (task) => {
    navigation.navigate('Задача', { task });
  };

  // Фильтрация задач по названию
  const filteredData = data.filter(task => task.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Поле для ввода поискового запроса */}
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск задач..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} // Обновляем состояние при изменении текста
        />

        <FlatList
          data={filteredData}
          extraData={filteredData}
          keyExtractor={item => item.id}
          className="w-full h-full"
          contentContainerStyle={{ alignContent: 'center' }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { handleTaskPress(item) }}>
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <Taks_Card
                  name={item.name}
                  description={item.description}
                  created_date={item.date_of_creation}
                  deadline={item.deadline}
                  isCompleted={item.completed === 1} />
              </Swipeable>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={styles.fab} onPress={() => { navigation.navigate('СоздатьЗадачу') }}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3F0F0', // Светлый пастельный бирюзовый фон
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F0F0', // Светлый фон
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20, // Отступ от поля поиска до списка
    backgroundColor: '#fff',
  },
  deleteButton: {
    padding: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: '#FF6B6B', // Пастельный красный для кнопки удаления
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#A8D5BA', // Пастельный зелёный для кнопки добавления задачи
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
