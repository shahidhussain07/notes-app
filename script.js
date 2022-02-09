// if user adds a note, add it to the local storage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }else{
        notesObj =JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value = "";
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
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>  `;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML =` Nothing to Show here.  Use "Add a Note" section above to add notes.  `
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