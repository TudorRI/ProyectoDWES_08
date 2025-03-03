const API_BASE_URL = "http://localhost:8000/api/";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const contactMessage =  document.getElementById("contactMessage");
const carContainer = document.getElementById("carContainer");
const bookingDates = document.getElementById("bookingDates");
const detailsContainer = document.getElementById("detailsContainer");
const bookingContainer = document.getElementById("bookingContainer");
const informationContainer =  document.getElementById("informationContainer")
const informationForm = document.getElementById("informationForm");
const logoutButton = document.getElementById("logoutButton");
const userDataContainer = document.getElementById("userDataContainer");
const userBookingsContainer = document.getElementById("userBookingsContainer");
const paymentForm = document.getElementById("paymentForm")
const successContainer = document.getElementById("successContainer")
const datesContainer = document.getElementById("datesContainer")




// Seccion Login

if (loginForm){

    loginForm.addEventListener('submit', async (event) => {

        event.preventDefault(); // Evita que el formulario se envíe normalmente
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try{
    
            const response = await fetch(API_BASE_URL + 'login.php', {
    
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({ email, password }),
        
            });
    
            const result= await response.json();
        
            if (response.ok){
    
                // Si el servidor devuelve un token, lo guardamos
                if(result.token){
                    localStorage.setItem('jwtToken', result.token);
                    alert(result.success || result.message);
                    window.location.href= '../public/index.html'; // Redirigimos al index
                }else{
                    alert(result.error || result.message);
                }
            }else{
                alert(result.error || result.message);
            }    
        } catch (error){
            alert(result.error || result.message);
        }
    
    });
}

// Seccion Registro

if (registerForm){

    registerForm.addEventListener('submit', async (event) => {
    
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
    
        try {
            const response = await fetch(API_BASE_URL + 'register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastname, phone, email, password, confirmPassword })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert(result.success || result.message);
                window.location.href = '../public/login.html'; // Redirigimos al login
            } else {
                alert(result.error || result.message);
            }
        } catch (error) {
            alert(result.error || result.message);
        }
    });
}

// Seccion de cerrar sesion

if(logoutButton){

    logoutButton.addEventListener("click", () => {  // Usar "click" en lugar de "onclick"

        localStorage.removeItem("jwtToken")
        sessionStorage.clear()
        window.location.href= "../public/login.html"

    })
}

// Seccion Mi Perfil
if (userDataContainer) {
    document.addEventListener("DOMContentLoaded", async () => {
        
        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch(API_BASE_URL + "getUserData.php", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({}) // Enviar un body vacío si es necesario
            });

            const userData = await response.json();

            if (response.ok) {
                userDataContainer.innerHTML = `
                    <div id="userDataDiv" class="login-form">
                        <label id="nombre">Nombre: ${userData.name}</label><br>
                        <label id="apellido">Apellido: ${userData.lastname}</label><br>
                        <label id="telefono">Teléfono: ${userData.phone}</label><br>
                        <label id="correo">Correo: ${userData.email}</label><br>
                    </div> 
                `;
            } else {
                console.error("Error en la respuesta del servidor:", userData.error);
                userDataContainer.innerHTML = `<p>${userData.error}</p>`;
            }

        } catch (error) {
            console.error("Error en la petición:", error);
            userDataContainer.innerHTML = "<p>Error al cargar los datos del usuario.</p>";
        }
    });
}



// Seccion Mis Reservas
if(userBookingsContainer){

    document.addEventListener("DOMContentLoaded", async () => {
        
        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch(API_BASE_URL + "getUserBookings.php", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({}) // Enviar un body vacío si es necesario
            });

            const userBookings = await response.json();

            if(!response.ok){
                userBookingsContainer.innerHTML = `<p>${userBookings.message || userBookings.error}</p>`;
            }else{
                // Limpiar el contenedor antes de agregar las tarjetas
                userBookingsContainer.innerHTML = "";

                 // Iterar sobre cada reserva y crear una tarjeta para cada una
                 userBookings.reservations.forEach(reserva => {
                    const card = document.createElement("div");
                    card.classList.add("card", "mb-3");

                    const cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");

                    // Crear el contenido de la tarjeta
                    cardBody.innerHTML = `
                        <h5 class="card-title">Reserva #${reserva.codigo_reserva}</h5>
                        <p><strong>Cliente:</strong> ${reserva.nombre} ${reserva.apellidos}</p>
                        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
                        <p><strong>Email:</strong> ${reserva.email}</p>
                        <p><strong>Coche:</strong> ${reserva.marca_coche} - ${reserva.modelo_coche}</p>
                        <p><strong>Desde:</strong> ${reserva.fecha_inicio}</p>
                        <p><strong>Hasta:</strong> ${reserva.fecha_fin}</p>
                        <p><strong>Total pagado:</strong> ${reserva.total_pagado}€</p>
                    `;

                    // Crear el botón de cancelación
                    const cancelButton = document.createElement("button");
                    cancelButton.textContent = "Cancelar Reserva";
                    cancelButton.classList.add("btn", "btn-danger", "mt-3"); // Añadir clases de Bootstrap
                    cancelButton.addEventListener("click", async () => {
                        if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
                            try {
                                const cancelResponse = await fetch(API_BASE_URL + "cancelBooking.php", {
                                    method: "POST",
                                    headers: {
                                        "Authorization": `Bearer ${token}`,
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ codigo_reserva: reserva.codigo_reserva })
                                });

                                const cancelResult = await cancelResponse.json();

                                if (cancelResponse.ok) {
                                    alert(cancelResult.message || cancelResult.success); // Mostrar mensaje de éxito
                                    card.remove(); // Eliminar la tarjeta de la vista
                                } else {
                                    alert(cancelResult.message || cancelResult.error); // Mostrar mensaje de error
                                }
                            } catch (error) {
                                alert(cancelResult.error || cancelResult.message);
                            }
                        }
                    });

                    // Agregar el botón de cancelación al cuerpo de la tarjeta
                    cardBody.appendChild(cancelButton);

                    // Agregar el cuerpo de la tarjeta a la tarjeta
                    card.appendChild(cardBody);

                    // Agregar la tarjeta al contenedor de reservas
                    userBookingsContainer.appendChild(card);
                });
            }

        } catch (error) {
            userBookingsContainer.innerHTML = `<p>${userBookings.error || userBookings.message}</p>`;
        }
    });
}

// Seccion Contacto
if (contactMessage){

    contactMessage.addEventListener('submit', async (event) =>{
       
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        const token = localStorage.getItem("jwtToken");

        try{
            const response = await fetch(API_BASE_URL + 'emailContact.php', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({ nombre, email, mensaje })
            });

            const result = await response.json();

            if (response.ok){
                alert(result.message || result.success);
                contactMessage.reset();
            }else{
                alert(result.message || result.error);
            }
        } catch(error){
            alert(result.error || result.message);

        }
    });
}

// Sección Coches
if (carContainer) {
    document.addEventListener("DOMContentLoaded", async () => {

        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch(API_BASE_URL + "cars.php", {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            const cars = await response.json();

            if (!response.ok) {
                throw new Error(cars.error || cars.message);
            }

            carContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar coches

            cars.forEach(car => {
                const carCard = document.createElement("div");
                carCard.classList.add("car-card");

                carCard.innerHTML = `
                <img src="${API_BASE_URL + car.IMAGE_URL}" alt="${car.MODEL}" class="car-image">
                <form class="car-form">
                    <div class="car-info">
                        <h2>${car.BRAND} ${car.MODEL}</h2>
                        <p><strong>Marca:</strong> ${car.BRAND}</p>
                        <p><strong>Modelo:</strong> ${car.MODEL}</p>
                        <p><strong>Año de lanzamiento:</strong> ${car.RELEASE_YEAR}</p>
                        <p><strong>Precio por día:</strong> ${car.DAY_PRICE}€</p>

                        <input type="hidden" name="car_id" value="${car.ID_CAR}">
                        <input type="hidden" name="car_brand" value="${car.BRAND}">
                        <input type="hidden" name="car_model" value="${car.MODEL}">
                        <input type="hidden" name="car_release_year" value="${car.RELEASE_YEAR}">
                        <input type="hidden" name="car_day_price" value="${car.DAY_PRICE}">

                            <button type="submit" class="btn-reservar">Reservar</button>
                            <button type="button" class="btn-contacto" id="verDisponibilidadBtn-${car.ID_CAR}">Ver disponibilidad</button>
                        </div>
                    </form>
                `

                carContainer.appendChild(carCard);
            });

            // Capturar el envío del formulario de cada coche
            document.querySelectorAll(".car-form").forEach(form => {
                form.addEventListener("submit", (event) => {
                    event.preventDefault(); // Evita la recarga de la página

                    const formData = new FormData(form);
                    const carData = {
                        id: formData.get("car_id"),
                        brand: formData.get("car_brand"),
                        model: formData.get("car_model"),
                        release_year: formData.get("car_release_year"),
                        day_price: formData.get("car_day_price"),
                    };

                    // Guardamos los datos en sessionStorage
                    sessionStorage.setItem("selectedCar", JSON.stringify(carData));

                    // Redirigir a la página de selección de fechas
                    window.location.href = "../public/calendar.html";
                });
            });

            // Agregar evento click a los botones "Ver disponibilidad"
            cars.forEach(car => {
                const verDisponibilidadBtn = document.getElementById(`verDisponibilidadBtn-${car.ID_CAR}`);
                if (verDisponibilidadBtn) {
                    verDisponibilidadBtn.addEventListener("click", () => {
                        // Guardar el coche seleccionado en sessionStorage
                        const carDataAvailability = {
                            id: car.ID_CAR,
                            brand: car.BRAND,
                            model: car.MODEL,
                            release_year: car.RELEASE_YEAR,
                            day_price: car.DAY_PRICE,
                        };
                        sessionStorage.setItem("selectedCarAvailability", JSON.stringify(carDataAvailability));

                        // Redirigir a la página de disponibilidad
                        window.location.href = "../public/disponibilidad.html";
                    });
                }
            });
        } catch (error) {
            carContainer.innerHTML = `<p>${cars.error || cars.message}</p>`;
        }
    });
}

// Disponibilidad de fechas del coche seleccionado

if(datesContainer){

    document.addEventListener("DOMContentLoaded", async () => {

        // Obtener el token JWT de localStorage
        const token = localStorage.getItem("jwtToken");

        const selectedCarAvailability = JSON.parse(sessionStorage.getItem("selectedCarAvailability"));

        const id_car = selectedCarAvailability['id']

        try{
            const dateResponse = await fetch(API_BASE_URL + 'disponibilidad.php', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({ id_car })
            });
        
            const dateResult = await dateResponse.json();

            if(!dateResponse.ok){
                alert(dateResult.error || dateResult.message)
                window.location.href = "../public/booking.html"
            }else{

                // Limpiar el contenedor antes de agregar las tarjetas
                datesContainer.innerHTML = "";

                // Recorrer el array de reservas
                dateResult.dates.forEach(date => {
                    // Crear la estructura de la tarjeta
                    const cardHTML = `
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card border-primary mb-3">
                                    <div class="card-header bg-primary text-white">Reserva #${date.ID_BOOKING}</div>
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-calendar-check"></i> Fechas de la reserva</h5>
                                        <p class="card-text"><strong>Fecha de inicio:</strong> ${date.DATE_START}</p>
                                        <p class="card-text"><strong>Fecha de fin:</strong> ${date.DATE_FINISH}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Insertar la tarjeta en el contenedor
                    datesContainer.innerHTML += cardHTML;
                });
            }

        }catch(error){
            alert(dateResult.error || dateResult.message)
        }
    });
}

// Disponibilidad de fechas del coche seleccionado

if(datesContainer){

    document.addEventListener("DOMContentLoaded", async () => {

        // Obtener el token JWT de localStorage
        const token = localStorage.getItem("jwtToken");

        const selectedCarAvailability = JSON.parse(sessionStorage.getItem("selectedCarAvailability"));

        const id_car = selectedCarAvailability['id']

        try{

            const dateResponse = await fetch(API_BASE_URL + 'disponibilidad.php', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({ id_car })
            });
        
            const dateResult = await dateResponse.json();

            if(!dateResponse.ok){
                datesContainer.innerHTML = `<p>${dateResult.message}</p>`;
            }else{

                // Limpiar el contenedor antes de agregar las tarjetas
                datesContainer.innerHTML = "";

                // Recorrer el array de reservas
                dateResult.dates.forEach(date => {
                    // Crear la estructura de la tarjeta
                    const cardHTML = `
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card border-success mb-3">
                                    <div class="card-header bg-success text-white">Reserva #${date.ID_BOOKING}</div>
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-calendar-check"></i> Fechas de la reserva</h5>
                                        <p class="card-text"><strong>Fecha de inicio:</strong> ${date.DATE_START}</p>
                                        <p class="card-text"><strong>Fecha de fin:</strong> ${date.DATE_FINISH}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Insertar la tarjeta en el contenedor
                    datesContainer.innerHTML += cardHTML;
                });
            }

        }catch(error){
            alert("Ha habido un error al seleccionar la disponibilidad de fechas: " + error.message)
            console.error(error.message)
        }
    });
}

// Seccion de fechas para el coche seleccionado

if(bookingContainer){

    document.addEventListener("DOMContentLoaded", async () => {

        // Funcion para seleccionar las fechas minimo desde el dia actual en adelante
        const today = new Date().toISOString().split('T')[0];
        document.getElementById("initialDate").setAttribute("min", today);
        document.getElementById("finalDate").setAttribute("min", today);

        

        bookingDates.addEventListener('submit',  async(event) =>{

            const selectedCar =  JSON.parse(sessionStorage.getItem("selectedCar"));
    
            const id_car = selectedCar['id'];
            const initialDate = document.getElementById("initialDate").value;
            const finalDate = document.getElementById("finalDate").value;
    
            event.preventDefault();

            // Obtener el token JWT de localStorage
            const token = localStorage.getItem("jwtToken");
    
            try{
                const response = await fetch(API_BASE_URL + 'availablecar.php',{
                    method:'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({ id_car, initialDate, finalDate })
                })
    
                const result = await response.json();
                if(response.ok){
                    alert(result.message || result.success);
                    const selectedDates = [initialDate, finalDate];
                    sessionStorage.setItem("selectedDates", JSON.stringify(selectedDates));
                    window.location.href= "../public/bookingdetails.html";
                }else{
                    alert(result.error || result.message);
                }
            }catch(error){
                alert(result.message || result.error);
            }
        });

    })
}

// Seccion de detalles de la reserva


if (detailsContainer){

    document.addEventListener("DOMContentLoaded", async() => {

        const selectedCar = JSON.parse(sessionStorage.getItem("selectedCar"));
        const selectedDates = JSON.parse(sessionStorage.getItem("selectedDates"));

        const day_price = selectedCar['day_price'];
        const initialDate = selectedDates[0];
        const finalDate = selectedDates[1];

        // Obtener el token JWT de localStorage
        const token = localStorage.getItem("jwtToken");
        

        try{
            const response = await fetch(API_BASE_URL + 'bookingdetails.php', {
                method:'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({ day_price, initialDate, finalDate })
            })

            const result = await response.json();

            if(response.ok){

                const days= result.days; // Numero de dias calculado
                const total= result.total; // Total de dinero calculado
                sessionStorage.setItem("total", JSON.stringify(total));


                detailsContainer.innerHTML = `
                    <h1>Reserva de "${selectedCar.brand} ${selectedCar.model}"</h1><br>
                    <div class="login-form">
                        <label for="brand"><strong>Marca:</strong> ${selectedCar.brand}</label><br>
                        <label for="model"><strong>Modelo:</strong> ${selectedCar.model}</label><br>
                        <label for="release_year"><strong>Año:</strong> ${selectedCar.release_year || "N/A"}</label><br>
                        <label for="day_price"><strong>Precio por día:</strong> ${selectedCar.day_price}€</label><br>
                        <label for="days"><strong>Cantidad de dias a reservar:</strong> ${days}</label><br>
                        <label for="total"><strong>Total de la reserva:</strong> ${total + "€"}</label><br><br>
                        <button onclick="window.location.href='../public/payment.html'" id="fillInformation">Ir a pasarela de pago</button>                    
                    </div>
                `
            }else{
                alert(result.error || result.message);
            }
        }catch(error){
            alert(result.error || result.message);
        }
    });
}


// Seccion de pago y de realizacion de la reserva

if(paymentForm){

    paymentForm.addEventListener('submit', async (event) =>{

        event.preventDefault();

        // Obtenemos los datos de la tarjeta
        const cardNumber = document.getElementById("cardNumber").value
        const cardHolder = document.getElementById("cardHolder").value
        const expireDate = document.getElementById("expireDate").value
        const cvv = document.getElementById("cvv").value

        // Recuperamos los arrays del session storage
        const selectedCar = JSON.parse(sessionStorage.getItem("selectedCar"));
        const selectedDates = JSON.parse(sessionStorage.getItem("selectedDates"));

        // Definimos las variables que necesitamos para hacer la reserva
        const id_car = selectedCar['id']
        const initialDate = selectedDates[0]
        const finalDate = selectedDates[1]
        const total = JSON.parse(sessionStorage.getItem("total"));

        // Obtener el token JWT de localStorage
        const token = localStorage.getItem("jwtToken");

        try{
            const paymentResponse = await fetch(API_BASE_URL + "payment.php", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({cardNumber, cardHolder, expireDate, cvv, id_car, initialDate, finalDate, total})
            });
    
            const paymentResult = await paymentResponse.json();
    
            if(!paymentResponse.ok){
    
                alert("No se ha podido hacer la compra: " + (paymentResult.error || paymentResult.message))  
                return
            }else{
                try{
                    const emailResponse = await fetch(API_BASE_URL + "emailConfirmation.php", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    })

                    const emailResult = await emailResponse.json();
                
                    if(emailResponse.ok){
                        alert("Reserva completada. " + emailResult.success || emailResult.message);
                        sessionStorage.clear();
                        window.location.href = '../public/success.html'

                    }else{
                        alert(emailResult.message || emailResult.error)
                    }
                }catch(error){
                    alert(emailResult.error || emailResult.message)
                }
            }

        }catch(error){
            alert(paymentResult.error || paymentForm.message)

        }
    })
}

// Seccion Informativa de Exito de Pago

if(successContainer){
    setTimeout(() => {
        window.location.href = "../public/index.html"; // Redirige tras unos segundos a la pagina principal
    }, 5000);
}