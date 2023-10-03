const btnAdd = document.querySelector('.menu button')
const btninput = document.querySelector('#inputTask')
const listTask = document.querySelector('.list-task')
const btnTrash = document.querySelector(".trash")

const toggleButton = document.getElementById("toggle-dark-mode");
const bodyElement = document.body

let myListItems = []

function addTask() {
    myListItems.push({
        task: btninput.value,
        complete: false
    })
    btninput.value = '';
    showTask()
}

function showTask() {
    let newArray = ' ';

    myListItems.forEach((item, index) => {
        newArray += `
            <li class="task ${item.complete ? 'done' : ''}">
                <button class="check"><img src="./assets/check.png" alt="image-button-check" onclick="checkitems(${index})"></button>
                <p>${item.task}</p>
                <button class="trash"> <img src="./assets/trash-can.png" alt="image-button-trash" onclick="deleteItem(${index})"></button>
            </li>
        `
    })

    listTask.innerHTML = newArray

    localStorage.setItem('list', JSON.stringify(myListItems))
}

function deleteItem(index) {
    myListItems.splice(index, 1);
    showTask()
}

function checkitems(index) {
    myListItems[index].complete = !myListItems[index].complete;
    showTask()
}

function toggleDarkMode() {
    bodyElement.classList.toggle("dark-mode");
    const darkModeEnabled = bodyElement.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', darkModeEnabled ? 'enabled' : 'disabled');
}

toggleButton.addEventListener('click', toggleDarkMode);
btnAdd.addEventListener('click', addTask)

function loadItems() {
    const taskLocalStorage = localStorage.getItem('list')

    myListItems = JSON.parse(taskLocalStorage) || [];

    const darkModeLocalStorage = localStorage.getItem('dark-mode');
    
    if (darkModeLocalStorage === 'enabled') {
        bodyElement.classList.add('dark-mode');
    } else {
        bodyElement.classList.remove('dark-mode');
    }
    
    showTask();
}

loadItems();


