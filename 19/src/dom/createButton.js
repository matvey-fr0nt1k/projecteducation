const createButton = (id, text) => {
  const button = document.createElement('button');
  button.id = id;
  button.innerHTML = text;

  return button;
}

export default createButton;