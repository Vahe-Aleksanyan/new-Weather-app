console.log("client side javascript")




// store the html form here
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// say what should happen if someone enters form
weatherForm.addEventListener('submit', (e) => {

    // prevents refrashing the browser
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "loading.."
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }

        })
    })
})