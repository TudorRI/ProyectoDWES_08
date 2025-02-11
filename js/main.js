const API_BASE_URL = "http://localhost:8000/api";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");


registerForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(API_BASE_URL + 'register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, lastname, phone, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Registro exitoso. Serás redirigido al login en 3 segundos.");
            
            // Redirigimos al login
            window.location.href = '/public/login.html';
        } else {
            alert(result.error || "Error en el registro.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
    }
});

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

