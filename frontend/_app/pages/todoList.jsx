import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TodoList = ({ todoItems }) => (
  <View>
    {todoItems.map((todoItem, index) => (
      <Text key={index}>
        {todoItem.title} {todoItem.isComplete ? '(Completed: TRUE)' : '(Completed: FALSE)'}
      </Text>
    ))}
  </View>
);


const todoDataURL = 'http://127.0.0.1:3000/todos'
const TodoHomepage = () => {
  // Fetch Data -------------
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  
  // const getTodoList = async () => {
  //   try {
  //     const response = await fetch(todoDataURL)
  //     const json = await response.json().then((json)=>json)
  //     setData(json)
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  useEffect(() => {
    fetch(todoDataURL)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error)=> Alert(error))
      .finally(setLoading(false))
  }, [])
  // ^ Fetch Data -------------


  const [todoTitle, onChangeTitle] = useState('');
  const [isComplete, setIsComplete] = useState(false)
  // Handle Add Todo Items ----------------
  const [todoItems, setTodoItems] = useState([]);
  const handleAddTodoItem = () => {
    if (todoTitle.trim()) {
      const todoItem = {
        title: todoTitle,
        isComplete: isComplete
      }
      console.log(todoItem)

      setTodoItems((todoList) => [...todoList, todoItem]);
      onChangeTitle('')
      setIsComplete(false);
    }
  };
  // ^ Handle Add Todo Items ----------------
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={todoTitle}
          placeholder="Enter task Title"
        />
        <Button
          style={styles.button}
          title="Save task"
          onPress={handleAddTodoItem}
        />
        <TodoList todoItems={todoItems} />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Text>
                {item.title}, {item.releaseYear}
              </Text>
            )}
            nestedScrollEnabled={true}
          />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBlockEnd: 12,
  },
  input: {
    minWidth: `${100}%`,
    display: 'flex',
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
  },
});


export default TodoHomepage;