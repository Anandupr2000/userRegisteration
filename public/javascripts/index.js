let form = document.getElementById('userDetails')
// console.log(form)
form.addEventListener("submit",e=>{
    console.log("form submitted")
    console.log(e.target['uname'].value)
    console.log(e.target['address'].value)
    e.preventDefault()
})