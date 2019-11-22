console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const writePOne = document.querySelector('#firstP')
const writePTwo = document.querySelector('#secondP')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    writePOne.textContent = 'Loading...'
    writePTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                writePOne.textContent = data.error
            } else {
                writePOne.textContent = data.location
                writePTwo.textContent = data.forecast.summmary
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
    console.log(location)
})