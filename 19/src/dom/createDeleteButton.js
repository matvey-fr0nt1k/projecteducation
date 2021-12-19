import fetchDelete from '../fetch/fetchDelete';

const handlerClickDeleteButton = (e) => {
  document.getElementById(e.target.id).remove();
  fetchDelete(e.target.id);
}

const createDeleteButton = (id) => {
  const button = document.createElement('button');
  button.id = id;
  button.innerHTML = 'Удалить';
  button.addEventListener('click', handlerClickDeleteButton);

  return button;
}

export default createDeleteButton;