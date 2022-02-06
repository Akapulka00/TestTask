"use strict"
import {func} from "./data.js";
import {sortByName,sortByLastName,sortByColor,sortByLength} from "./sortFunc.js";
let dataArr=func();
//dataArr=sortByColor(dataArr,0);// сортировка
let sortFlag=-1;
let hidenarr=[1,1,1,1];
let arg ;
let noteLiOnPage=10;//количество записай на страице
let buffNote;
let pageNum=1;
let start=(pageNum-1)*noteLiOnPage;
let end=start+noteLiOnPage;
buffNote=dataArr.slice(start,end);
let pagination=document.querySelector('#pagination')
for (let i=1; i<=Math.ceil(dataArr.length/noteLiOnPage); i++){
  let li=document.createElement('li');
  li.innerHTML=`${i}`;
  pagination.appendChild(li);
}

///////////////////// на этом элименте происходит раздклкние
noteTable();
table();
buttonHendlers();

///////////////////////
function table( ) {
  let  table=document.querySelector(".dataTable");
  let heading=document.createElement("tr");
  let th=[];
  for(let i=0;i<4; i++) {
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
  for (const elem of buffNote ) {
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
          //th[i].innerText=`${dataArr[0]['about']}`;
          let p=document.createElement("p");
          p.innerText=`${elem['about']}`;
          th[i].append(p);
          th[i].classList.add("doubleRow");
          break;
        case 3:
          th[i].innerText=`${elem['eyeColor']}`;
          th[i].setAttribute("style",`color:${elem['eyeColor']}; background-color: ${elem['eyeColor']};` );
          break;

      }
      tr.append(th[i]);
    }
    tr.setAttribute("data-id",elem['id'] );
    tr.addEventListener('click', function () {
      //console.log(this.dataset.id);///создаем окно для изменения
      let id= this.dataset.id;
      editForm(this.dataset.id);
    });
    table.append(tr);
  }
    generaiteLisener();
}
function generaiteLisener() {

  arg = sortFlag > 0 ? 0 : 1;
  let nameFild=document.querySelector(".nameFild");
  let surnameFild=document.querySelector(".surnameFild");
  let aboutFild=document.querySelector(".aboutFild");
  let colorFild=document.querySelector(".colorFild");
  nameFild.addEventListener('click', hendler);
  surnameFild.addEventListener('click', hendler2);
  aboutFild.addEventListener('click', hendler3);
  colorFild.addEventListener('click', hendler4);
}

function noteTable() {//зависимая часть
  let liElements=document.querySelectorAll("#pagination li");
  for (let elem of liElements){//это должно задваться в table
    buffNote=dataArr.slice(start,end);
    elem.addEventListener('click', function (){
      let active=document.querySelector('#pagination li.active');
      if(active){
        active.classList.remove('active');
      }

      this.classList.add('active');
      let pageNum=+this.innerHTML;
      let start=(pageNum-1)*noteLiOnPage;
      let end=start+noteLiOnPage;
      buffNote=dataArr.slice(start,end);
      let dataTable=document.querySelector(".dataTable");
      dataTable.innerText="";
      table();
    });
  }
}
function buffNoter(){
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
function hendler() {
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByName(dataArr,arg);
  sortFlag*=-1;
  buffNoter();
  buffNote=dataArr.slice(start,end);
  table();
}
function hendler2() {
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByLastName(dataArr,arg);
  sortFlag*=-1;
  buffNoter();
  buffNote=dataArr.slice(start,end);
  table();
}
function hendler3() {
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByLength(dataArr,arg);
  sortFlag*=-1;
  buffNoter();
  buffNote=dataArr.slice(start,end);
  table();
}
function hendler4() {
  let dataTable=document.querySelector(".dataTable");
  dataTable.innerText="";
  dataArr=sortByColor(dataArr,arg);
  sortFlag*=-1;
  buffNoter();
  buffNote=dataArr.slice(start,end);
  table();
}
function editForm(id) {
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
    // передаем данные в буффер по id  перезагрудаем таблицу
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
    dataTable.innerText="";
    let editFrorm=document.querySelector('.Editform');
    editFrorm.innerHTML='';
    table();
  });

}
function buttonHendlers() {
  let buttons=document.querySelectorAll('.hendlerButton');
  for (let button of buttons){
    button.addEventListener('click',function (){
      let col= this.dataset.col*1;
      hidenarr[col]*=-1;
      let dataTable=document.querySelector(".dataTable");
      dataTable.innerText="";
      table();
    });
  }
}
