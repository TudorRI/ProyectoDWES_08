<?php

//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;

require '../config/config.php';
require '../vendor/autoload.php';

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

// Obtenemos los datos del frotend

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

error_log($email);
error_log($password);

// Validación de datos
if (empty($email) || empty($password)) {
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

// Validacion del email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Formato de email no válido"]);
    exit;
}


$sql = "SELECT ID_USER, PASSWORD FROM USER WHERE EMAIL = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

error_log($user['PASSWORD']);
error_log($user['ID_USER']);

if ($user) {

    if (password_verify($password, $user['PASSWORD'])) {

        // Si las credenciales son correctas, generamos el token JWT

        $jwtSecret = $_ENV['JWT_SECRET'];

        $payload = [

            "user_id" => $user['ID_USER'],
            "email" => $email,
            "exp" => time() + 3600
        ];

        $token = JWT::encode($payload, $jwtSecret, 'HS256');


        echo json_encode([
            "message" => "Inicio de sesion exitoso",
            "token" => $token
        ]);
    } else {
        echo json_encode([
            "error" => "Contraseña incorrecta. Por favor intentelo de nuevo."
        ]);
    }
} else {
    echo json_encode(["error" => "El correo ingresado no existe."]);
}
