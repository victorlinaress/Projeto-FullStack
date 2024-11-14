const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-task");

const fetchTasks = async () => {
  const response = await fetch("http://localhost:3333/tasks");
  const tasks = response.json();

  return tasks;
};

const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch("http://localhost:3333/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  loadTasks();
  inputTask.value = '';
};

const updateTask = async(id, title, created_at, status) => {
  

  await fetch(`http://localhost:3333/tasks/ ${id}`,
    {
      method: 'put',
      "Content-Type": { 'application/json'},
      body: {title, status}
    }
  );

  loadTasks();

}

const formatDate = (dateUTC) => {
  const date = new Date (dateUTC).toLocaleDateString();

}

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerText = innerText;
  }
  return element;
};

const createSelect = () => {
  const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluída">concluída</option>
  `;
  const select = createElement("select", "", options);
  select.value = value;
  return select;
};

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = document.createElement("tr");
  const tdTitle = createElement("td", title);
  const tdCreatedAt = createElement("td", created_at);
  const tdStatus = createElement("td");
  const tdActions = createElement("td");

  const select = createSelect(status);

  select.addEventListener('change', ({target}) => updateTask(...task, status: target.value))

  const editButton = createElement(
    "button",
    "",
    <span class="material-symbols-outlined">edit</span>
  );
  const deleteButton = createElement(
    "button",
    "",
    <span class="material-symbols-outlined">delete</span>
  );

  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;
  editForm.appendChild(editInput);



  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTask({ id, title: editInput.value, status });

    

    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });

  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();
  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });


};

addForm.addEventListener("submit", addTask);

loadTasks();
