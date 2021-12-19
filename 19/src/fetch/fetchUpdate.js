const fetchUpdate = (id, body) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8'
  };

  return fetch(`https://reqres.in/api/users/${id}`, {method: 'put', body, headers})
    .then(() => alert('успешно изменено'))
    .catch(e => alert(e.message));
}

export default fetchUpdate;