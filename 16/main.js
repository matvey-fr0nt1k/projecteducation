let page = 1;
const userList = document.querySelector('#userList');
const pageCounter = document.querySelector('div span');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const form = document.querySelector('form');

const fetchPage = () => {
  fetch(`https://reqres.in/api/users?page=${page}`)
    .then(res => res.json())
    .then(res => res.data.forEach((el) => {
      const element = document.createElement('li');
      const user = document.createTextNode(`id: ${el.id}; email: ${el.email}; name: ${el.last_name} ${el.first_name}`);
      element.appendChild(user);
      userList.appendChild(element);
    }))
    .catch(e => alert(e.message));
};

fetchPage();

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
  userList.innerHTML = '';
  pageCounter.innerHTML = `page ${page}`;
  fetchPage();
}

const handlerSubmit = (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const body = JSON.stringify({
    email, name
  });

  const headers = {
      'Content-Type': 'application/json;charset=utf-8'
  };

  fetch(`https://reqres.in/api/users`,
    {method: 'post', body, headers})
    .then(res => res.json())
    .then(res => alert(`Пользователь: ${name}, сохранен. ID: ${res.id}`))
    .catch(e => alert(e.message));
}

next.addEventListener('click', handlerClickNext, false);
prev.addEventListener('click', handlerClickPrev, false);
next.addEventListener('click', handlerClick, false);
prev.addEventListener('click', handlerClick, false);

form.addEventListener('submit', handlerSubmit);