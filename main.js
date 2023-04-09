//let taskStorage = JSON.parse(localStorage.getItem("tasks"));
const input = document.getElementById("enter");
const boton = document.getElementById("sendTask");
const ol = document.getElementById("listTask")
let tasks = JSON.parse(localStorage.getItem("todoList")) || [];



boton.addEventListener("click", (e) => {
    const textTask = input.value;
    const mensajeError = document.createElement("p")
    if (textTask === "") {
        mensajeError.innerHTML = `<p>El campo esta vacio. Ingrese una tarea.</p>`;

        ol.appendChild(mensajeError);

        setTimeout(() => {
            mensajeError.remove();
        }, 2000);


    } else {

        const list = {
            value: textTask,
            time: Date.now()
        }

        tasks.push(list);


        localStorage.setItem("todoList", JSON.stringify(tasks));



        function iterateTasks(item, index, array) {
            let nextTask = index + 1 < array.length ? "positive" : "negative"
            if (nextTask === "negative") {
                let li = document.createElement("li");
                li.innerHTML = `<input type="checkbox">${item.value}`;

                (ol).appendChild(li);
                li.appendChild(deleteTask());
                JSON.parse(localStorage.getItem("todoList"))
                input.value = "";
            }

        }
        tasks.forEach((item, index, array) => iterateTasks(item, index, array));

        
    }


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





let refreshButton = document.getElementById("refresh");
let searchInput = document.getElementById("search-box");


let apiData = {
    url: `https://api.openweathermap.org/data/2.5/weather?q=`,
    key: `fec95fc493780b0f46734b64e8fcb1ad`,
};


function getData(countryName) {
    fetch(`${apiData.url}${countryName}&appid=${apiData.key}`)
        .then(res => res.json())
        .then(data => {
            showData(data);
            searchInput.value = "";
        })
        .catch(res => {
            alert("No se encontraron resultados (404)");
            searchInput.value = "";
        });
};

function showData(data) {
    
    let cityDiv = document.getElementById("city"),
        dateDiv = document.getElementById("date"),
        tempDiv = document.getElementById("temp"),
        weatherDiv = document.getElementById("weather"),
        highLowDiv = document.getElementById("hi-low");


    // console.log(data.sys.country);
    cityDiv.innerHTML = `${data.name}, ${data.sys.country}`;
    dateDiv.innerHTML = showDate();
    tempDiv.innerHTML = `${Math.floor(data.main.temp - 273.15)} °c`;
    weatherDiv.innerHTML = `${data.weather[0].main}`;
    highLowDiv.innerHTML = `${Math.floor(data.main.temp_max - 273.15)} °c / ${Math.floor(data.main.temp_min - 273.15)} °c`;

    
    eventRefreshButton(data);

};

function showDate() {

    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let now = new Date();

    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    let date = now.getDate();

    return `${day} ${date} ${month} ${year}`;

};


function eventRefreshButton(data) {
    refreshButton.addEventListener("click", () => {
        showData(data);
        Swal.fire("Clima Actualizado", "", "success");
    })
}


function eventSearchInput(e) {
    if (e.keyCode === 13) {
        const searchInputValue = searchInput.value;
        getData(searchInputValue);
    }
};
searchInput.addEventListener("keypress", eventSearchInput);


const time = document.getElementById("time")

function digitalClock() {
    let f = new Date();

    let timeString = f.toLocaleTimeString();
    time.innerHTML = timeString;
}
setInterval(() => {
    digitalClock()
}, 1000);

//function eventWeatherStorage(data) {
//     localStorage.setItem("weather", JSON.stringify(info));
//     const info = showData(data);
//     const weather = []
//     const weatherStorage = localStorage.getItem("weather")

// }