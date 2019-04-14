let form = document.querySelector('#task-form');
let ul = document.querySelector('.collection');
let input = document.querySelector('#task');
let filter = document.querySelector('#filter');
let clear = document.querySelector('.clear-tasks');
let storedTasks;
if (!localStorage.getItem('Task')){
  localStorage.setItem('Task', '');
  storedTasks = [];
}
else
  storedTasks = localStorage.getItem('Task').split(', ');

loadAllEventListeners();

function loadAllEventListeners(){
  document.addEventListener('DOMContentLoaded', readTasks);
  form.addEventListener('submit', addTask);
  ul.addEventListener('click', removeTask);
  filter.addEventListener('input', filterTask);
  clear.addEventListener('click', clearTask);
}

function readTasks(){
  storedTasks.forEach(addItem);
}

function addTask(e){

  if (input.value.trim() === ''){
    alert('Please input a task');
    input.focus();
  }
  else{
    addItem(input.value.trim());
    storedTasks.push(input.value.trim());
    localStorage.setItem('Task', storedTasks.join(', '));
  }
  input.value = '';
  e.preventDefault();
}

function addItem(taskName){
  let li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskName));
  let a = document.createElement('a');
  a.href = '#';
  a.className = 'delete-item secondary-content';
  a.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(a);
  ul.appendChild(li);
}

function removeTask(e){
  if (e.target.parentElement.classList.contains("delete-item")){
    let pos = storedTasks.indexOf(e.target.parentElement.parentElement.textContent);
    storedTasks.splice(pos, 1);
    localStorage.setItem('Task', storedTasks.join(', '));
    e.target.parentElement.parentElement.remove();
  }
}

function filterTask(e){
  let filterText = e.target.value.toLowerCase();
  let listItem = e.target.parentElement.parentElement.children[2].children;
  for (let item of listItem)
    if (!item.innerText.toLowerCase().includes(filterText))
      item.style.display = 'none';
    else
      item.style.display = 'block';
}

function clearTask(e){
    if (confirm('Are you sure to clear all tasks?')){
      while (ul.firstChild)
      ul.firstChild.remove();
      e.preventDefault();
      localStorage.setItem('Task', '')
      storedTasks = [];
    }
}