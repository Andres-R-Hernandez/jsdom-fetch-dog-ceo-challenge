console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', () => {
  fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => addImages(data.message))
  fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => addBreeds(data.message))

  modifyDropdown()
})

function addImages(dogArray) {
  const dogs = document.getElementById('dog-image-container')
  for (const dog of dogArray) {
    const image = document.createElement('img')
      image.src = dog
      image.height= "250"
      image.width= "250"
    dogs.appendChild(image)
  }
}

function addBreeds(breedObj) {
  const breeds = document.getElementById('dog-breeds')
  for (const breed in breedObj) {
    const subBreedArray = breedObj[breed]

    const item = document.createElement('li')
      item.innerText = breed
      item.style.color = "black"
      item.addEventListener('click', () => {
        if (item.style.color == "black") {
          item.style.color = "red"
        } else {
          item.style.color = "black"
        }})
    const ul = document.createElement('ul')

    for (const subBreed of subBreedArray) {
      const sbitem = document.createElement('li')
        sbitem.innerText = subBreed
        sbitem.style.color = "black"
        sbitem.addEventListener('click', () => {
          if (sbitem.style.color == "black") {
            sbitem.style.color = "red"
          } else {
            sbitem.style.color = "black"
          }})
      ul.appendChild(sbitem)
    }

    item.appendChild(ul)
    breeds.appendChild(item)
  }
}

function modifyDropdown() {
  const option = document.createElement('option');
    option.innerText = "all";
    option.value = "all";
    option.selected = true;
  const dropdown = document.getElementById("breed-dropdown")
    dropdown.appendChild(option);
    dropdown.addEventListener('change', (event) => {
      dogFilter(event.target.value)
    })
}

function dogFilter(value) {
  const breeds = document.querySelector('#dog-breeds').children;
  for (breed of breeds) {
    if (breed.innerHTML.charAt(0) === value || value === 'all') {
      breed.style.display = 'block';
    } else {
      breed.style.display = 'none';
    }
  }
}
