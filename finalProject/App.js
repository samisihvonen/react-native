import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
} from 'react-native';
import ListItem from './components/ListItem';
import {init, getAllUsers, addUser, deleteUser, dropTable} from './database/db';

import styles from './styles';

export default function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
  });
  const {name, contact, email} = user;
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [displayerVisible, setDisplayerVisible] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    init();
    getUsers();
  }, [setUsers]);

  async function getUsers() {
    try {
      const result = await getAllUsers(users);
      // console.log('result', result);
      setUsers(result);
      console.log('setUsers', result);
    } catch (err) {
      setError(err);
      console.log('error', err);
    }
  }

  const addUserToList = async () => {
    try {
      if ((user.name = '')) {
        setError('Name is required');
      } else if ((user.email = '')) {
        setError('Email is required');
      } else if ((user.contact = '')) {
        setError('Contact is required');
      } else {
        await addUser(name, email, contact);
        getUsers();
      }
      console.log('User added successfully');
    } catch (e) {
      setError(`An error occurred while saving the user ${e.message}`);
    }
  };
  const deleteItem = ({item, index}) => {
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
  };

  const deleteUserById = async ({index, item}) => {
    try {
      const newList = [...user];
      newList = newList.filter((it, i) => {
        if (i != index) {
          return true;
        } else {
          return false;
        }
      });
      console.log(newList, 'newList');
      // await deleteUser(newList);
      // setUsers(newList);
    } catch (e) {
      console.log('Users not deleted successfully', e.message);
    }
  };

  const updateList = async (id, type) => {
    users[selectedId] = {id: id, type: type};
    setUsers(users);
    console.log('Update listitem', users);
    deleteUserById(id);
  };
  const dropTables = async () => {
    try {
      await dropTable();
    } catch (e) {
      console.log('Users not deleted successfully', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add attedees to list</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={name}
          placeholder="Add name"
          onChangeText={value => setUser({...user, name: value})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          value={email}
          onChangeText={value => setUser({...user, email: value})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Contact"
          value={contact}
          onChangeText={value => setUser({...user, contact: value})}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Save" onPress={addUserToList} />
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => (
          <ListItem
            item={item}
            index={index}
            handLeft={() => setUser({...user})}
            handRight={() => deleteUserById(item.index)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={(item, index) => index.toString()}>
        extraData={selectedId}
      </FlatList>
    </View>
  );
}

const Separator = () => <View style={styles.border}></View>;
