const API_BASE_URL = "http://localhost:8000/api/";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const contactMessage =  document.getElementById("contactMessage");
<<<<<<< HEAD
const carContainer = document.getElementById("car-list");
=======
const carContainer = document.getElementById("carContainer");
>>>>>>> 33f791d (Guardado)
const bookingDates = document.getElementById("bookingDates");
const detailsContainer = document.getElementById("detailsContainer");
const bookingContainer = document.getElementById("bookingContainer");
const informationContainer =  document.getElementById("informationContainer")
const informationForm = document.getElementById("informationForm");
const logoutButton = document.getElementById("logoutButton");
<<<<<<< HEAD
=======
const myAccountButton = document.getElementById("myAccountButton");
const myBookingsButton = document.getElementById("myBookingsButton");
const paymentForm = document.getElementById("paymentForm")
const successContainer = document.getElementById("successContainer")
const datesContainer = document.getElementById("datesContainer")
const userDataContainer = document.getElementById("userDataContainer");


>>>>>>> 33f791d (Guardado)


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
                    alert("Inicio de sesion exitoso");
                    window.location.href= '../public/index.html'; // Redirigimos al index
                }else{
                    alert("No se recibio ningun token. Verifica la API");
                }
            }else{
                alert(result.message || "Error al iniciar sesion");
            }    
        } catch (error){
            console.error('Error:', error);
            alert('Ocurrió un error al conectar con el servidor');
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
                console.log("Hola mundo");
                alert("Registro exitoso. Serás redirigido al login.");
                
                // Redirigimos al login
                window.location.href = '../public/login.html';
            } else {
                alert(result.error || "Error en el registro.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
        }
    });
}

// Seccion de cerrar sesion

if(logoutButton){

<<<<<<< HEAD
    logoutButton.addEventListener("onclick", () => {  // Usar "click" en lugar de "onclick"

        localStorage.removeItem("jwtToken")
=======
    logoutButton.addEventListener("click", () => {  // Usar "click" en lugar de "onclick"

        localStorage.removeItem("jwtToken")
        sessionStorage.clear()
>>>>>>> 33f791d (Guardado)
        window.location.href= "../public/login.html"

    })
}

<<<<<<< HEAD
=======
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
                console.error("Error en la respuesta del servidor:", userData.message);
                userDataContainer.innerHTML = `<p>Error: ${userData.message}</p>`;
            }

        } catch (error) {
            console.error("Error en la petición:", error);
            userDataContainer.innerHTML = "<p>Error al cargar los datos del usuario.</p>";
        }
    });
}



// Seccion Mis Reservas
if(myBookingsButton){


}

>>>>>>> 33f791d (Guardado)
// Seccion Contacto
if (contactMessage){

    contactMessage.addEventListener('submit', async (event) =>{
       
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        try{
<<<<<<< HEAD
            const response = await fetch(API_BASE_URL + 'emailconfirmation.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({ nombre, email, mensaje})
=======
            const response = await fetch(API_BASE_URL + 'emailContact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({ nombre, email, mensaje })
>>>>>>> 33f791d (Guardado)
            });

            const result = await response.json();

            if (response.ok){
<<<<<<< HEAD
                alert("Mensaje enviado correctamente");
=======
                alert(result.message || result.success);
>>>>>>> 33f791d (Guardado)
                contactMessage.reset();
            }else{
                alert("Error: " + result.message);
            }
        } catch(error){
            alert("Error al enviar el mensaje: " + error.message);

        }
    });
}

// Sección Coches
if (carContainer) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch(API_BASE_URL + "cars.php");
            const cars = await response.json();

            if (!response.ok) {
                throw new Error("Error al obtener los coches");
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
<<<<<<< HEAD
                            <button type="button" class="btn-contacto">Contactar</button>
=======
                            <button type="button" class="btn-contacto" id="verDisponibilidadBtn-${car.ID_CAR}">Ver disponibilidad</button>
>>>>>>> 33f791d (Guardado)
                        </div>
                    </form>
                `;

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
<<<<<<< HEAD
=======

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
>>>>>>> 33f791d (Guardado)
        } catch (error) {
            console.error("Error:", error);
            carContainer.innerHTML = "<p>Error al cargar los coches.</p>";
        }
    });
}

<<<<<<< HEAD
=======
// Disponibilidad de fechas del coche seleccionado

if(datesContainer){

    console.log("1")
    document.addEventListener("DOMContentLoaded", async () => {

        console.log("2")

        // Obtener el token JWT de localStorage
        const token = localStorage.getItem("jwtToken");

        const selectedCarAvailability = JSON.parse(sessionStorage.getItem("selectedCarAvailability"));

        const id_car = selectedCarAvailability['id']

        console.log("3")



        try{
            console.log("4")

            const dateResponse = await fetch(API_BASE_URL + 'disponibilidad.php', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({ id_car })
            });

            console.log("5")

        
            const dateResult = await dateResponse.json();

            console.log("6")


            if(!dateResponse.ok){

                console.log("7")


                datesContainer.innerHTML = `<p>${dateResult.message}</p>`;
            }else{

                console.log("8")

                // Limpiar el contenedor antes de agregar las tarjetas
                datesContainer.innerHTML = "";

                // Recorrer el array de reservas
                dateResult.dates.forEach(date => {
                    // Crear la estructura de la tarjeta
                    console.log("9")

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
                console.log("10")

            }

        }catch(error){
            alert("Ha habido un error al seleccionar la disponibilidad de fechas: " + error.message)
            console.error(error.message)
        }
    });
}

>>>>>>> 33f791d (Guardado)
// Seccion de fechas para el coche seleccionado

if(bookingContainer){

    document.addEventListener("DOMContentLoaded", async () => {

        // Funcion para seleccionar las fechas minimo desde el dia actual en adelante
        const today = new Date().toISOString().split('T')[0];
        document.getElementById("initialDate").setAttribute("min", today);
        document.getElementById("finalDate").setAttribute("min", today);

<<<<<<< HEAD
=======
        

>>>>>>> 33f791d (Guardado)
        bookingDates.addEventListener('submit',  async(event) =>{

            const selectedCar =  JSON.parse(sessionStorage.getItem("selectedCar"));
    
            const id_car = selectedCar['id'];
            const initialDate = document.getElementById("initialDate").value;
            const finalDate = document.getElementById("finalDate").value;
    
            event.preventDefault();
    
            try{
                const response = await fetch(API_BASE_URL + 'availablecar.php',{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body:JSON.stringify({ id_car, initialDate, finalDate })
                })
    
                const result = await response.json();
                if(response.ok){
<<<<<<< HEAD
                    alert("Fechas seleccionadas con exito");
=======
                    alert(result.message);
>>>>>>> 33f791d (Guardado)
                    const selectedDates = [initialDate, finalDate];
                    sessionStorage.setItem("selectedDates", JSON.stringify(selectedDates));
                    window.location.href= "../public/bookingdetails.html";
                }else{
<<<<<<< HEAD
                    alert("Error: " + result.message);
=======
                    alert("Error: " + result.error);
>>>>>>> 33f791d (Guardado)
                }
            }catch(error){
                alert("Error al seleccionar las fechas: " + error.message);
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
        

        try{
            const response = await fetch(API_BASE_URL + 'bookingdetails.php', {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
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
<<<<<<< HEAD
                        <label for="total"><strong>Total de la reserva:</strong> ${total + "€"}</label><br><br>                    </div>
=======
                        <label for="total"><strong>Total de la reserva:</strong> ${total + "€"}</label><br><br>
                        <button onclick="window.location.href='../public/bookingInformation.html'" id="fillInformation">Rellenar información personal</button>                    
                    </div>
>>>>>>> 33f791d (Guardado)
                `
            }else{
                alert("Error: " + result.message);
            }
        }catch(error){
            alert("Error al cargar los detalles de la reserva: " + error.message);
        }
    });
}


<<<<<<< HEAD
=======
// Seccion de datos de la persona que reserva

>>>>>>> 33f791d (Guardado)
if (informationContainer){

    document.addEventListener("DOMContentLoaded", function () {
        const informationForm = document.getElementById("informationForm");
<<<<<<< HEAD
=======
        let checkbox = document.getElementById("infoCheckUser");
        const inputs = informationForm.querySelectorAll("input:not([type='checkbox'])") // Con esta sentencia seleccionaremos todos los inputs del formulario excpeto los checkboxes

        // Evento para bloquear/desbloquear los inputs cuando se marca el checkbox
        checkbox.addEventListener("change", function () {
            inputs.forEach(input => {
                input.disabled = checkbox.checked;
            });
        });
>>>>>>> 33f791d (Guardado)
    
        if (informationForm) {
            informationForm.addEventListener("submit", async (event) => {
                event.preventDefault();
    
                let infoName = document.getElementById("infoName").value;
                let infoLastName = document.getElementById("infoLastName").value;
                let infoEmail = document.getElementById("infoEmail").value;
                let infoPhone = document.getElementById("infoPhone").value;
<<<<<<< HEAD
                let checkbox = document.getElementById("infoCheckUser");
=======
>>>>>>> 33f791d (Guardado)
                let infoCheckUser = checkbox.checked;
    
                // Obtener el token JWT de localStorage
                const token = localStorage.getItem("jwtToken");
    
                if (infoCheckUser && token) {
                    try {
                        const userResponse = await fetch(API_BASE_URL + "getUserData.php", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                            }
                        });
    
                        const userData = await userResponse.json();
    
                        if (userResponse.ok) {
                            infoName = userData.name;
                            infoLastName = userData.lastname;
                            infoEmail = userData.email;
                            infoPhone = userData.phone;
                            alert("Informacion de usuario recibida correctamente");
<<<<<<< HEAD
                            const selectedInformation = [infoName, infoLastName, infoEmail, infoPhone];
                            sessionStorage.setItem("selectedInformation", JSON.stringify(selectedInformation))

=======
>>>>>>> 33f791d (Guardado)
                            window.location.href = "../public/payment.html" // Redirigimos a la pasarela de pago
                        } else {
                            alert("Error al obtener los datos del usuario.");
                            return;
                        }
                    } catch (error) {
                        alert("Error de conexión con el servidor: " + error.message);
                        return;
                    }
                }else{
                    try {
                        const response = await fetch(API_BASE_URL + "bookingInformation.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ infoName, infoLastName, infoEmail, infoPhone })
                        });
        
                        const result = await response.json();
        
                        if (response.ok) {
                            alert("Mensaje enviado correctamente");
<<<<<<< HEAD
                            const selectedInformation = [infoName, infoLastName, infoEmail, infoPhone];
                            sessionStorage.setItem("selectedInformation", JSON.stringify(selectedInformation))
=======
>>>>>>> 33f791d (Guardado)
                            informationForm.reset();
                            window.location.href = "../public/payment.html" // Redirigimos a la pasarela de pago
                        } else {
                            alert("Error: " + result.message);
                        }
                    } catch (error) {
                        alert("Error al enviar el mensaje: " + error.message);
                    }
                }
            });
        }
    });
}

<<<<<<< HEAD
=======
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
                    alert("Error en el emailConfirmation: " + error.message)
                }
            }

        }catch(error){
            alert("Error en el payment: " + error.message)

        }
    })
}

// Seccion Informativa de Exito de Pago

if(successContainer){
    setTimeout(() => {
        window.location.href = "../public/index.html"; // Redirige tras unos segundos a la pagina principal
    }, 4000);
}

>>>>>>> 33f791d (Guardado)
