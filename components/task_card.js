
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Taks_Card = ({ name, created_date, deadline, isCompleted }) => {
    return (
        <View style={[styles.card, isCompleted ? styles.completed : styles.incomplete]}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.date}>Создано: {created_date}</Text>
          <Text style={styles.date}>Дедлайн: {deadline}</Text>
          <Text style={isCompleted ? styles.completedText : styles.incompleteText}>
            {isCompleted ? 'Выполнено' : 'Не выполнено'}
          </Text>
        </View>
      );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  completed: {
    borderLeftWidth: 5,
    borderLeftColor: 'green',
  },
  incomplete: {
    borderLeftWidth: 5,
    borderLeftColor: 'red',
  },
  completedText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },
  incompleteText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Taks_Card;


// name = {item.name}
//       description={item.description}
//       created_date={item.date_of_creation} 
//       deadline={item.deadline} 
//       category={item.category} 
//       isCompleted ={item.completed === 1}/>