// 1. feladat - 1. változat
const input = ['apple', 'banana 66', 'cherry 10', '3', '42', '7']
const pattern = /\d/
const output = input.filter( e => pattern.test(e))
console.log(output)

// 1. feladat 2. változat
function convertToDigits(arr) {
    const arrModified = arr.filter( e => pattern.test(e))
    return arrModified
}
const output2 = convertToDigits(input)
console.log(output2)

// 2. feladat, 1. változat
document.querySelector('button').onclick = () => {
    const countryStringByUser = document.querySelector('input').value || "hu"
    const list = document.querySelector('#list')
    list.innerHTML = ""
    fetch(`https://restcountries.com/v3.1/name/${countryStringByUser}`)
        .then(res => res.json())
        .then(res => {
            res.forEach(country => {
                let capital
                if(!country.capital) {
                    capital =  "no-capital-info"
                } else {
                    capital = country.capital[0]
                }

                list.innerHTML += `
                <li
                    onclick='toggleDetails(${country.name.common})'
                >
                    ${country.name.common}
                    <ul id='${country.name.common}' class='details'>
                        <li>Főváros: ${capital}</li>
                        <li>Népeség: ${country.population} fő</li>
                        <li>Terület: ${country.area} km<sup>2<sup></li>
                    </ul>
                </li>`
            });
        })
}

function toggleDetails(country) {
    const element = document.querySelector(`#${country.id}`)
    if(element.style.display === "block") {
        element.style.display = "none"
    } else {
        element.style.display = "block"
    }
}

// 2. feladat, 2. változat

class ShowCountries {

    constructor(countryStringByUser) {
        this.getCountries(countryStringByUser)
    }

    displayCountries(res) {
        const list = document.querySelector('#list2')
        list.innerHTML = ""
        res.forEach(country => {
            let details
            if(!country.capital) {
                details = country.name.common + ", " + country.flags.png + ", " + "no-capital-info" + ", " + country.population + ", " + country.area
            } else {
                details = country.name.common + ", " + country.flags.png + ", " + country.capital + ", " + country.population + ", " + country.area
            }

            list.innerHTML += `
            <li 
                data-details='${details}') 
                class="btn m-3 countryNames"
                data-bs-toggle="modal" 
                data-bs-target="#itemModal"
                style="background: rgb(59, 59, 119); color: white;"
            >
                ${country.name.common}
            </li>`
        })

        document.querySelectorAll('.countryNames').forEach((element)=> {
            element.addEventListener('click', function(){
                let detailsArr = element.dataset.details.split(", ")
                document.querySelector('#itemModal .modal-title').innerHTML= detailsArr[0]
                document.querySelector('#itemModal .modal-body-img>img').src= detailsArr[1]
                document.querySelector('#itemModal .modal-body-img>img').alt= detailsArr[0]
                document.querySelector('#itemModal .modal-body-capital').innerHTML= detailsArr[2]
                document.querySelector('#itemModal .modal-body-population').innerHTML= detailsArr[3] + " fő"
                document.querySelector('#itemModal .modal-body-area').innerHTML= detailsArr[4] + " km<sup>2</sup>"
            })
        }) 

    }

    getCountries(countryStringByUser) {
        fetch(`https://restcountries.com/v3.1/name/${countryStringByUser}`)
        .then(res => res.json())
        .then(res => {
            this.displayCountries(res)
        })
    }
}

let timeout;
document.querySelectorAll('input')[1].oninput = (e) => {
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(()=> new ShowCountries(e.target.value), 1300)
}

