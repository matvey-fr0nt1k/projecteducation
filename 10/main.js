const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul');

const createCheckbox = () => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', handlerChangeCheckbox, false);

  return checkbox;
}

const createTextNode = (text) => {
  const wrapper = document.createElement('span');
  const message = document.createTextNode(text);
  wrapper.appendChild(message);

  return wrapper;
}

const createDeleteButton = () => {
  const button = document.createElement('button');
  const message = document.createTextNode('удалить');
  button.addEventListener('click', handlerClickDeleteButton, false);
  button.appendChild(message);

  return button;
}

const createList = (text) => {
  const li = document.createElement('li');

  li.appendChild(createCheckbox());
  li.appendChild(createTextNode(text));
  li.appendChild(createDeleteButton());

  return li;
}

const handlerChangeCheckbox = (e) => {
  const target = e.target;

  target.nextSibling.style.textDecoration = target.checked ?
    'line-through' :
    'none';
}

const handlerClickDeleteButton = (e) => {
  const target = e.target;
  
  target.parentElement.remove();
}

const handlerClick = () => {
  list.appendChild(createList(input.value));
  input.value = '';
};

button.addEventListener('click', handlerClick, false);