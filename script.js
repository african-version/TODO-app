const inputBox = document.querySelector('.inputData');
const addBtn = document.querySelector('.enter');
const todoList = document.querySelector('.tasks')
const deleteAllBtn = document.querySelector('.delete')
var deleteOne = document.querySelector('.deleteOne')

//onkeyup event
inputBox.onkeyup = (event)=> {
    var val = event.target.value
    //let userEnteredValue = inputBox.value;
  
    if (val.length> 0) {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
}

showTasks ();
// if user clicks on the add button
addBtn.onclick = ()=> {  //when user clicks on plus icon
    
    var deleteOne = document.querySelector('.deleteOne')
    console.log(deleteOne)
    let userEnteredValue = inputBox.value; //getting user entered value
    
    let getLocalStorageData = localStorage.getItem('New Task'); //getting localstorage
    if (getLocalStorageData == null) { //if localstorage is null
        listArray = []; //creating blank array
    } else {
        listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    }
    console.log(listArray)
    listArray.push(userEnteredValue); //pushing or adding user data
    localStorage.setItem('New Task', JSON.stringify(listArray)); //transforming js object into a json sring
    showTasks(); //calling showTask
    addBtn.classList.remove('active'); //unactive the add button once the task is added
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem('New Task'); //getting localstorage
    if (getLocalStorageData == null) { //if localstorage is null
        listArray = []; //creating blank array
    } else {
        listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
    let newLiTag = '';
    listArray.forEach((element, index) => {
        newLiTag += `<li> ${element} <span><button onClick="deleteTask()" class="deleteOne"> <i class="fas fa-trash"></i></button></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = '';
}
// delete task function
function deleteTask(index){
    console.log(index)
    let getLocalStorageData = localStorage.getItem('New Task');
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem('New Task', JSON.stringify(listArray));
    showTasks(); //call the showTasks function
  }
  
  // delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArray = []; //empty the array
    localStorage.setItem('New Task', JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
  }