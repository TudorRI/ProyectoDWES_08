<?php 
//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


require '../config/config.php';
require '../vendor/autoload.php';
<<<<<<< HEAD
=======
require '../api/auth.php';
>>>>>>> 33f791d (Guardado)

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

<<<<<<< HEAD
$headers = getallheaders(); // Obtener los headers de la petición

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["message" => "Token no proporcionado"]);
    exit;
}

$authHeader = $headers['Authorization'];
list(, $token) = explode(' ', $authHeader); // Quitar 'Bearer' y obtener solo el token

$secretKey = $_ENV['JWT_SECRET']; // Usa la misma clave secreta con la que generaste el JWT

try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256')); // Desencriptamos el token para obtener los datos
    $user_id= $decoded->user_id; // Extraemos el ID del user
=======
$userData = verificarToken();

try {
    $user_id = $userData->user_id; // Extraemos el ID del USER
>>>>>>> 33f791d (Guardado)
    
    $stmt = $pdo->prepare("SELECT NAME, LASTNAME, EMAIL, PHONE FROM USER WHERE ID_USER = ?");
    $stmt -> execute([$user_id]);
    $user= $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user){
        // Si existe el usuario recogemos los datos de la consulta y los mandamos al JS con JSON
        echo json_encode([
            "name" => $user['NAME'],
            "lastname" => $user['LASTNAME'],
            "email" => $user['EMAIL'],
            "phone" => $user['PHONE'],
        ]);
    }else{
        http_response_code(404);
        echo json_encode(["message" => "Usuario no encontrado"]);
    }
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["message" => "Token inválido"]);
}
?>