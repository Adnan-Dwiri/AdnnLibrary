const url = "api/Books";

const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const addBtn = document.getElementById("add");

const getData = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => show(data))
        .catch(error => console.log(error));
};

const show = (data) => {

    let tab =
        `<tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
         </tr>`;

    data.forEach(book => {
        tab += `<td>${book["id"]}</td>`;
        tab += `<td>${book["title"]}</td>`;
        tab += `<td>${book["description"]}</td>`;
        tab += `<td>${book["author"]}</td>`;
        tab += `<tr></tr>`;
    })
    document.getElementById("books").innerHTML = tab;
};

function addBook() {
    //const newId = document.getElementById("addId");
    const newTitle = document.getElementById("newBookTitle");
    const newDescription = document.getElementById("newBookDescription");
    const newAuthor = document.getElementById("newBookAuthor");

    const newBook = {
        title: newTitle.value,
        description: newDescription.value,
        author: newAuthor.value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    })
        .then(response => response.json())
        .then(() => {
            getData();
        })
        .catch(error => console.error('Unable to add item.', error));


//    let tab =
//        `<tr>
//            <td>${newId}</td>
//            <td>${newTitle}</td>
//            <td>${newDescription}</td>
//            <td>${newAuthor}</td>
//         </tr>`;

//    document.getElementById("books").innerHTML += tab;
}

function showAddForm() {
    document.getElementById("addForm").hidden = false;
}

function closeInput() {
    document.getElementById("addForm").hidden = true;
}

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", showAddForm);
addBtn.addEventListener("click", addBook);