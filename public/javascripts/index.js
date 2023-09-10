let form = document.getElementById('userDetails')
// for adding maximum 3 address 
let addressCount = 1

// console.log(form)
form.addEventListener("submit",e=>{
    // e.preventDefault()
    // console.log(e.target)
    // window.location.reload()
})



const renderInputs = () => {
    let inputs = document.querySelectorAll(`input`)
    for (let i in inputs) {
        // console.log(inputs[i])
        let label = inputs[i].nextElementSibling
        inputs[i].addEventListener('focusin', (e) => {
            label.style.scale = 0.9
            label.style.transform = "translateY(-100%)"
            label.style.background = "white"
            label.style.color = "#00B7FF"
        })
        inputs[i].addEventListener('change', (e) => {
            //inputs[i].nextElementSibling.style.background = (e.target.value) ? "white" : "transparent"
            label.style.scale = 0.9
            label.style.transform = "translateY(-100%)"
            label.style.background = "white"
            label.style.color = "#00B7FF"
        })
        inputs[i].addEventListener('focusout', (e) => {
            label.style.scale = (e.target.value) ? "0.9" : "1"
            label.style.transform = (e.target.value) ? "translateY(-100%)" : "translateY(0)"
            label.style.background = (e.target.value) ? "white" : "transparent"
            label.style.color = (e.target.value) ? "#00B7FF" : "gray"
        })
    }
}
renderInputs()
function addAddress(e) {
    if (addressCount < 3) {
        // console.log(addressCount)
        let div = document.querySelector('form>div')
        const addressDiv = document.createElement('div');
        addressDiv.className = 'addressDiv';
        addressDiv.innerHTML = `
                <h6>Address ${++addressCount}</h6>
            <div>
                <div class="formElement">
                    <input type="text" id="block${addressCount}" name="block${addressCount}" class="form-control border border-info" />
                    <label class="form-label ps-2 pe-2 " for="block${addressCount}">Block</label>
                </div>
                <div class="formElement">
                    <input type="text" id="street${addressCount}" name="street${addressCount}" class="form-control border border-info" />
                    <label class="form-label ps-2 pe-2 " for="street${addressCount}">Street</label>
                </div>
            </div>
            <div>
                <div class="formElement">
                    <input type="text" id="city${addressCount}" name="city${addressCount}" class="form-control border border-info" />
                    <label class="form-label ps-2 pe-2 " for="city${addressCount}">City</label>
                </div>
                <div class="formElement">
                    <input type="text" id="state${addressCount}" name="state${addressCount}" class="form-control border border-info" />
                    <label class="form-label ps-2 pe-2 " for="state${addressCount}">State</label>
                </div>
                <div class="formElement">
                    <input type="text" id="country${addressCount}" name="country${addressCount}" class="form-control border border-info" />
                    <label class="form-label ps-2 pe-2" for="country${addressCount}">Country</label>
                </div>
            </div>
            `
        div.appendChild(addressDiv)
        document.getElementById("addressCountInput").value = addressCount
        renderInputs()
    }
    // after 3 address div displayed hide add btn 
    if (addressCount == 3)
        e.target.style.display = "none"
}
const handleFormSubmit = (e) => {
    e.target.clear()
    e.preventDefault()
}