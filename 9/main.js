const input = document.querySelector('input');
const button = document.querySelector('button');

const handlerClick = () => {
  console.log(input.value);
  input.value = '';
};

button.addEventListener('click', handlerClick, false);