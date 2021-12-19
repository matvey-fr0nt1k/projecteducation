
function Accordion(element) {
  this.accordion = element;
  this.counter = 0;
  this.open = [];

  this.addBlock = function (title, description) {
    const block = document.createElement('div');
    const desc = document.createElement('div');
    desc.id = this.counter;
    this.counter++;
    desc.style.display = 'none';
    const textNodeTitle = document.createTextNode(title);
    const textNodeDesc = document.createTextNode(description);

    block.appendChild(textNodeTitle);
    desc.appendChild(textNodeDesc);
    block.appendChild(desc);
    this.accordion.appendChild(block);
  }

  this.toggle = function (index) {
    const element = document.getElementById(index);
    if (element.style.display === 'none') {
      element.style.display = 'block';
      this.open.push(index);
    } else {
      element.style.display = 'none';
      this.open = this.open.filter((element) => element !== index);
    }
  }

  this.getOpenIndexes = function () {
    return this.open;
  }

  this.closeAll = function () {
    this.open.forEach((el) => {
      const element = document.getElementById(el);
      element.style.display = 'none';
    });

    this.open = [];
  }

  this.openAll = function () {
    for (let i = 0; i < this.counter; i++) {
      const element = document.getElementById(i);
      element.style.display = 'block';
      this.open.push(i);
    }
  }
}

const mainAccordion = new Accordion(document.getElementById('accordion'));
mainAccordion.addBlock('test','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aperiam cum cupiditate debitis deleniti dolores doloribus dolorum ea, eaque earum est explicabo ipsa iure, laboriosam libero modi officiis ut.')
mainAccordion.addBlock('test','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aperiam cum cupiditate debitis deleniti dolores doloribus dolorum ea, eaque earum est explicabo ipsa iure, laboriosam libero modi officiis ut.')
mainAccordion.addBlock('test','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aperiam cum cupiditate debitis deleniti dolores doloribus dolorum ea, eaque earum est explicabo ipsa iure, laboriosam libero modi officiis ut.')

mainAccordion.toggle(0);
mainAccordion.toggle(1);
mainAccordion.toggle(2);

console.log(mainAccordion.getOpenIndexes());

mainAccordion.closeAll();

console.log(mainAccordion.getOpenIndexes());

mainAccordion.openAll();
console.log(mainAccordion.getOpenIndexes());
