let mainPageSection =  document.getElementById("mainpage")
let myTodosSection = document.getElementById("myTodos")
let completedSection = document.getElementById("completed")
let inProgressSection = document.getElementById("inProgress")
let mytodobutEle = document.getElementById("myTodoBut")
let completedButEle = document.getElementById("completedBut")
let inProgressButEle = document.getElementById("inProgressBut")
let notYetStartedButEle = document.getElementById("notYetStartedBut")
let inputEle = document.getElementById("inputElement")
let dateEle = document.getElementById("dateElement")
let userTodoList = document.getElementById("userTodoList")
let userCompletedTaskslist = document.getElementById("userCompletedTaskslist")
let inProgressTasksList = document.getElementById("inProgressTasksList")
displayMainPage()


function displayMainPage(){
    mainPageSection.style.display = "flex"
    myTodosSection.style.display = "none"
    completedSection.style.display = "none"
    inProgressSection.style.display = "none"
    mytodobutEle.style.color = "black"
    completedButEle.style.color = "black"
    inProgressButEle.style.color = "black"
}

function displayMytodoSection(){
    myTodosSection.style.display = "flex"
    mainPageSection.style.display = "none"
    completedSection.style.display = "none"
    inProgressSection.style.display = "none"
    mytodobutEle.style.color = "red"
    completedButEle.style.color = "black"
    inProgressButEle.style.color = "black"
    
}

function displayCompletedSection(){
    myTodosSection.style.display = "none"
    mainPageSection.style.display = "none"
    completedSection.style.display = "block"
    inProgressSection.style.display = "none"
    mytodobutEle.style.color = "black"
    completedButEle.style.color = "red"
    inProgressButEle.style.color = "black"
}

function displayinProgressSection(){
    myTodosSection.style.display = "none"
    mainPageSection.style.display = "none"
    completedSection.style.display = "none"
    inProgressSection.style.display = "block"
    mytodobutEle.style.color = "black"
    completedButEle.style.color = "black"
    inProgressButEle.style.color = "red"
}
function getTodoList(){
    let parsedData = JSON.parse(localStorage.getItem("mytodolist"))
    if(parsedData === null){
        return []
    }
    else
        return parsedData
    
}
function getcompletedList(){
    let parsedData = JSON.parse(localStorage.getItem("completedList"))
    if(parsedData === null){
        return []
    }
    else
        return parsedData
    
}

function getinProgressList(){
    let parsedData = JSON.parse(localStorage.getItem("inProgressList"))
    if(parsedData === null){
        return []
    }
    else
        return parsedData
    
}

let todosList = getTodoList()
let id = todosList.length
let completedTasks = getcompletedList()
let inProgressTasks = getinProgressList()

function enterTodo(){
    let eachTodo = {}
     id += 1
    let userEnterTodo = inputEle.value
    let userEnterDate = dateEle.value
    inputEle.value = ""
    dateEle.value = ""
    eachTodo["todo"] = userEnterTodo
    eachTodo["date"] = userEnterDate
    eachTodo["todoId"] = id
    eachTodo["completed"] = false
    eachTodo["isInProgress"] = false
    todosList.push(eachTodo)
    createAndAppendTodo(eachTodo)
    saveData()
}

function createAndAppendTodo(eachTodo){
    let containerId = eachTodo.todoId
    document.getElementById("totalTasks").textContent = "Total Tasks : "+ (todosList.length)
    let container = document.createElement("div")
    container.style.display = "flex";
    container.id = containerId
    container.style.margin = "25px";
    container.classList.add("container")
    userTodoList.appendChild(container)
    let todo = document.createElement("div")
    todo.classList.add("each-todo")
    container.appendChild(todo)
    let para = document.createElement("h6")
    para.textContent = eachTodo["todo"]
    para.style.fontSize = "38px"  
    para.style.color = "#f00e4a"
    para.style.fontFamily = "Roboto"
    todo.appendChild(para)
    let date = document.createElement("p")
    date.textContent = "have to complete by: " + eachTodo["date"]
    date.style.alignSelf = "flex-end"
    date.style.color = "#5a07a8"
    date.style.marginBottom = "10px"
    todo.appendChild(date)

    let inprogressButton = document.createElement("button")
    inprogressButton.classList.add("completedbutton")
    container.appendChild(inprogressButton)
    inprogressButton.id = "inprogressbutton" + id
    inprogressButton.onclick = (id) =>{
        document.getElementById("totalTasks").textContent = "Total Tasks : "+ (todosList.length-1)
        removeTask(containerId)
        inProgressTasks.push(eachTodo)
        appendInprogessTodo(eachTodo)
        saveData()
       
        
    }
    inprogressButton.textContent = "In Progress"

    let completedButton = document.createElement("button")
    completedButton.classList.add("completedbutton")
    container.appendChild(completedButton)
    completedButton.id = "completebutton" + id
    completedButton.onclick = () =>{
        document.getElementById("totalTasks").textContent = "Total Tasks : "+ (todosList.length-1)
          removeTask(containerId)
          completedTasks.push(eachTodo)
          appendCompletedTodo(eachTodo)
          saveData()
    }
    completedButton.textContent = "completed"

    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("completedbutton")
    container.appendChild(deleteButton)
    deleteButton.id = "deletebutton" + id
    deleteButton.onclick = () =>{
        document.getElementById("totalTasks").textContent = "Total Tasks : "+ (todosList.length-1)
        removeTask(containerId)
        saveData()
    }
}
function saveData(){
    localStorage.setItem("mytodolist",JSON.stringify(todosList))
    localStorage.setItem("completedList",JSON.stringify(completedTasks))
    localStorage.setItem("inProgressList",JSON.stringify(inProgressTasks))
}

function removeTask(id){
    let reqEle = document.getElementById(id)
    userTodoList.removeChild(reqEle)


    let deleteElementIndex = todosList.findIndex(function(eachTodo) {
        let eachTodoId = eachTodo.todoId;
        if (eachTodoId === id) {
          return true;
        } else {
          return false;
        }
      });
    
      todosList.splice(deleteElementIndex, 1);
      saveData()
}

function removeCompletedTask(id){
    let reqEle = document.getElementById(id)
    userCompletedTaskslist.removeChild(reqEle)
    

    let deleteElementIndex = completedTasks.findIndex(function(eachTodo) {
        let eachTodoId = eachTodo.todoId;
        if (eachTodoId === id) {
          return true;
        } else {
          return false;
        }
      });
    
      completedTasks.splice(deleteElementIndex, 1);
      console.log(completedTasks)
      saveData()
}

function  removeinProgressTask(id){
    let reqEle = document.getElementById(id)
    inProgressTasksList.removeChild(reqEle)
    

    let deleteElementIndex = inProgressTasks.findIndex(function(eachTodo) {
        let eachTodoId = eachTodo.todoId;
        if (eachTodoId === id) {
          return true;
        } else {
          return false;
        }
      });
    
      inProgressTasks.splice(deleteElementIndex, 1);
      saveData()
}

function appendCompletedTodo(eachTodo){
    document.getElementById("totalCompletedTasks").textContent = "Completed Tasks :" + (completedTasks.length)
    let containerId = eachTodo.todoId
    let container = document.createElement("div")
    container.style.display = "flex";
    container.id = containerId
    container.style.margin = "25px";
    container.classList.add("container")
    userCompletedTaskslist.appendChild(container)
    let todo = document.createElement("div")
    todo.classList.add("each-todo")
    container.appendChild(todo)
    let para = document.createElement("h6")
    para.textContent = eachTodo["todo"]
    para.style.fontSize = "38px"  
    para.style.color = "#f00e4a"
    para.style.fontFamily = "Roboto"
    todo.appendChild(para)

    let para1 = document.createElement("p")
    para1.textContent = "Completed"
    para1.style.alignSelf = "flex-end"
    para1.style.color = "Green"
    para1.style.fontWeight = "700"
    para1.style.fontSize = "28px"
    para1.style.marginBottom = "10px"
    todo.appendChild(para1)

    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("completedbutton")
    container.appendChild(deleteButton)
    deleteButton.id = "deletebutton" + id
    deleteButton.onclick = () =>{
        document.getElementById("totalCompletedTasks").textContent = "Completed Tasks :" + (completedTasks.length-1)
           removeCompletedTask(containerId)
           saveData()
    }

}

function  appendInprogessTodo(eachTodo){
    document.getElementById("inProgressTasks").textContent = "In Progress Tasks:" + (inProgressTasks.length)
    let containerId = eachTodo.todoId
    let container = document.createElement("div")
    container.style.display = "flex";
    container.id = containerId
    container.style.margin = "25px";
    container.classList.add("container")
    inProgressTasksList.appendChild(container)
    let todo = document.createElement("div")
    todo.classList.add("each-todo")
    container.appendChild(todo)
    let para = document.createElement("h6")
    para.textContent = eachTodo["todo"]
    para.style.fontSize = "38px"  
    para.style.color = "#f00e4a"
    para.style.fontFamily = "Roboto"
    todo.appendChild(para)

    let date = document.createElement("p")
    date.textContent = "have to complete by: " + eachTodo["date"]
    date.style.alignSelf = "flex-end"
    date.style.color = "#5a07a8"
    date.style.marginBottom = "10px"
    todo.appendChild(date)

    let completedButton = document.createElement("button")
    completedButton.classList.add("completedbutton")
    container.appendChild(completedButton)
    completedButton.id = "completebutton" + id
    completedButton.onclick = () =>{
        document.getElementById("inProgressTasks").textContent = "In Progress Tasks: "+ (inProgressTasks.length-1)
          removeinProgressTask(containerId)
          completedTasks.push(eachTodo)
          appendCompletedTodo(eachTodo)
          saveData()
    }
    completedButton.textContent = "completed"
   

}

for(let eachTodo of todosList)
  createAndAppendTodo(eachTodo)
for(let eachTodo of completedTasks)
  appendCompletedTodo(eachTodo)
for (let eachTodo of inProgressTasks)
   appendInprogessTodo(eachTodo)