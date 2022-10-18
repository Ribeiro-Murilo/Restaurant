import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  selectedItem: 'id, name, description, price, offer ', // Primary key and indexed props
});
