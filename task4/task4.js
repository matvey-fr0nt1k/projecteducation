/**
 * Поиск числа Фибоначчи
 * @param number
 * @returns {*}
 */
const fibonacci = (number) => (
  // Идем от большего числа к меньшему
  number <= 1 ?
    number :
    fibonacci(number - 1) + fibonacci(number - 2)
);