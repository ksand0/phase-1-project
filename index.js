let addFragrance = false;

document.addEventListener('DOMContentLoaded', () => {
    console.log('JS is connected and logged')

    const addBtn = document.getElementById("add-to-collection-btn")
    const submitFormContainer = document.getElementById("submit-form-container")

    addBtn.addEventListener('click', () => {
        addFragrance = !addFragrance;
        if (addFragrance) {
            submitFormContainer.style.display = "block";
        } else {
            submitFormContainer.style.display = "none"
        }
    })

    fetchFragrances();

    const fragranceSubmitForm = document.querySelector(".fragrance-submit-form")
    fragranceSubmitForm.addEventListener('submit', handleFormSubmit)
})

function fetchFragrances(){
    fetch('http://localhost:3000/fragrances')
    .then(res => res.json())
    .then(fragrances => {
        fragrances.forEach(fragrance => renderFragrance(fragrance))
    })
}


function handleFormSubmit(event){
    event.preventDefault()
    const fragranceSubmitForm = event.target
    const fragranceImg = fragranceSubmitForm.image.value
    const fragranceName = fragranceSubmitForm.name.value
    const fragranceBrand = fragranceSubmitForm.brand.value
    const fragranceNotes = fragranceSubmitForm.notes.value

    const newFragrance = {
        image : fragranceImg,
        name : fragranceName,
        brand : fragranceBrand,
        notes: fragranceNotes
    }

    fetch('http://localhost:3000/fragrances', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newFragrance)
    })
    .then(res => res.json())
    .then(fragrance => {
        renderFragrance(fragrance);
        fragranceSubmitForm.reset();
        submitFormContainer.style.display = "none";
        addFragrance = false;
    })
}


function renderFragrance(fragrance){
    const fragranceDisplay = document.getElementById('fragrance-display')

    const fragranceCard = document.createElement("div");
    fragranceCard.className = "card"

    const fragranceImg = document.createElement('img')
    fragranceImg.className = "fragranceImage"
    fragranceImg.src = fragrance.image;
    fragranceImg.className = "fragrance-avatar";

    const fragranceName = document.createElement('h1')
    fragranceName.className = "fragranceName"
    fragranceName.innerText = fragrance.name;

    const fragranceBrand = document.createElement('h2')
    fragranceBrand.className = "fragranceBrand"
    fragranceBrand.innerText = fragrance.brand;

    const fragranceNotes = document.createElement('p')
    fragranceNotes.className = "fragranceNotes"
    fragranceNotes.innerText = fragrance.notes;

    const deleteButton = document.createElement('button')
    deleteButton.className = "deleteButton"
    deleteButton.innerText= 'remove';
    deleteButton.id = fragrance.id;
    deleteButton.addEventListener('click', handleDelete);

    fragranceCard.append(fragranceImg, fragranceName, fragranceBrand, fragranceNotes, deleteButton)
    fragranceDisplay.appendChild(fragranceCard)
}

function handleDelete(event){
    const button = event.target;
    const fragranceId = button.id;

    fetch(`http://localhost:3000/fragrances/${fragranceId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(() => {
        button.parentElement.remove()
    });
}