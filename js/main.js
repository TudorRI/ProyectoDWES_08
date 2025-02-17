const API_BASE_URL = "http://localhost:8000/api/";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const contactMessage =  document.getElementById("contactMessage");
const carContainer = document.getElementById("car-list");
const bookingDates = document.getElementById("bookingDates");


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
                    localStorage.setItem('jwt', result.token);
                    alert("Inicio de sesion exitoso");
                    window.location.href= '/public/index.html'; // Redirigimos al index
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

// Seccion Contacto
if (contactMessage){

    contactMessage.addEventListener('submit', async (event) =>{
       
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        try{
            const response = await fetch(API_BASE_URL + 'emailconfirmation.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({ nombre, email, mensaje})
            });

            const result = await response.json();

            if (response.ok){
                alert("Mensaje enviado correctamente");
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
                            <input type="hidden" name="car_price" value="${car.DAY_PRICE}">

                            <button type="submit" class="btn-reservar">Reservar</button>
                            <button type="button" class="btn-contacto">Contactar</button>
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
                        price: formData.get("car_price"),
                    };

                    // Guardamos los datos en sessionStorage
                    sessionStorage.setItem("selectedCar", JSON.stringify(carData));

                    // Redirigir a la página de selección de fechas
                    window.location.href = "../public/calendar.html";
                });
            });
        } catch (error) {
            console.error("Error:", error);
            carContainer.innerHTML = "<p>Error al cargar los coches.</p>";
        }
    });
}

// Seccion de fechas para el coche seleccionado

if(bookingDates){

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
                alert("Fechas seleccionadas con exito");
                window.location.href= "../public/bookingdetails.html";
            }else{
                alert("Error: " + result.message);
            }
        }catch(error){
            alert("Error al seleccionar las fechas: " + error.message);
        }
    });
}

// Seccion de detalles de la reserva





