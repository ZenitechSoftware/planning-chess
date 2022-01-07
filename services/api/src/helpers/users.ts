
// interface User {
//     id: string;
//     name: string;
// }

// const users: User = [{ id, name }];

// const addUser = (config: User): { id: string, name: string } => {
//   name = config.name.trim().toLowerCase();

//   const existingUser = users.find((user) => user.name === name);

//   if (!name) return { error: 'Username and room are required.' };
//   if (existingUser) return { error: 'Username is taken.' };

//   const user = { id, name };

//   users.push(user);

//   return { user };
// };

// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);

//   if (index !== -1) return users.splice(index, 1)[0];
// };

// const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// module.exports = { addUser, removeUser, getUser, getUsersInRoom };
