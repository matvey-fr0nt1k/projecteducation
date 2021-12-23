import createDeleteButton from './createDeleteButton';
import fetchUpdate from '../fetch/fetchUpdate';

const createUpdateButton = (id) => {
  const button = document.createElement('button');
  button.id = id;
  button.innerHTML = 'Изменить';
  button.addEventListener('click', handlerClickUpdateButton, false)

  return button;
}

const handlerSaveUpdate = (e) => {
  const id = e.target.id.split('-')[1];
  const inputName = document.querySelector(`#name-${id}`).value;
  const inputEmail = document.querySelector(`#email-${id}`).value;
  e.target.disabled = true;
  const body = JSON.stringify({name: inputName, email: inputEmail});

  fetchUpdate(id, body).then(() => {
    const item = document.getElementById(id);
    item.innerHTML = `id: ${id}; email: ${inputEmail}; name: ${inputName}`;
    item.appendChild(createUpdateButton(id));
    item.appendChild(createDeleteButton(id));
  });
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

export default createUpdateButton;