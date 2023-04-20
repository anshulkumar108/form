var userName = document.getElementById("name");
var email = document.getElementById("email");
//let id=document.getElementsByClassName("hidden");
let idValue = document.getElementById("hidden");

var list = document.getElementById("appointments")

var editbtn = document.getElementById('edit');

var submit = document.getElementById("form");

window.addEventListener('DOMContentLoaded', getAppointment);
list.addEventListener('click', DeleteAppointment)
list.addEventListener('click', editAppointment)
//list.addEventListener('click',editUserDetails)

submit.addEventListener('submit', storingToLocalStorage);


function storingToLocalStorage(e) {
    e.preventDefault();

    if (idValue.value) {

    }
    var name = userName.value;
    var email = e.target.email.value;

    //  localStorage.setItem('Name', name);
    //  localStorage.setItem('email', email)


    const obj = { name, email };
    localStorage.setItem(obj.email, JSON.stringify(obj));

    // showOn(obj);
    post(obj);

}

function post(obj) {

    axios.post("https://crudcrud.com/api/9c896d0793b5499ebee22b039d2d7ce1/appointment", obj)
        .then((response) => {
            let output = `<li id="${response.data._id}">
             ${response.data.name} ${response.data.email}
            <button class="delete">delete</button>
            <button class="edit" )>edit</button>
        </li>`;

            list.innerHTML += output;
            userName.value = "";
            email.value = "";

            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
}

function getAppointment() {
    axios.get('https://crudcrud.com/api/9c896d0793b5499ebee22b039d2d7ce1/appointment')
        .then((response) => {

            response.data.forEach(element => {
                let output = `<li id="${element._id}">
             ${element.name} ${element.email}
            <button class="delete">delete</button>
            <button class="edit">edit</button>
        </li>`;

                list.innerHTML += output;
            });
        })
}

function DeleteAppointment(e) {
    if (e.target.classList.contains('delete')) {

        const item = e.target.parentElement;
        const id = item.getAttribute('id');

        axios.delete(`https://crudcrud.com/api/9c896d0793b5499ebee22b039d2d7ce1/appointment/${id}`)
            .then((response) => {
                item.remove();
            }).catch(err => console.log(err));
    }
}



function editAppointment(e) {
    if (e.target.classList.contains('edit')) {

        const item = e.target.parentElement;
        const id = item.getAttribute('id');

        axios.get(`https://crudcrud.com/api/9c896d0793b5499ebee22b039d2d7ce1/appointment/${id}`)
            .then((response) => {
                userName.value = response.data.name;
                email.value = response.data.email;
                idValue.value = response.data._id;
            }).catch(err => console.log(err));
    }
}

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete'))
        editUserDetails(e, false);

    if (e.target.classList.contains('edit'))
        editUserDetails(e, true);
})

function  editUserDetails(e) {
    let userData = e.target.parentElement.innerText;
    //console.log(userData);
   list.removeChild(e.target.parentElement);

}