
// add Note Action 

const addNote = document.getElementById('add') ; 

const notes = JSON.parse(localStorage.getItem('notes')) ; 

if (notes) {
    notes.forEach((note) =>{
        addNewNote(note)
    })
}

addNote.addEventListener('click' , ()=> {
    addNewNote() ;
})

function addNewNote(text = "") {
    const note = document.createElement("div") ;
    note.classList.add("note") ;
    note.innerHTML = `
        <div class="notes">
            <div class="header">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden" }"></div>
            <textarea  class="${text ? "hidden" : "" }" ></textarea>
        </div> 
    
    `
    const deletBtn = note.querySelector(".delete") ;
    const mainEl = note.querySelector(".main") ;
    const textArea = note.querySelector('textarea') ;
    const editBtn =note.querySelector(".edit") ;
    

    textArea.value = text ;
    mainEl.innerHTML = marked(text) ;

    // events of btn 
    editBtn.addEventListener('click' , ()=>{
    mainEl.classList.toggle("hidden") ;
    textArea.classList.toggle("hidden")
    }) ;
    deletBtn.addEventListener('click',() => {
        note.remove() ;
    }) ;

    textArea.addEventListener('input' , (e)=>{
        const value= e.target.value;

        mainEl.innerHTML = value ;

        updateLS() ; 
    })

    document.body.appendChild(note)

}


function updateLS() {
    const notesText = document.querySelectorAll('textarea') ; 
    const notes = [] ;
    notesText.forEach((note) =>{
        notes.push(note.value) ; 
    } )

    localStorage.setItem("notes" , JSON.stringify(notes))
}