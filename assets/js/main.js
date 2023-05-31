// seleccionando los componentes del input
const mainTodoListAddInput = document.querySelector("#main-toDoList-add-components-input");
const mainTodoListButtonAdd = document.querySelector("#main-toDoList-components-buttonAdd");
const mainTodoListButtonEraseAll = document.querySelector("#main-toDoList-components-buttonEraseAll");
const mainTodoListAddListUl = document.querySelector("#main-toDoList-add-list");
const mainToDoListPanelSpan = document.querySelector("#main-toDoList-panel-total-span");
const mainToDoListPanelDone = document.querySelector("#main-toDoList-panel-done-span");
// agregando funcionalidad a los botones
mainTodoListButtonAdd.addEventListener("click", () => agregarTarea());
mainTodoListButtonEraseAll.addEventListener("click", () => vaciarLista());

//array que guarda objetos
let listaTareas;

//localStorage
const lista = JSON.parse(localStorage.getItem("lista"));
if(lista){
    listaTareas = lista;
    renderizarTareas()
}else{
    listaTareas = [];
}

//vacias la lista de tareas
function vaciarLista() {
    listaTareas = [];
    mainTodoListAddListUl.innerHTML = "";
    localStorage.setItem("lista", JSON.stringify(listaTareas));
    renderizarTareas();
}

//constructor de tareas
class tareasObj {
    constructor(value) {
        this.id = Date.now();
        this.descripcion = value;
        this.tareaTerminada = false;
    }
}

//agregar tareas al objeto desde un input main y actualizar el panel de datos
function agregarTarea() {
    //verificar que el campo no este vacío
    if (!mainTodoListAddInput.value) {
        alert("debes escribir algo :(")
        return
    }
    //contstruir el objeto y agregarlo al arreglo lista
    const tareaParaAgrear = new tareasObj(mainTodoListAddInput.value);
    listaTareas.push(tareaParaAgrear);
    mainTodoListAddInput.value = "";
    renderizarTareas()
    //guardar informacion en el local storage
    localStorage.setItem("lista", JSON.stringify(listaTareas));
}

//renderizar tareas en el html main input
function renderizarTareas() {
    let renderizar = listaTareas.map((tarea) =>
    `
    <li class="main-toDoList-add-list-ul-li">
    <p>${tarea.descripcion}</p>
    <button id="${tarea.id}" onClick="completarTarea(${tarea.id})">Completar Tarea</button>
    <button onClick="eliminarTarea(${tarea.id})">Eliminar Tarea</button>
    </li>
    `
    )
    mainTodoListAddListUl.innerHTML = renderizar;

    //actualizar el panel de datos
    mainToDoListPanelSpan.textContent = listaTareas.length;
    actualizarTareasCompletadas()
}

//completar una tarea
function completarTarea(id) {
    let index = listaTareas.findIndex((ele) => ele.id === id);
    listaTareas[index].tareaTerminada = true;
    actualizarTareasCompletadas();
    console.log(id)
    let btn = document.getElementById(`${id}`);
    console.log(btn)
    btn.classList.toggle("realizada");
}

//actualizar tareas hechas en panel de tareas
function actualizarTareasCompletadas() {
    let tareasHechas = listaTareas.filter((ele) => ele.tareaTerminada === true).length;
    console.log(tareasHechas);
    if (tareasHechas > 0) {
        mainToDoListPanelDone.textContent = tareasHechas.length;
    }
}

//eliminar una tarea
function eliminarTarea(id) {
    let index = listaTareas.findIndex((ele) => ele.id === id);
    listaTareas.splice(index, 1);
    renderizarTareas();
}