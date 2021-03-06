
const container = document.querySelector(".container");

const coffees = [

    { name: "Perspiciatis", image: "images/coffee1.jpg" },
    { name: "Voluptatem", image: "images/coffee2.jpg" },
    { name: "Explicabo", image: "images/coffee3.jpg" },
    { name: "Rchitecto", image: "images/coffee4.jpg" },
    { name: " Beatae", image: "images/coffee5.jpg" },
    { name: " Vitae", image: "images/coffee6.jpg" },
    { name: "Inventore", image: "images/coffee7.jpg" },
    { name: "Veritatis", image: "images/coffee8.jpg" },
    { name: "Accusantium", image: "images/coffee9.jpg" },
];

const MostrarCoffee = () => {

    let output = "";
    coffees.forEach(
        ({ name, image}) =>
        (output += ` 
            <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <button class="card--link" href='#'>Ver</button>
            </div>
            `)
    )
    container.innerHTML = output;
}

document.addEventListener("DOMContentLoaded", MostrarCoffee);

if("serviceWorker" in navigator){

    window.addEventListener("load", function(){
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("servicio worker registrado!!!!"))
        .catch(err => console.log("el servicio worker no ha sido registrado", err))
    })
}