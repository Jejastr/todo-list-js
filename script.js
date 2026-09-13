const button = document.querySelector(".button"); // Отримую кнопку
const input = document.querySelector(".text"); // Отримую інпут
const list = document.querySelector(".list"); // Отримую список

let todos = loadTodos();

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
}

function render() {
  list.innerHTML = "";
  if (todos.length === 0) {
    list.innerHTML = '<li class="empty">Список порожній 📝</li>';
    return;
  }
  todos.forEach((todo) => {
    const li = createTodoElement(todo);
    list.appendChild(li);
  });
}

render();
// Додаю слухач подій на кнопку
button.addEventListener("click", () => {
  const text = input.value.trim(); // Отримаю значення інпуту та видаляю пробіли
  //Якщо текст пустий виходим з функції
  if (text === "") {
    return;
  }

  todos.push({
    id: Date.now(),
    text: text,
    completed: false,
  });

  updateUi();

  input.value = ""; // Очищую інпут
  input.focus(); // Додаємо фокус знову на список
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);

    todos = todos.filter((todo) => todo.id !== id);

    updateUi();
  }

  if (e.target.classList.contains("todo-text")) {
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);
    const oldText = e.target.textContent;

    // 1. Створюємо тимчасовий input і підставляємо поточний текст
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldText;
    // 2. Замінюємо span на input
    e.target.replaceWith(input);
    input.focus();
    // 3. Клавіша Enter просто знімає фокус (тригерить подію blur)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.blur();
      }
    });
    // 4. Подія втрати фокусу (завершення редагування)
    input.addEventListener("blur", () => {
      const text = input.value.trim();
      // Оновлюємо текст у масиві, якщо текст не пустий
      if (text) {
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              text, // скорочена форма запису text: text
            }
          }
          return todo
        })
      }
      /* Незалежно від того, чи змінився текст, 
      updateUi() викличе render(), який поверне гарний <span> замість <input> */
      updateUi()
    })
  }

  if (e.target.classList.contains("done-btn")) {
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);

    todos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    updateUi();
  }
});

// Додаю слухач подій на клаву.
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click(); // Викликаю метод .click на кнопці, що вже створи.
  }
});

// Створити - виконання та видалення зі списку.

// Створюємо функцію в якій ми будуємо повноціний елемент lі та повертаємо його, щоб ми могли його перевикористовувати і так далі.

function createTodoElement(todo) {
  const li = document.createElement("li"); // Створюю елемент
  li.classList.add("todo-item");
  li.dataset.id = todo.id;

  const textSpan = document.createElement("span");
  textSpan.classList.add("todo-text");
  textSpan.textContent = todo.text;

  if (todo.completed) {
    textSpan.classList.add("completed");
  }

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "X";

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-btn");
  doneBtn.textContent = "Done";

  actions.appendChild(doneBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(textSpan);
  li.appendChild(actions);

  return li;
}

function updateUi() {
  saveTodos();
  render();
}
