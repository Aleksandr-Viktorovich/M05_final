export const getStorage = (name) => (localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : []);

export const setStorage = (name, data) => localStorage.setItem(name, JSON.stringify(data));

export const removeItemStorage = (name, itemId) => {
  const data = getStorage(name);
  const newData = data.filter(item => item.id !== itemId);
  setStorage(name, newData);
};

export const successItemStorage = (name, itemId) => {
  const data = getStorage(name);
  data.forEach(item => {
    if (item.id === itemId) {
      item.completed = !item.completed;
    }
  });
  setStorage(name, data);
};
