const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(); // Captura a data atual
    const query = 'INSERT INTO tasks(title, status, create_at) VALUES (?, ?, ?)'; // Certifique-se de que 'create_at' está correto

    const [result] = await connection.execute(query, [title, 'pendente', dateUTC]);

    // Retorna o ID da nova tarefa criada
    return { insertId: result.insertId }; // Usando result para acessar insertId corretamente
};

const deleteTask = async (id) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id =?', [id]);
    return removedTask

};

const updateTask = async (id, task) => {
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    const { title, status } = task;
  const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};


module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};
