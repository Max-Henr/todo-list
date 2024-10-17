const form = document.querySelector('#inputForm')
const listDiv = document.querySelector('.listContainer')
const todoList = document.createElement('ul')
todoList.classList.add('list')

let todoArray = JSON.parse(localStorage.getItem('todoArray')) || []
document.addEventListener('DOMContentLoaded', () => {
    todoArray.forEach(item => {
        const newList = creatListItems(item.text);

        // Set the active state if the item was previously active
        if (item.active) {
            newList.classList.add('active');
            newList.style.color = '#a9cbb7'; // Apply the active color
        }

        listDiv.appendChild(newList);
    });
})
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const inputElement = document.querySelector('#inputList')
    if(inputElement.value === '') return
    const capitalizedInput = capitalizeFirstLetter(inputElement.value);
    if(todoArray.some(item => item.text === capitalizedInput)){
        inputElement.value = ''
        return
    } 
    
    const newList = creatListItems(capitalizedInput);
    todoArray.push({ text: capitalizedInput, active: false });
    console.log(todoArray);
    listDiv.appendChild(newList)
    inputElement.value = ''

    saveLocalStorage()
})



function creatListItems(value){ 
    const listItems = document.createElement('li')
    const taskText = document.createElement('span');
    taskText.textContent = value;
    const buttonRemove = document.createElement('button')
    buttonRemove.classList.add('btnRemove')

    listItems.appendChild(taskText)
    listItems.appendChild(buttonRemove)

    listItems.addEventListener('click', () =>{
        toggleActive(listItems,value)
    })

    buttonRemove.addEventListener('click', () =>{
        removeList(listItems,value)
    })  


    return listItems
}
function toggleActive(listItems,value){
    listItems.classList.toggle('active')
        updateTodoArray(value, listItems.classList.contains('active'))
        if(listItems.classList.contains('active')){
            listItems.style.color = '#a9cbb7'
        }else{
            listItems.style.color = ''
        }
        saveLocalStorage()
}
function removeList(listItems,value){
    listItems.remove()
    removeTodoArray(value)
    saveLocalStorage()
}
function capitalizeFirstLetter(input) {
    if (!input) return '';
    return input.charAt(0).toUpperCase() + input.slice(1)
}
function updateTodoArray(value, isActive) {
    console.log(isActive)
    const index = todoArray.findIndex(item => item.text === value)
    if (index !== -1) {
        todoArray[index].active = isActive
    }
    console.log(todoArray) 
}
function removeTodoArray(value){
    const index = todoArray.findIndex(item => item.text === value)
    if (index !== -1) {
        todoArray.splice(index, 1);
    }
    console.log(todoArray)
}
function saveLocalStorage(){
    localStorage.setItem('todoArray', JSON.stringify(todoArray))
}