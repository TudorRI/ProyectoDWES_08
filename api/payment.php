<?php 

//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


require '../config/config.php';
require '../vendor/autoload.php';

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

$headers = getallheaders(); // Obtener los headers de la petición

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["message" => "Token no proporcionado"]);
    exit;
}

$authHeader = $headers['Authorization'];
list(, $token) = explode(' ', $authHeader); // Quitar 'Bearer' y obtener solo el token

$secretKey = $_ENV['JWT_SECRET']; // Usa la misma clave secreta con la que generaste el JWT

$decodedToken = JWT::decode($token, new Key($secretKey, 'HS256')); // Desencriptamos el token para obtener los datos

$data = json_decode(file_get_contents("php://input"), true);

$cardNumber = $data['cardNumber'];
$cardHolder = $data['cardHolder'];
$expireDate = $data['expireDate'];
$cvv = $data['cvv'];

if(empty($cardNumber) || empty($cardHolder) || empty($expireDate) || empty($cvv)){


}

?>
