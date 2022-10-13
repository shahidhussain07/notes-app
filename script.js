// if user adds a note, add it to the local storage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }else{
        notesObj =JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value, 
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
})


// function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }else{
        notesObj =JSON.parse(notes);
    }
    let html ="";
    notesObj.forEach(function(element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index+1}. ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg></button>
                </div>
            </div>  `;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML =`* Nothing to Show here! *`
    }

}
// function to  delete a note
function deleteNote(index) {
    // console.log("I am deleting");

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }else{
        notesObj =JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

let seacrh = document.getElementById('searchTxt');
seacrh.addEventListener('input', function () {
    
    let inputVal = seacrh.value.toLowerCase();
    // console.log("Input event fired!",inputVal);
    let noteCards= document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }else{
            element.style.display = 'none';
        }
        // console.log(cardTxt);
    })
})

/* 
    Further feature
    1. Add Title
    2. Mark a note as important
    3. Separate notes by user 
    4. Sync and Host to a web server
*/