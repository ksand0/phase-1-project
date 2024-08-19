document.addEventListener('DOMContentLoaded', () => {
    console.log('JS is connected and logged')

    let addFragrance = false;

    const addBtn = document.getElementById("add-to-collection-btn")
    const submitFormContainer = document.getElementById("submit-form-container")

    addBtn.addEventListener('click', () => {
        addFragrance = !addFragrance
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
    
}

function handleFormSubmit(){

}

