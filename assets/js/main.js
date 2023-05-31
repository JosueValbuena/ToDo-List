// seleccionando los componentes del input
const mainTodoListAddInput = document.querySelector("#main-toDoList-add-components-input");
const mainTodoListButtonAdd = document.querySelector("#main-toDoList-components-buttonAdd");
const mainTodoListButtonEraseAll = document.querySelector("#main-toDoList-components-buttonEraseAll");
const mainTodoListAddListUl = document.querySelector("#main-toDoList-add-list");
const mainToDoListPanelSpan = document.querySelector("#main-toDoList-panel-total");

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
        this.id = Date.now();
        this.descripcion = value;
        this.tareaTerminada = false;
    }
}

//agregar tareas al objeto desde un input main
function agregarTarea(){
    const tareaParaAgrear = new tareasObj (mainTodoListAddInput.value);
    listaTareas.push(tareaParaAgrear);
    mainTodoListAddInput.value="";
    rendeizarTareas()
}

//renderizar tareas en el html main input
function rendeizarTareas(){
    let renderizar = listaTareas.map((tarea) =>
    `
    <li>
    <p>${tarea.descripcion}</p>
    <button onClick="completarTarea(${tarea.id})">Completar Tarea</button>
    <button onClick="eliminarTarea(${tarea.id})">Eliminar Tarea</button>
    </li>
    `
    )
    mainTodoListAddListUl.innerHTML = renderizar;
}

//funciones para botones renderizados
function completarTarea(id){
    let index = listaTareas.findIndex((ele) => ele.id === id);
    listaTareas[index].tareaTerminada = true;
}

function eliminarTarea(id){
    let index = listaTareas.findIndex((ele) => ele.id === id);
    listaTareas.splice(index, 1);
    rendeizarTareas();
}