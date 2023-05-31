// seleccionando los componentes del input
const mainTodoListAddInput = document.querySelector(".main-toDoList-add-input");
const mainTodoListButton = document.querySelector(".main-toDoList-button");
const mainTodoListAddListUl = document.querySelector(".main-toDoList-add-list");

//
mainTodoListButton.addEventListener("click", () => agregarTarea());

const listaTareas = [];

class tareasObj {
    constructor(value){
        this.id = Date.now().toLocaleString();
        this.descripcion = value;
        this.tareaTerminada = false;
    }
}

function agregarTarea(){
    const tareaParaAgrear = new tareasObj (mainTodoListAddInput.value);
    console.log(tareaParaAgrear);
    listaTareas.push(tareaParaAgrear);
    console.log(listaTareas);
    rendeizarTareas()
}

function rendeizarTareas(){
    let renderizar = listaTareas.map((tarea) =>
    `
    <li>
    <p>${tarea.descripcion}</p>
    <button>Completar Tarea</button>
    <button>Eliminar Tarea</button>
    </li>
    `
    )
    mainTodoListAddListUl.innerHTML = renderizar;
}