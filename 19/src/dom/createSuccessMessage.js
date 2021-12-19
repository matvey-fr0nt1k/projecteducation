const createSuccessMessage = (text) => {
  const block = document.createElement('div');
  const message = document.createTextNode(text);

  block.appendChild(message);
  return block;
};

export default createSuccessMessage;