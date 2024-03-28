const BASE_URL = "https://dog.ceo/api/breeds";
const BASE_URL2 = "https://dog.ceo/api/breed"
const RANDOM_IMAGE_URL = `${BASE_URL}/image/random`;
const ALL_BREEDS_URL = `${BASE_URL}/list/all`;
const images = 'images'
const list_cont = document.getElementById('list_cont')
const button = document.getElementById("button")
const showBridsButton = document.getElementById("but")
const breedContainer = document.getElementById('container')
const image = document.getElementById("img")
const body = document.getElementsByTagName('body')
button.addEventListener("click", () => {
    const request = new XMLHttpRequest()
    request.open("GET", RANDOM_IMAGE_URL)
    request.send()
    request.addEventListener("load", () => {
        image.src = JSON.parse(request.response).message
    })
})
function tenPic(url){
    breedContainer.innerHTML = ''
    const xml = new XMLHttpRequest()
    xml.open('GET',`${BASE_URL2}/${url}/${images}`)
    xml.send()
    xml.addEventListener('load',function(){
        let array = JSON.parse(xml.response).message
        array.slice(0,10).forEach(url => {
            let img = document.createElement('img')
            img.src = url
            breedContainer.append(img)
        });
    })
}
function onShowBridsButtonClick() {
    const xml = new XMLHttpRequest()
    xml.open("GET", ALL_BREEDS_URL)
    xml.send()
    xml.addEventListener('load', () => {
        const breedsObj = JSON.parse(xml.response).message
        for(let breed in breedsObj) {
            const li = document.createElement('li') 
            li.append(breed)
            list_cont.append(li)
            li.addEventListener('click',function(){
                tenPic(li.textContent)
            })
        }
    })
}
showBridsButton.addEventListener('click', onShowBridsButtonClick)
