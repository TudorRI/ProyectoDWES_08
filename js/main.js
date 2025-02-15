const API_BASE_URL = "http://localhost:8000/api/";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const contactMessage =  document.getElementById("contactMessage");


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


