import { postDatas, deleteById, getDatas, patchById, getDataById } from "./requests.js";
import { users } from './baseURL.js'
const table = document.querySelector(".table")
const tbody = document.querySelector("tbody")
const getdata = document.querySelector(".getdata")
const inpName = document.querySelector(".impName")
const impSurname = document.querySelector(".inpSurname")
const inpAge = document.querySelector(".inpAge")
const saveBtn = document.querySelector(".saveBtn")
let modal = document.querySelector(".modal-body");
const saveData = document.querySelector(".saveData");

async function createTable() {
   
    data.forEach((elem) => {
        let tr = document.createElement("tr");
        let Idtd = document.createElement("td");
        let nametd = document.createElement("td");
        let usernametd = document.createElement("td");
        let agetd = document.createElement("td");
        let deletetd = document.createElement("td");
        let deleteBtn = document.createElement("button");
        let edittd = document.createElement("td");
        let editBtn = document.createElement("button");
        let getData = document.querySelector(".getData");

        deleteBtn.setAttribute("data", elem.id);
        editBtn.setAttribute("data", elem.id);
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#exampleModal");

        deleteBtn.className = "btn btn-danger";
        editBtn.className = "btn btn-success"


        Idtd.innerText = elem.id;
        nametd.innerText = elem.name;
        usernametd.innerText = elem.surname;
        agetd.innerText = elem.age;

        deleteBtn.innerText = "Delete";
        editBtn.innerText = "Edit";

        deleteBtn.addEventListener("click", (e) => {
            deleteById(users, e.target.getAttribute("data"));
            e.target.parentElement.parentElement.remove();
        });
        deletetd.append(deleteBtn);
        edittd.append(editBtn);

        tr.append(Idtd, nametd, usernametd, agetd, deletetd, edittd);
        table.append(tr);

        editBtn.addEventListener("click", async (e) => {
            let elem = await getDataById(users, e.target.getAttribute("data"));
            console.log(elem);
            modal.innerHTML = ` 
                  <p>Id <span class="elemId">${elem.id}</span></p>
                    <div class="form-group">
                      <label for="productTitle">Name:</label>
                      <input class="elemName" type="text" value=${elem.name}>
                    </div>
                    <div class="form-group">
                      <label for="productImg">Surname:</label>
                      <input class="elemSurname" type="text" value=${elem.surname}>
                    </div>
                    <div class="form-group">
                      <label for="productPrice">Age:</label>
                      <input class="elemAge" type="text" value=${elem.age}>
                    </div>
               `;
        });
    });


}

let data = await getDatas(users);
createTable(data);
getdata.addEventListener("click", async (e) => {
})

saveData.addEventListener("click", async () => {
    const id = document.querySelector(".elemId");
    const name = document.querySelector(".elemName");
    const surname = document.querySelector(".elemSurname");
    const age = document.querySelector(".elemAge");

    let obj = await getDataById(users, id.innerText);

    obj.name = name.value;
    obj.surname = surname.value;
    obj.age = age.value;

    await patchById(users, id.innerText, obj);
});

// let tbody = document.querySelector(".tbody")
// let getBtn = document.querySelector(".getdata")
// let addBtn = document.querySelector(".addata")
// let deleteBtn = document.querySelector(".deletedata")

// function createTable(data) {
//     data.forEach((element) => {
//         tbody.innerHTML += `
//         <tr class="userrow">
//         <td>${element.id}</td>
//         <td>${element.username}</td>
//         <td>${element.lastname}</td>
//         <td>${element.age}</td>
//         </tr>
//         `;
//     });
// }

// async function getUsers() {
//     return await axios
//         .get("http://localhost:3000/users")
//         .then((res) => createTable(res.data))
//         .catch((error) => {
//             // throw new Error("Failed to fetch data:" + error);
//         });
// }
// getBtn.addEventListener("click", getUsers);

// let modal = document.querySelector(".postmodal")

// addBtn.addEventListener("click", function () {
//     modal.classList.remove("d-none");
// });

// let form = document.querySelector(".form")

// async function createUser(e) {
//     e.preventDefault();

//     let username = document.querySelector(".username").value;
//     let lastname = document.querySelector(".lastname").value;
//     let age = document.querySelector(".age").value;

//     let newUser = { username, lastname, age };

//     return await axios
//         .post("http://localhost:3000/users", newUser)
//         .then((res) => createTable(res.data))
//         .catch((error) => console.log(error));
// };