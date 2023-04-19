var userName = document.getElementById("name");
var email = document.getElementById("email");
//let id=document.getElementsByClassName("hidden");
let idValue=document.getElementById("hidden");

var list = document.getElementById("appointments")
var submit = document.getElementById("form");

window.addEventListener('DOMContentLoaded', getAppointment);
list.addEventListener('click', DeleteAppointment)
list.addEventListener('click',editAppointment)

function getAppointment() {
    axios.get('https://crudcrud.com/api/a0b055c252d34ae7b39afcf4e3ae6c45/appointment')
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

submit.addEventListener('submit', storingToLocalStorage);

function storingToLocalStorage(e) {
    e.preventDefault();

    if(idValue.value){

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


// function showOn(obj) {

//     let parentElement = document.getElementById('appointments');
//     let childElement = document.createElement('li');
//     childElement.innerHTML = obj.name + ' - ' + obj.email;

//     parentElement.appendChild(childElement);
//     console.log(childElement);
//     const dltbtn = document.createElement('input');
//     dltbtn.type = 'button';
//     dltbtn.value = 'Delete';
//     dltbtn.className = 'delete';
//     childElement.appendChild(dltbtn);
//     dltbtn.onclick = () => {
//         DeleteAppointment();
//         localStorage.removeItem(obj.name);
//         parentElement.removeChild(childElement);
//     }
//     const edtbtn = document.createElement('input');
//     edtbtn.type = 'button';
//     edtbtn.value = 'Edit';
//     edtbtn.className = 'edit';
//     edtbtn.onclick = () => {
//         localStorage.removeItem(obj.name);
//         parentElement.removeChild(childElement);
//         document.getElementById('name').value = obj.name;
//         document.getElementById('email').value = obj.email;

//     }
//     childElement.appendChild(edtbtn);
// }

function post(obj) {

    axios.post("https://crudcrud.com/api/a0b055c252d34ae7b39afcf4e3ae6c45/appointment", obj)
        .then((response) => {
            let output = `<li id="${response.data._id}">
             ${response.data.name} ${response.data.email}
            <button class="delete">delete</button>
            <button class="edit">edit</button>
        </li>`;

                list.innerHTML += output;
                userName.value="";
                email.value="";

           console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
}

function DeleteAppointment(e) {
    if (e.target.classList.contains('delete')) {
        
        const item =e.target.parentElement;
        const id = item.getAttribute('id');

        axios.delete(`https://crudcrud.com/api/a0b055c252d34ae7b39afcf4e3ae6c45/appointment/${id}`)
            .then((response) => {
                item.remove();
            }).catch(err => console.log(err));
    }
}



function editAppointment(e) {
    if (e.target.classList.contains('edit')) {
        
        const item =e.target.parentElement;
        const id = item.getAttribute('id');

        axios.get(`https://crudcrud.com/api/a0b055c252d34ae7b39afcf4e3ae6c45/appointment/${id}`)
            .then((response) => {
              userName.value=response.data.name;
              email.value=response.data.email;
              idValue.value=response.data._id;
            }).catch(err => console.log(err));
    }
}


