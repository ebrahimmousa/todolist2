import { Todo } from "./todo";

let todoInput = document.querySelector('.todo_input');
let todoButton = document.querySelector('.todo_button');
let todoList = document.querySelector('.todo_list');

let todos=[];
function createHtml() {
    todoList.innerHTML = "";

    for (let i = 0; i < todos.length; i++)  { 

        let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    let newTodo = document.createElement('li');
    newTodo.innerHTML = todos[i].name;
    newTodo.classList.add('todo_item');
    if(todos[i].completed === true) {
        newTodo.classList.toggle("completedItem");
    }
    todoDiv.appendChild(newTodo);
    

    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn');
    todoDiv.appendChild(completedButton);

    let deleteButton = document.createElement('button');

    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    deleteButton.classList.add('delete_btn');

    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    
    deleteButton.addEventListener("click", () => {
        todos.splice([i],1);
        saveToLocal();
      });

      function completedTodo() {
        todos[i].completed = !todos[i].completed;
        saveToLocal();
        createHtml();
      }

      completedButton.addEventListener("click", () => {
        completedTodo(i);
    });

     }}

todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)

function addTodo(event) {
    event.preventDefault();
    let task = new Todo(todoInput.value, false);
    if(todoInput.value === ""){
    alert("you need to write something");
    } else{
        todos.push(task);
        saveToLocal();
        createHtml();
    }
    todoInput.value = ""
}


function deleteCheck(e) {
    let item = e.target;
    if (item.classList[0] === "delete_btn") {
        let todo = item.parentElement;
        todo.classList.add("delete")
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
}

function saveToLocal(){
let theList = JSON.stringify(todos);
localStorage.setItem("todos", theList);
}

window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")).map((todoItem) => {
      return new Todo(todoItem.name, todoItem.completed);
    });
  
    createHtml();
  });