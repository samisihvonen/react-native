/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [fish, setFish] = useState();
  const [list, addFish] = useState([]);

  const fishInputHandler = enteredFish => {
    setFish(enteredFish);
  };

  const addFishToList = () => {
    addFish(list => [...list, {fish: fish}]);
    setFish('');
  };

  const deleteItem = index => {
    addFish(list => {
      return list.filter((fish, id) => {
        return id != index;
      });
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onLongPress={() => deleteItem(index)}>
        <Text key={index} style={styles.itemStyle}>
          {index + 1}: {item.fish}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>
        React Native Input Components handling
      </Text>
      <View style={styles.formStyle}>
        <TextInput
          value={fish}
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={text => fishInputHandler(text)}
        />
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Cancel"
          style={styles.buttonStyle}
          onPress={() => setFish('')}
        />
        <Button
          title="Add Fish"
          style={styles.buttonStyle}
          onPress={addFishToList}
        />
      </View>
      <View style={styles.row}>
        <Text>Fish: {fish}</Text>
        <FlatList data={list} renderItem={renderItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemStyle: {
    backgroundColor: 'lightblue',
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 10,
    padding: 4,
    paddingLeft: 15,
  },
  headerStyle: {
    fontSize: 18,
    marginVertical: 12,
  },
  listStyle: {
    width: '80%',
    borderWidth: 2,
  },
  formStyle: {
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-around',
  },
  textInput: {
    backgroundColor: '#fdfdfd',
    borderColor: '#666',
    borderWidth: 2,
    width: '70%',
  },
  buttonStyle: {
    padding: 30,
  },
  row: {
    flexDirection: 'column',
    margin: 'auto',
    padding: 10,
    width: '70%',
  },
});

export default App;
