const gallery = document.getElementById('gallery')
const body = document.querySelector('body')
console.log(body)

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => generateCards(data.results))

// ------------------------------------------
//  HELPER FUNCTION
// ------------------------------------------

function generateCards(data){

  data.map(employee => {
  const card = document.createElement('div')
  card.className = 'card'
  gallery.appendChild(card)

card.innerHTML =`

`;
const imageContainer = document.createElement('div')
imageContainer.className = 'card-img-container'
card.appendChild(imageContainer)

const profilePic = document.createElement('img')
profilePic.className = 'card-img'
imageContainer.appendChild(profilePic)
profilePic.src = `${employee.picture.large}`

const cardInfo = document.createElement('div')
card.appendChild(cardInfo)
cardInfo.className = 'card-info-container'
cardInfo.innerHTML = `<h3>${employee.name.first} ${employee.name.last}</h3>
                      <p>${employee.email}</p>
                      <p>${employee.location.city}, ${employee.location.state}</p>`
                      console.log(card)

  card.addEventListener('click', (event) =>{
    const modalContainer = document.createElement('div')
    body.appendChild(modalContainer)
    modalContainer.className ='modal-container'
    console.log(modalContainer)

    const modal = document.createElement('div')
    modalContainer.appendChild(modal)
    modal.className ='modal'

    const modalData = document.createElement('div')
    modal.appendChild(modalData)
    modalData.className = 'modal-info-container'

    const modalPic = document.createElement('img')
    modalPic.className = 'modal-img'
    modalData.appendChild(modalPic)
    console.log(modalPic)
    modalPic.src =`${employee.picture.large}`
    modalData.innerHTML = `<h3>${employee.name.first} ${employee.name.last}</h3>`
    event.target.style.display = 'flex'

    })
})
}

