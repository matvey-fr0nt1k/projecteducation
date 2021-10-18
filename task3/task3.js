const arraySort = (array, index) => {
  return index === 'возрастанию' ?
    array.sort((a, b) => a - b) :
    array.sort((a, b) => b - a);
}

const parity = (array, index) => {
  return index === 'четные' ?
    array.filter((elem) => !(elem % 2)):
    array.filter((elem) => elem % 2);
}

const workWithNumbers = (array, index) => {
  if (index === 'сумму всех чисел') {
    return array.reduce((prev, elem) => +prev + +elem, 0);
  } else if (index === 'среднее арифметическое число') {
    return array.reduce((prev, elem) => +prev + +elem, 0) / array.length;
  } else if (index === 'наибольшее') {
    return Math.max(...array);
  } else {
    return Math.min(...array);
  }
}

let array;
let againOperation;

do {
  const vocabulary = [
    'возрастанию',
    'убыванию',
    'четные',
    'нечетные',
    'сумму всех чисел',
    'среднее арифметическое число',
    'наибольшее',
    'наименьшее'
  ];
  if (!againOperation || againOperation == 2) {
    array = prompt('Введите числа через пробел', '1 2 3')
      .replace(/\s+/g, ' ')
      .split(' ');
  }

  let operation;
  do {
    operation = prompt('  1 - отсортировать по возрастанию/убыванию\n' +
      '  2 - вывести все четные/нечетные\n' +
      '  3 - вывести сумму всех чисел, среднее арифметическое число, наибольшее/наименьшее');
    let index;
    do {
      if (operation == 1) {
        index = prompt('отсортировать по', 'возрастанию');
      } else if (operation == 2){
        index = prompt('вывести все', 'четные');
      } else if (operation == 3){
        index = prompt('вывести', 'сумму всех чисел');
      } else {
        alert('Операция не определена');
        operation = null;
        break;
      }
    } while (!index || !vocabulary.includes(index));
    if (index === 'возрастанию' || index === 'убыванию') {
      alert(arraySort(array, index));
    }
    if (index === 'четные' || index === 'нечетные') {
      alert(parity(array, index));
    }
    if (index === 'сумму всех чисел' ||
      index === 'среднее арифметическое число' ||
      index === 'наибольшее' ||
      index === 'наименьшее') {
      alert(workWithNumbers(array, index));
    }
  } while (!operation || (operation != 1 && operation != 2 && operation != 3));

  const again = prompt('Повторим?', 'да/нет');
  if (again === 'нет') break;

  if (again === 'да') {
    againOperation = prompt('1- повторить со старым массивом\n' +
      '2- или создать новый', '1');
  }
  if (againOperation == 2) {
    array = null;
  }

} while ((!array || array.length < 3) || againOperation == 1);
