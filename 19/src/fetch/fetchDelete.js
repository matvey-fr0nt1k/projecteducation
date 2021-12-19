const fetchDelete = (id) => {
  fetch(`https://reqres.in/api/users/${id}`, {method: 'delete'})
    .then(() => alert('успешно удалено'))
    .catch(e => alert(e.message));
}

export default fetchDelete;