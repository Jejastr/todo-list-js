const button = document.querySelector(".button") // Отримую кнопку
const input = document.querySelector(".text") // Отримую інпут
const list = document.querySelector(".list") // Отримую список

let todos = []

const data = localStorage.getItem("todos")

if (data) {
  todos = JSON.parse(data)
}

function render() {
  list.innerHTML = ""

  todos.forEach((todo) => {
    const li = document.createElement("li") // Створюю елемент
    li.classList.add("todo-item")

    const textSpan = document.createElement("span")
    textSpan.classList.add("todo-text")
    textSpan.textContent = todo.text


    const actions = document.createElement("div")
    actions.classList.add("actions")

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-btn")
    deleteBtn.textContent = "X"

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("done-btn")
    doneBtn.textContent = "Done"

    actions.appendChild(doneBtn)
    actions.appendChild(deleteBtn)

    li.appendChild(textSpan)
    li.appendChild(actions)

    list.appendChild(li)
  })
}

render()

// Додаю слухач подій на кнопку
button.addEventListener("click", () => {
  const text = input.value.trim() // Отримаю значення інпуту та видаляю пробіли
  //Якщо текст пустий виходим з функції
  if (text === "") {
    return
  }

  todos.push({
    text: text,
    completed: false,
  })

  localStorage.setItem("todos", JSON.stringify(todos))

  render()


  input.value = "" // Очищую інпут
  input.focus() // Додаємо фокус знову на список

  
})

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("li").remove()
  }

  if (e.target.classList.contains("done-btn")) {
    e.target
      .closest("li")
      .querySelector(".todo-text")
      .classList.toggle("completed")
  }
})

// Додаю слухач подій на клаву.
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click() // Викликаю метод .click на кнопці, що вже створи.
  }
})

// Створити - виконання та видалення зі списку.
console.log(todos)
