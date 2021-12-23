import createListItem from '../dom/createListItem';

const fetchPage = (userListNode, page) => {
  const success = (res) => {
    res.data.forEach((el) => {
      userListNode.appendChild(createListItem(el));
    });
  }

  fetch(`https://reqres.in/api/users?page=${page}`)
    .then(res => res.json())
    .then(success)
    .catch(e => alert(e.message));
};

export default fetchPage;