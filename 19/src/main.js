import fetchPage from './fetch/fetchGetPage';
import createButton from './dom/createButton';
import createSuccessMessage from './dom/createSuccessMessage';

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
  fetch(`https://reqres.in/api/login`,
    {method: 'post', body, headers})
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        errorHandler(res);
      } else {
        successHandler();
      }
    })
    .catch(errorHandler)
    .finally(() => submitButton.disabled = false);
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

