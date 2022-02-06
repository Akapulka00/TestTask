"use strict" //Строгий режим
import {func} from "./data.js";// подключаем файлы
import {sortByName,sortByLastName,sortByColor,sortByLength} from "./sortFunc.js";
let dataArr=func();// получаем массив данных из функции для храниния данных
let sortFlag=-1;// флаг сортировки используется для переключения сортировки от возрастания к убыванию
let hidenarr=[1,1,1,1];// флаги сокрытия колонок
let arg ;//аргумент получаймый тернарным оператором
let noteLiOnPage=10;//количество записай на страице
let buffNote;//буффер для отображения текущих записей страницы
let pageNum=1;// номер страницы в начале = 1
let start=(pageNum-1)*noteLiOnPage;//начало отображения таблицы
let end=start+noteLiOnPage;//конец отображения таблицы
buffNote=dataArr.slice(start,end);// получение в буффер 10 строк для выбранной страницы
let pagination=document.querySelector('#pagination');// инициализация блока с кнопами переключения страниц
for (let i=1; i<=Math.ceil(dataArr.length/noteLiOnPage); i++){// динамическая отрисовка кнопок страниц
  let li=document.createElement('li');
  li.innerHTML=`${i}`;
  pagination.appendChild(li);
}
noteTable();//функция для постраничного отображения таблицы
table();//функция отображения таблицы
buttonHendlers();// Функция добавления кнопок сокрытия колонок

function table( ) {//функция отображения таблицы
  let  table=document.querySelector(".dataTable");
  let heading=document.createElement("tr");
  let th=[];
  for(let i=0;i<4; i++) {// отрисовка заголовка таблицы
    if (hidenarr[i] < 0) {
      continue;
    }
    th[i] = document.createElement("th");
    switch (i) {
      case 0:
        th[i].innerText = `Имя`;
        th[i].classList.add("nameFild");
        break;
      case 1:
        th[i].innerText = `Фамилия`;
        th[i].classList.add("surnameFild");
        break;
      case 2:
        th[i].innerText = `Описание`;
        th[i].classList.add("aboutFild");
        break;
      case 3:
        th[i].innerText = `Цвет глаз`;
        th[i].classList.add("colorFild");
        break;
    }
    heading.append(th[i]);
  }

  table.append(heading);
  th=[];
  for (const elem of buffNote ) {//отрисовка полей таблицы
    let tr=document.createElement("tr");

    for(let i=0;i<4; i++){
      if(hidenarr[i]<0){
        continue;
      }
      th[i]=document.createElement("th");
      switch (i) {
        case 0:
          th[i].innerText=`${elem['name']['firstName']}`;
          break;
        case 1:
          th[i].innerText=`${elem['name']['lastName']}`;
          break;
        case 2:
          let p=document.createElement("p");
          p.innerText=`${elem['about']}`;
          th[i].append(p);
          th[i].classList.add("doubleRow");// подключение стиля для отрисовки дух строк
          break;
        case 3:
          th[i].innerText=`${elem['eyeColor']}`;//подключение стиля для отображения цвета
          th[i].setAttribute("style",`color:${elem['eyeColor']}; background-color: ${elem['eyeColor']};` );
          break;

      }
      tr.append(th[i]);
    }
    tr.setAttribute("data-id",elem['id'] );//сохраняем id в html как атрибут в будущем по нему мы будем изменять поля
    tr.addEventListener('click', function () {
      let id= this.dataset.id;//получаем id из атрибута
      editForm(this.dataset.id);//вызваем функцияю отрисовки формы дабавления
    });
    table.append(tr);
  }
    generaiteLisener();// после отрисовки таблицы добавляем обработчики на  колонки
}
function generaiteLisener() {//обработчики колонок

  arg = sortFlag > 0 ? 0 : 1;// при 1 сортировка по возрастанию при 0 по убыванию
  let nameFild=document.querySelector(".nameFild");
  let surnameFild=document.querySelector(".surnameFild");
  let aboutFild=document.querySelector(".aboutFild");
  let colorFild=document.querySelector(".colorFild");
  nameFild.addEventListener('click', hendler); //обработчик сортировки для колонки с именем
  surnameFild.addEventListener('click', hendler2);//обработчик сортировки для колонки с фамилией
  aboutFild.addEventListener('click', hendler3);//обработчик сортировки для колонки с информацией
  colorFild.addEventListener('click', hendler4);//обработчик сортировки для колонки с цветом глаз
}

function noteTable() {//функция для постраничного отображения таблицы
  let liElements=document.querySelectorAll("#pagination li");// получаем все кнопки
  for (let elem of liElements){
    buffNote=dataArr.slice(start,end);
    elem.addEventListener('click', function (){// для каждой кнопки прописываем обработчик
      let active=document.querySelector('#pagination li.active');// находим уже активированные (стиль) кнопки
      if(active){//если они есть то снимем с них активацию(стиль)
        active.classList.remove('active');
      }
      this.classList.add('active');//добавляем стиль активации
      let pageNum=+this.innerHTML;//получаем выбранную страницу и подсчитываем какие поля должны быть отображены
      let start=(pageNum-1)*noteLiOnPage;
      let end=start+noteLiOnPage;
      buffNote=dataArr.slice(start,end);
      let dataTable=document.querySelector(".dataTable");// находим старую таблицу и удаляем ее
      dataTable.innerText="";
      table();// отображаем новую таблицу
    });
  }
}
function buffNoter(){// функция для установки страницы в начальное положение при изменении сортировки
  let active=document.querySelector('#pagination li.active');
  if(active){
    active.classList.remove('active');
  }
  pageNum=1;
  start=(pageNum-1)*noteLiOnPage;
  end=start+noteLiOnPage;
  buffNote=dataArr.slice(start,end);
  return buffNote;
}
function hendler() {//сортировка по имени
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByName(dataArr,arg);//функция сортировки
  sortFlag*=-1;
  buffNoter();//возвращаем в начало
  buffNote=dataArr.slice(start,end);
  table();
}
function hendler2() {//сортировка по фомиии
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByLastName(dataArr,arg);//функция сортировки
  sortFlag*=-1;
  buffNoter();//возвращаем в начало
  buffNote=dataArr.slice(start,end);
  table();
}
function hendler3() {//сортировка по длинне описания
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByLength(dataArr,arg);//функция сортировки
  sortFlag*=-1;
  buffNoter();//возвращаем в начало
  buffNote=dataArr.slice(start,end);
  table();
}
function hendler4() {//  сортировка по названию цвета
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByColor(dataArr,arg);//функция сортировки
  sortFlag*=-1;
  buffNoter();//возвращаем в начало
  buffNote=dataArr.slice(start,end);
  table();
}
function editForm(id) { // функция создания формы изменения записи
  let editFrorm=document.querySelector('.Editform');
  editFrorm.innerHTML='';
  let form=document.createElement('form');
  form.setAttribute("name","editElementForm" );
  form.innerHTML=`
  <input type="text" name="name" placeholder="Имя">
    <input type="text" name="surname" placeholder="Фимилия">
    <input type="text" name="phone" placeholder="+7 (xxx) xxx-xxxx">
    <input type="text" name="about" placeholder="Описание">
    <input type="text" name="color" placeholder="Цвет глаз">
  <input type="submit" value="Обновить">
`;
  editFrorm.append(form);
  document.forms['editElementForm'].addEventListener('submit', function (event){
    event.preventDefault();
    let data=this.elements;
    // находим нужную нам запись через id
    for (let i=0; i< dataArr.length; i++){
      if(dataArr[i].id==id){
        dataArr[i].name.firstName=data.name.value;
        dataArr[i].name.lastName=data.surname.value;
        dataArr[i].phone=data.phone.value;
        dataArr[i].about=data.about.value;
        dataArr[i].eyeColor=data.color.value;
        break;
      }
    }
    let dataTable=document.querySelector(".dataTable");
    dataTable.innerText="";//удаляем таблицу и отработавшую форму
    let editFrorm=document.querySelector('.Editform');
    editFrorm.innerHTML='';
    table();
  });

}
function buttonHendlers() {//функия обработчик кнопок сокрытия колонок
  let buttons=document.querySelectorAll('.hendlerButton');
  for (let button of buttons){
    button.addEventListener('click',function (){
      let col= this.dataset.col*1;// номер колонки получаем из арггумета data кнопки
      hidenarr[col]*=-1;// при клике мы переводим флаг в -1  или 1
      let dataTable=document.querySelector(".dataTable");// при 1 выбранная колонка отображается при -1 нет
      dataTable.innerText="";
      table();
    });
  }
}
