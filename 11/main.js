const loginInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#login');
const form = document.querySelector('form');
const loginError = document.querySelector('#loginErr');

const handlerSubmitForm = (e) => {
  e.preventDefault();
  if (loginInput.value !== 'admin@admin.ru' || passwordInput.value !== 'password123') {
    loginInput.value = '';
    passwordInput.value = '';
    submitButton.disabled = true;
    alert('Не правильный логин или пароль');
  } else {
    const block = document.createElement('div');
    const message = document.createTextNode("Вход выполнен успешно!");
    block.appendChild(message);
    form.remove();
    document.querySelector('body').appendChild(block);
  }
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
