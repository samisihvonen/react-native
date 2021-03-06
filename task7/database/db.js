import SQlite from 'react-native-sqlite-storage';

var db = SQlite.openDatabase(
  {name: 'boot.db', location: 'default'},
  () => {
    console.log('Boot.db opened successfully');
  },
  err => {
    console.log('database error:', err);
  },
);

var tableName = 'boot';

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // tx.executeSql(
      //   `DROP TABLE
      //     ${tableName};`,
      //   [],
      // );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS 
          ${tableName}
          (id INTEGER PRIMARY KEY, type VARCHAR(255), size INTEGER(255));`,
        [], //second parameters of execution:empty square brackets - this parameter is not needed when creating table
        //If the transaction succeeds, this is called
        () => {
          resolve(); //There is no need to return anything
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export async function addBoot(type, size) {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        `INSERT INTO ${tableName} (type,size) VALUES(?,?);`,
        //And the values come here
        [type, size],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
          console.log('add boot transaction error: ' + err.message);
        },
      );
    });
  });
  return promise;
}

export async function updateBoot(id, type, size) {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        `UPDATE ${tableName} SET type=? size=? WHERE id=?;`,
        //And the values come here
        [type, size, id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
}
export async function deleteBoot(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        `DELETE FROM ${tableName} WHERE id=?;`,
        [id],
        () => {
          resolve();
        },
        //If the transaction succeeds, this is called
        (_, err) => {
          reject(err);
        },
      );
      console.log('deleteBoot called', id);
    });
  });
  return promise;
}

export const fetchAllBoots = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we select all from the table fish
      tx.executeSql(
        `SELECT * FROM ${tableName};`,
        [],
        (tx, result) => {
          let items = []; //Create a new empty Javascript array
          //And add all the items of the result (database rows/records) into that array
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));

            console.log(result.rows.item(i));
          }

          resolve(items); //The data the Promise will have when returned
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export async function dropTable() {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'DROP TABLE ' + tableName + ';',
        //And the values come here
        [],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
}
