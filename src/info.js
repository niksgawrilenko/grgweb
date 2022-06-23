function getData(){
  return fetch(`/data`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.textError) {
      alert(data.textError);
      return;
    }
    goods = data;
  });
};

function numberOfButtons(arr, num){
  return Math.ceil(arr.length / num);
}

function paintPaginationButton (count){
  let i, r;
  for(i = 1, r = ""; i <= count; i++){
    r += `<button class="pb">${i}</button>`;
  }
  return r
}

function paintResult (arr){
  let i, r;
  for(i = 0, r = ""; i < arr.length; i++){
    // r += `<p class="result-item">${arr[i]}</p>`;
    r += `<tr>`;
    for(key in arr[i]) {
      r += `<td>${arr[i][key]}</td>`;
    }
    r += `</tr>`;
  }
  return r;
}

let goods;


document.addEventListener('DOMContentLoaded', async () => {
  await getData();

  // Количество элементов для отбора
  let quantityforselection = 10;

  // Главный DIV для результатов пагинации
  let pagDiv = document.createElement("div");
  pagDiv.setAttribute("class","pagDiv");
  // Получаем элемент h1
  let pagH1 = document.querySelector(".h1_table");
  // Устанавливаем общий блок пагинации под заголовком h1
  pagH1.after(pagDiv);

  // Линия кнопок над результатами отбора
  let bl1 = document.createElement("div");
  bl1.setAttribute("class", "bl1");
  bl1.innerHTML = paintPaginationButton(numberOfButtons(goods, quantityforselection));

  // Линия кнопок под результатами отбора
  let bl2 = document.createElement("div");
  bl2.setAttribute("class", "bl2");
  bl2.innerHTML = paintPaginationButton(numberOfButtons(goods, quantityforselection));

  // Блок для отрисовки результатов
  let result = document.createElement("div");
  result.setAttribute("class", "result");

  let table = document.createElement("table");
  table.setAttribute("class", "table");

  // Первичная отрисовка
  table.innerHTML = `<tr><th>Name</th><th>Birthday</th><th>Group</th></tr>`
  table.innerHTML += paintResult(goods.slice(0, quantityforselection))

  // Помещаем линии кнопок и результат
  pagDiv.append(bl1, result, bl2)

  result.append(table);

  // Вешаем обработчик для всех кнопок пагинации
  document.addEventListener('click', function(event){
    if([...event.target.classList].includes("pb")){
      let y = event.target.textContent;
      let start = quantityforselection * (y - 1);
      let end = quantityforselection * y;
      table.innerHTML = `<tr><th>Name</th><th>Birthday</th><th>Group</th></tr>`
      table.innerHTML += paintResult (goods.slice(start, end));
    }else{
      console.log(event.target);
    }
  });
});

