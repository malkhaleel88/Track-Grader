'use strict';

let formEl = document.getElementById('coursesForm');
let tableEl = document.getElementById('shownResults');

let headContent = ['Student Name', 'Student Grade', 'Course', 'Status'];

Status.all = [];


function Status(name, course){
  this.name = name;
  this.course = course;
  this.grade = generateGrades();


  Status.all.push(this);


}
console.log(Status.all);

Status.prototype.renderResults = function(){

  let newRaw = document.createElement('tr');
  tableEl.appendChild(newRaw);

  let nameCell = document.createElement('td');
  newRaw.appendChild(nameCell);
  nameCell.textContent = this.name;

  let gradeCell = document.createElement('td');
  newRaw.appendChild(gradeCell);
  gradeCell.textContent = this.grade;

  let courseCell = document.createElement('td');
  newRaw.appendChild(courseCell);
  courseCell.textContent = this.course;

  let statusCell = document.createElement('td');
  newRaw.appendChild(statusCell);

  if (this.grade < 50){

    statusCell.textContent = 'FAIL';
  }else{
    statusCell.textContent = 'PASS';
  }

};


formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event){

  event.preventDefault();

  let newName = event.target.nameField.value;
  let newCourse = event.target.courseField.value;

  let newResult = new Status(newName, newCourse);

  newResult.renderResults();
  setTolocal();

}



function tableHead(){

  let headRaw = document.createElement('tr');
  tableEl.appendChild(headRaw);

  for (let index = 0; index < headContent.length; index++) {

    let headData = document.createElement('th');
    headRaw.appendChild(headData);
    headData.textContent = headContent[index];

  }
}
tableHead();

function generateGrades(){

  return Math.floor(Math.random() * 100);
}



function setTolocal(){

  localStorage.setItem('Graderesults', JSON.stringify(Status.all));
}

function getFromlocal(){

  let parceArray = JSON.parse(localStorage.getItem('Graderesults'));

  if(parceArray){
    for (let index = 0; index < parceArray.length; index++) {

      let reinst = new Status(parceArray[index].name, parceArray[index].course);

      reinst.renderResults();

    }
  }
}
getFromlocal();
