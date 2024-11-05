import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  View,
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

const TodoHomepage = () => {
  const [todoTitle, onChangeTitle] = useState('');
  const [isComplete, setIsComplete] = useState(false)

  const [todoItems, setTodoItems] = useState([]);

  const handleAddTask = () => {
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
          onPress={handleAddTask}
        />
        <TodoList todoItems={todoItems} />
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