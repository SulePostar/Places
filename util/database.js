import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  db.transaction(tx => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );`,
      [], 
      () => { },
      (_, err) => { console.log(err); }
    );
  });
  return true;
};

export const insertPlace = (place) => {
  db.transaction(tx => {
    tx.executeSql(`INSERT INTO places (title, imageUrl, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
    [place.title, place.imageUrl, place.address, place.location.lat, place.location.lng], 
      (_, result) => { console.log(result) },
      (_, err) => { console.log(err); }
    );
  });
  return true;
}

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM places;`,
      [], 
        (_, result) => { resolve(result);  },
        (_, err) => { reject(err); }
      );
    });  
  });
  return promise;
}

export const fetchPlaceDetails = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM places WHERE id=${id};`,
      [], 
        (_, result) => { resolve(result);  },
        (_, err) => { reject(err); }
      );
    });  
  });
  return promise;
}

export const removePlace = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`DELETE FROM places WHERE id=${id};`,
      [], 
        (_, result) => { resolve(result);  },
        (_, err) => { reject(err); }
      );
    });  
  });
  return promise;
}
