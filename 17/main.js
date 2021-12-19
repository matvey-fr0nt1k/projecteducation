const loginInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#login');
const form = document.querySelector('form');
const loginError = document.querySelector('#loginErr');

let page = 1;

const handlerClickNext = () => {
  page += 1;
  prev.disabled = false;
}

const handlerClickPrev = () => {
  page -= 1;
  if (page === 1) {
    prev.disabled = true;
  }
}

const handlerClick = () => {
  const userList = document.querySelector('ul');
  const pageCounter = document.querySelector('span');

  userList.innerHTML = '';
  pageCounter.innerHTML = `page ${page}`;

  fetchPage(userList, page);
}

const handlerSaveUpdate = (e) => {
  const id = e.target.id.split('-')[1];
  const inputName = document.querySelector(`#name-${id}`).value;
  const inputEmail = document.querySelector(`#email-${id}`).value;
  e.target.disabled = true;
  const body = JSON.stringify({name: inputName, email: inputEmail});
  fetchUpdate(id, body);
  const item = document.getElementById(id);
  item.innerHTML = `id: ${id}; email: ${inputEmail}; name: ${inputName}`;
  item.appendChild(createUpdateButton(id));
  item.appendChild(createDeleteButton(id));
}

const handlerClickDeleteButton = (e) => {
  document.getElementById(e.target.id).remove();
  fetchDelete(e.target.id);
}

const handlerClickUpdateButton = (e) => {
  const id = e.target.id;
  const item = document.getElementById(id);

  item.innerHTML = `id: ${id}`;
  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'email';
  inputEmail.id = `email-${id}`
  const inputName = document.createElement('input');
  inputName.placeholder = 'name';
  inputName.id = `name-${id}`;
  const buttonSubmit = document.createElement('button');
  buttonSubmit.innerHTML = 'Сохранить';
  buttonSubmit.id = `update-${id}`;
  buttonSubmit.addEventListener('click', handlerSaveUpdate);

  item.appendChild(inputEmail);
  item.appendChild(inputName);
  item.appendChild(buttonSubmit);
}

const createButton = (id, text) => {
  const button = document.createElement('button');
  button.id = id;
  button.innerHTML = text;

  return button;
}

const createUpdateButton = (id) => {
  const button = document.createElement('button');
  button.id = id;
  button.innerHTML = 'Изменить';
  button.addEventListener('click', handlerClickUpdateButton, false)

  return button;
}

const createDeleteButton = (id) => {
  const button = document.createElement('button');
  button.id = id;
  button.innerHTML = 'Удалить';
  button.addEventListener('click', handlerClickDeleteButton);

  return button;
}

const createSuccessMessage = (text) => {
  const block = document.createElement('div');
  const message = document.createTextNode(text);

  block.appendChild(message);
  return block;
};

const createListItem = (el) => {
  const element = document.createElement('li');
  element.id = el.id;
  const user = document
    .createTextNode(`id: ${el.id}; email: ${el.email}; name: ${el.last_name} ${el.first_name}`);

  element.appendChild(user);
  element.appendChild(createUpdateButton(el.id));
  element.appendChild(createDeleteButton(el.id));

  return element;
}

const fetchPage = (userListNode, page) => {

  const success = (res) => {
    res.data.forEach((el) => {
      userListNode.appendChild(createListItem(el));
    });
  }

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://reqres.in/api/users?page=${page}`);

  xhr.send();

  xhr.onload = function() {
    if (xhr.status !== 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      success(JSON.parse(xhr.response));
    }
  };

  xhr.onerror = function() {
    alert("Запрос не удался");
    console.log(xhr);
  };
};

const fetchUpdate = (id, body) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8'
  };

  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `https://reqres.in/api/users/${id}`);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(body);

  xhr.onload = function() {
    if (xhr.status !== 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      alert('успешно изменено')
    }
  };

  xhr.onerror = function() {
    alert("Запрос не удался");
    console.log(xhr);
  };
}

const fetchDelete = (id) => {
  const xhr = new XMLHttpRequest();

  xhr.open('DELETE', `https://reqres.in/api/users/${id}`);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status !== 204) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      alert('успешно удалено')
    }
  };

  xhr.onerror = function() {
    alert("Запрос не удался");
    console.log(xhr);
  };
}

const errorHandler = (res) => {
  passwordInput.value = '';
  loginInput.value = '';
  alert(res.error);
}

const successHandler = () => {
  form.remove();

  const userListNode = document.createElement('ul');
  const spanNode = document.createElement('span');
  const body = document.querySelector('body');

  spanNode.innerHTML = 'page 1';

  body.appendChild(createSuccessMessage('Вход выполнен успешно!'));
  body.appendChild(spanNode);
  body.appendChild(userListNode);

  body.appendChild(createButton('prev', 'prev'));
  body.appendChild(createButton('next', 'next'));

  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');

  nextButton.addEventListener('click', handlerClickNext);
  nextButton.addEventListener('click', handlerClick);
  prevButton.addEventListener('click', handlerClickPrev);
  prevButton.addEventListener('click', handlerClick);

  fetchPage(userListNode, page);
}

const fetchLogin = (body, headers) => {
  submitButton.disabled = true;

  const xhr = new XMLHttpRequest();

  xhr.open('POST', `https://reqres.in/api/login`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(body);

  xhr.onload = function() {
    if (xhr.status !== 200) {
      errorHandler(JSON.parse(xhr.response));
      submitButton.disabled = false;
    } else {
      successHandler();
      submitButton.disabled = false;
    }
  };

  xhr.onerror = function() {
    alert("Запрос не удался");
    console.log(xhr);
  };
}

const handlerSubmitForm = (e) => {
  e.preventDefault();
  const body = JSON.stringify({
    email: loginInput.value,
    password: passwordInput.value
  });

  const headers = {
    'Content-Type': 'application/json;charset=utf-8'
  };

  fetchLogin(body, headers)
};

const handlerBlurInput = () => {
  submitButton.disabled  = !(loginInput.value && passwordInput.value);
}

const handlerBlurLogin = (e) => {
  const testEmail = /\S+@\S+\.\S+/;
  if (!testEmail.test(e.target.value)) {
    loginError.innerHTML = 'значение введено не по формату';
  } else {
    loginError.innerHTML = '';
  }
}

loginInput.addEventListener('blur', handlerBlurInput);
loginInput.addEventListener('blur', handlerBlurLogin);
passwordInput.addEventListener('blur', handlerBlurInput);

form.addEventListener('submit', handlerSubmitForm, false);
