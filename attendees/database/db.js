import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'UserDatabase.db'});

let table = 'student';

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS + ${table}+ (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
        [],
        () => {
          resolve();
        },
        //if error, reject(error)
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const addStudent = name => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO ' + table + '(name) VALUES(?,?);',
        [name],

        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateStudent = name => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE ' + table + 'set name=? WHERE id=?',
        [name, id],

        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const deleteStudent = name => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM' + table + 'WHERE id=?;',
        [],

        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
