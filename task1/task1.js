/**
 * Функция заполенения массива числами
 * @param arrayLength - Длина массива
 * @returns {[]} Массив заполненый числам
 */
const fillArray = (arrayLength) => {
  // Инициализируем новый массив
  const array = [];

  // Запускаем цикл от 0 и до длины массива
  for (let i = 0; i < arrayLength; i++) {
    let number;

    // Пока user не введет число, будем запрашивать его
    do {
      number = prompt('Введите число', '0');
      if (isNaN(+number)) {
        alert(`${number} не число`);
      }
    } while (!number || isNaN(+number));

    // Кладем полученное число в массив
    array.push(+number);
  }

  // Возвращаем заполнненый массив
  return array;
}

/**
 * Функция сортировки массива "Пузырьком"
 * @param array - массив, который необходимо отсортировать
 * @returns {[]} - отсортированный массив
 */
const sortArray = (array) => {
  // Записываем длину массива в переменную
  const length = array.length;

  // Инциализируем внешний цикл от 0 до длинны массива
  for (let i = 0; i < length; i++) {
    let min = i;

    // Инциализируем внутренний цикл от следующего значения i до длинны массива
    for (let k = i + 1; k < length; k++) {
      if (array[i] < array[k]) min = k;
    }

    // Через временную переменную меняем числа местами
    let temp = array[min];
    array[min] = array[i];
    array[i] = temp;
  }

  // Возвращаем отсортированный массив
  return array;
}

let arrayLength;

// Запрашиваем длину массива, пока не введут число больше 5 и меньше 20
do {
  arrayLength = +prompt('Введите размер массива', '5');

  if (arrayLength > 20 || arrayLength < 5) {
    alert('Размер массива должен быть больше 5 и меньше 20');
  }

} while (!arrayLength || arrayLength > 20 || arrayLength < 5 || isNaN(arrayLength));

const array = fillArray(arrayLength);
console.log(sortArray(array));


