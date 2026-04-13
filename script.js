const button = document.querySelector('.button') // Отримую кнопку
const input = document.querySelector('.text')  // Отримую інпут
const list = document.querySelector('.list') // отримую список
// Додаю слухач подій на кнопку
button.addEventListener('click', () => {
  const text = input.value.trim() // Видаляю пробіли
 //Ящо текст пустий виходим з функції
  if(text === '') { 
    return
  }

  const elementLi = document.createElement('li') // Створюю елемент
  elementLi.textContent = text //Наповнюю його
  list.appendChild(elementLi) // Додаю цей елемент в список
  input.value = '' // Очищую інпут
  input.focus() // Додаємо фокус знову на список
})

// Додаю слухач подій на клаву.
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    button.click() //Викликаю метод .click на кнопці, що отримав.
  }
})