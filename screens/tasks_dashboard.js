import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ip_address } from '../ipconfig';
import { useFocusEffect } from '@react-navigation/core';
 let dayData = { completed: 0, uncompleted: 0 }
    let weekData = { completed: 0, uncompleted: 0 }
    let monthData = { completed: 0, uncompleted: 0 }


    const Tasks_Dashboard = () => {

   
    const [tasks, setTasks] = useState([])

    const getAllDayTasks = () => {
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

        fetch(ip_address + '/createGraphByFilterForDay', requestOptions)
            .then(response => response.json())
            .then(result => { console.log(result); dayData = result })
            .catch(error => console.log('error', error));
    }

    const getAllWeekTasks = () => {
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

        fetch(ip_address + '/createGraphByFilterForWeek', requestOptions)
            .then(response => response.json())
            .then(result => {  weekData = result })
            .catch(error => console.log('error', error));
    }

    const getAllMonthTasks = () => {
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

        fetch(ip_address + '/createGraphByFilterForMonth', requestOptions)
            .then(response => response.json())
            .then(result => { console.log(result); monthData = result })
            .catch(error => console.log('error', error));
    }

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
            .then(result => { setTasks(result) })
            .catch(error => console.log('error', error));
    }

    useFocusEffect(() => {
        getAllDayTasks()
        getAllWeekTasks()
        getAllMonthTasks()
        getAllTasks()
    })

    // Данные для диаграмм
    const chartConfig = {
        backgroundColor: '#F8F0E3',
        backgroundGradientFrom: '#F8F0E3',
        backgroundGradientTo: '#F8F0E3',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(85, 107, 47, ${opacity})`, // Пастельный зеленый цвет для диаграмм
        style: {
            borderRadius: 16,
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Статистика задач</Text>

            {/* Диаграммы */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartContainer}>
                <View style={styles.chartWrapper}>
                    <Text style={styles.chartLabel}>За день</Text>
                    <BarChart
                        data={{
                            labels: ['Да', 'Нет'],
                            datasets: [{ data: [dayData.completed, dayData.uncompleted] }],
                        }}
                        width={200}
                        height={200}
                        chartConfig={chartConfig}
                    />
                </View>
                <View style={styles.chartWrapper}>
                    <Text style={styles.chartLabel}>За неделю</Text>
                    <BarChart
                        data={{
                            labels: ['Да', 'Нет'],
                            datasets: [{ data: [weekData.completed, weekData.uncompleted] }],
                        }}
                        width={200}
                        height={200}
                        chartConfig={chartConfig}
                    />
                </View>
                <View style={styles.chartWrapper}>
                    <Text style={styles.chartLabel}>За месяц</Text>
                    <BarChart
                        data={{
                            labels: ['Да', 'Нет'],
                            datasets: [{ data: [monthData.completed, monthData.uncompleted] }],
                        }}
                        width={200}
                        height={200}
                        chartConfig={chartConfig}
                    />
                </View>
            </ScrollView>

            {/* Список задач */}
            <Text style={styles.listTitle}>Все задачи:</Text>
            <ScrollView style={styles.taskList}>
                {tasks.map((task, index) => (
                    <View key={index} style={styles.taskCard}>
                        <Text style={styles.taskText}>{task.name}</Text>
                        <Text style={styles.taskText}>{task.description}</Text>
                        <Text style={styles.taskText}>
                            {task.completed ? 'Статус: Выполнена' : 'Статус: Не выполнена'}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FAF3E0', // Пастельный мягкий фон
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4F6D7A', // Пастельный темный оттенок для заголовка
        marginBottom: 10,
    },
    chartContainer: {
        height: 0, // Установите высоту ScrollView по размеру диаграмм
        marginBottom: 0, // Уменьшите отступ между диаграммами и списком задач
    },
    chartWrapper: {
        marginRight: 10,
        alignItems: 'center',
    },
    chartLabel: {
        fontSize: 18,
        color: '#7C98B3', // Пастельный светло-синий для подписи диаграммы
        marginBottom: 5,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4F6D7A', // Тема заголовка списка задач
        marginBottom: 5,
    },
    taskList: {
        flex: 1, // Убедитесь, что список занимает оставшееся место
    },
    taskCard: {
        borderWidth: 1,
        borderColor: '#D3D3D3', // Светло-серый контур карточки задачи
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#F8F0E3', // Мягкий фон карточек
    },
    taskText: {
        fontSize: 16,
        color: '#4F6D7A', // Пастельный темный оттенок для текста задач
    },
});

export default Tasks_Dashboard;
