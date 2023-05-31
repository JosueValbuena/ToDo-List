// seleccionando los componentes del input
const mainTodoListAddInput = document.querySelector("#main-toDoList-add-components-input");
const mainTodoListButtonAdd = document.querySelector("#main-toDoList-components-buttonAdd");
const mainTodoListButtonEraseAll = document.querySelector("#main-toDoList-components-buttonEraseAll");
const mainTodoListAddListUl = document.querySelector("#main-toDoList-add-list");

// agregando funcionalidad a los botones
mainTodoListButtonAdd.addEventListener("click", () => agregarTarea());
mainTodoListButtonEraseAll.addEventListener("click", () => vaciarLista());

//array que guarda objetos
let listaTareas = [];

//vacias la lista de tareas
function vaciarLista(){
    listaTareas = [];
    mainTodoListAddListUl.innerHTML = "";
}

//constructor de tareas
class tareasObj {
    constructor(value){
        this.id = Date.now().toLocaleString();
        this.descripcion = value;
        this.tareaTerminada = false;
    }
}

//agregar tareas al objeto desde un input main
function agregarTarea(){
    const tareaParaAgrear = new tareasObj (mainTodoListAddInput.value);
    listaTareas.push(tareaParaAgrear);
    rendeizarTareas()
}

//renderizar tareas en el html main input
function rendeizarTareas(){
    let renderizar = listaTareas.map((tarea) =>
    `
    <li>
    <p>${tarea.descripcion}</p>
    <button id=${tarea.id}>Completar Tarea</button>
    <button id=${tarea.id}>Eliminar Tarea</button>
    </li>
    `
    )
    mainTodoListAddListUl.innerHTML = renderizar;
    console.log(listaTareas);
}