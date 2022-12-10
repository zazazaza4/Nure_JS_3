// Написать скрпит, случайным образом генерирующий данные и выводящий их пользователю в виде таблицы, в которой постепенно добавляются новые строки. Должно отличаться оформление четных и нечетных строк данных, а также первой строки таблицы (заголовочной). Перед началом вывода пользователь может указать интервал, с которым появляются новые строки с данными. Предоставить возможность останавливать генерацию данных.

function chechNumberOrNot(num) {
  if (typeof +num === 'number' && !isNaN(num)) {
    return true;
  }
  return false;
}

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < length; index++) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }

  return result;
}

function createRow(tabelSelector, data, isEven) {
  const { count, user, id } = data;

  let row = tabelSelector.insertRow(count);
  const cells = [];

  for (let index = 0; index < 3; index++) {
    cells.push(row.insertCell(index));
  }

  cells[0].innerHTML = count;
  cells[1].innerHTML = id;
  cells[2].innerHTML = user;
}

function generateData() {
  let users = ['Noah', 'Tom', 'Bill', 'James', 'Amelia', 'Mia', 'Anna'];
  let userQuantity = users.length;

  return {
    id: makeId(6),
    user: users[Math.floor(Math.random() * userQuantity)]
  };
}

function startAddData(time, table) {
  let count = 1;

  const intervalId = setInterval(() => {
    const data = { count, ...generateData() };

    if (count % 2 === 0) {
      createRow(table, data, true);
    } else {
      createRow(table, data, false);
    }

    count++;
  }, time);
  return intervalId;
}

function main() {
  const tableEl = document.querySelector('#table-1');
  const input = document.querySelector('#interval');
  const buttonInterval = document.querySelector('#interval-btn');
  const buttonStop = document.querySelector('#btn-stop');

  let intervalId = null;
  let intervalTime = 1000;

  input.addEventListener('input', (event) => {
    const value = event.target.value;
    if (chechNumberOrNot(value)) {
      intervalTime = +value * 1000;
    }
  });

  buttonInterval.addEventListener('click', () => {
    intervalId = startAddData(intervalTime, tableEl);
  });

  buttonStop.addEventListener('click', () => {
    clearInterval(intervalId);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});
