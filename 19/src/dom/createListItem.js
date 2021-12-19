import createDeleteButton from './createDeleteButton';
import createUpdateButton from './createUpdateButton';

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

export default createListItem;