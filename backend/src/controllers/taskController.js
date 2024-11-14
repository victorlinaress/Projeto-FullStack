const tasksModel = require('../models/tasksModels');

const getAll = async (_request, response) => {
    const tasks = await tasksModel.getAll();
    return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
    // Chame a função createTask do modelo e armazene o resultado na variável `createdTask`
    const createdTask = await tasksModel.createTask(request.body);
    
    // Retorne a tarefa criada com status 201
    return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;  // Extrai 'id' dos parâmetros da requisição

  await tasksModel.deleteTask(id); // Aguarda a exclusão da tarefa
  return response.status(204).json(); // Retorna status 204 (sem conteúdo)
}

const updateTask = async (request,response) => {
  const { id } = request.params; 
  await tasksModel.updateTask(id, request.body); 
  return response.status(204).json(); 
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};
