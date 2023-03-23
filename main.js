let tasks = []
let taskStorage = localStorage.getItem("tasks")
let input = document.getElementById("enter");
let boton = document.getElementById("sendTask");
let ol = document.getElementById("listTask")
let mensaje = document.getElementById("lisTask")



boton.addEventListener("click", (e) => {
    if (input.value === "") {
        const mensajeError = document.createElement("p")
        mensajeError.innerHTML = `<p>El campo esta vacio. Ingrese una tarea.</p>`;

        ol.appendChild(mensajeError);

        setTimeout(() => {
            mensajeError.remove();
        }, 2000);
        return;
    } else {
        

        const textTask = input.value;
        const listTasks = [{ textTask, id: Date.now() }]
        tasks.push(listTasks);
        

        tasks = localStorage.setItem("tasks", JSON.stringify(listTasks));
        tasks = JSON.parse(localStorage.getItem("tasks"));

        

        tasks.forEach((item) => {

            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox">${item.textTask}`;


            li.appendChild(deleteTask());
            ol.appendChild(li);
            input.value = "";


        });


    };

    

    function deleteTask() {


        const borrar = document.createElement("button")
        borrar.innerHTML = "Eliminar";
        borrar.className = "deleteTask";

        borrar.addEventListener("click", (e) => {
            const item = e.target;
            ol.removeChild(item.parentElement);
        });
        return borrar;
    }

});


