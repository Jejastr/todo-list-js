const input = document.querySelector(".input")
const button = document.querySelector(".add")
const list = document.querySelector(".list")

let fruits = []

const data = localStorage.getItem("fruits")

if (data) {
  fruits = JSON.parse(data)
}

function render() {
  list.innerHTML = ''

  fruits.forEach(fruit => {
    const li = document.createElement('li')
    li.textContent = fruit
    list.appendChild(li)
  })
}

render()

button.addEventListener('click',() => {
  const value = input.value.trim()

  if(value === '') return

  fruits.push(value)

  localStorage.setItem('fruits', JSON.stringify(fruits))

  render()

  input.value = ''
})

console.log(fruits)