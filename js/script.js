const gallery = document.getElementById("gallery");
const body = document.querySelector("body");

// ------------------------------------------
//  FETCH FUNCTION TO GET 12 USERS
// ------------------------------------------

fetch("https://randomuser.me/api/?results=12&nat=us")
  .then((response) => response.json())
  .then((data) => generateCards(data.results));

// ------------------------------------------
//  GENERATES ALL EMPLOYEE CARDS IN GALLERY
// ------------------------------------------

function generateCards(data) {
  data.map((employee) => {
    const card = document.createElement("div");
    card.className = "card";
    gallery.appendChild(card);

    card.innerHTML = ``;

    const imageContainer = document.createElement("div");
    imageContainer.className = "card-img-container";

    const profilePic = document.createElement("img");
    profilePic.className = "card-img";
    profilePic.src = `${employee.picture.large}`;

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info-container";

    const cardEmail = document.createElement("p");
    cardEmail.className = "card-text";
    cardEmail.innerHTML = `${employee.email}`;

    const cardLocation = document.createElement("p");
    cardLocation.className = "card-text";
    cardLocation.innerHTML = `${employee.location.city}, ${employee.location.state}`;
    cardInfo.innerHTML = `<h3>${employee.name.first} ${employee.name.last}</h3>`;

    card.appendChild(imageContainer);
    imageContainer.appendChild(profilePic);
    card.appendChild(cardInfo);
    cardInfo.appendChild(cardEmail);
    cardInfo.appendChild(cardLocation);

    // ------------------------------------------
    //  MODAL LISTENER
    // ------------------------------------------

    card.addEventListener("click", () => {
      // ------------------------------------------
      //  MODAL - BEFORE HORIZONTAL RULE
      // ------------------------------------------

      const modalContainer = document.createElement("div");

      modalContainer.className = "modal-container";
      console.log(modalContainer);

      const modal = document.createElement("div");
      modal.className = "modal";

      const closeButton = document.createElement("button");
      closeButton.className = "modal-close-btn";
      closeButton.innerHTML = "X";

      const modalData = document.createElement("div");
      modalData.className = "modal-info-container";
      const modalName = document.createElement("h3");
      modalName.className = "modal-name";
      const modalPic = document.createElement("img");
      modalPic.className = "modal-img";
      modalPic.src = `${employee.picture.large}`;
      const modalTextEmail = document.createElement("p");
      const modalTextCity = document.createElement("p");
      modalTextEmail.className = "modal-text";
      modalTextCity.className = "modal-text";
      modalName.innerHTML = `${employee.name.first} ${employee.name.last}`;
      modalTextEmail.innerHTML = `${employee.email}`;
      modalTextCity.innerHTML = `${employee.location.city}`;
      const hr = document.createElement("hr");

      body.appendChild(modalContainer);
      modalContainer.appendChild(modal);
      modal.appendChild(modalData);
      modal.appendChild(closeButton);
      modalData.appendChild(modalPic);
      modalData.appendChild(modalName);
      modalData.appendChild(modalTextEmail);
      modalData.appendChild(modalTextCity);
      modalData.appendChild(hr);

      //  DATE FORMATTING TO INTL STANDARD OF DD-MM-YYYY, SNIPPET FROM STACKOVERFLOW.COM AND MODIFIED FOR THIS PROJECT

      let date = new Date(employee.dob.date);
      date = date.toISOString().slice(0, 10);

      function formatDate(input) {
        const newDate = input.match(/\d+/g),
          year = newDate[0].substring(0, 4),
          month = newDate[1],
          day = newDate[2];
        return month + "/" + day + "/" + year;
      }

      //  CELL PHONE FORMATTING FOR US NUMBERS, SNIPPET FROM STACKOVERFLOW.COM AND MODIFIED FOR THIS PROJECT

      let cellPhone = `${employee.cell}`;
      cellPhone = cellPhone
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

      // ------------------------------------------
      //  MODAL - AFTER HORIZONTAL RULE
      // ------------------------------------------

      const phone = document.createElement("p");
      phone.className = "modal-text";
      phone.innerHTML = `${cellPhone}`;
      const address = document.createElement("p");
      address.className = "modal-text";
      address.innerHTML = `${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
      const birthday = document.createElement("p");
      birthday.className = "modal-text";
      birthday.innerHTML = `Birthday: ${formatDate(date)}`;

      modalData.appendChild(phone);
      modalData.appendChild(address);
      modalData.appendChild(birthday);

      // ------------------------------------------
      //  CLOSE LISTENER
      // ------------------------------------------

      closeButton.addEventListener("click", (event) => {
        if (event.target) {
          modal.style.display = "none";
          modalContainer.className = "";
        }
      });
    });
  });
}
