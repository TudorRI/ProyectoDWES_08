<?php

// Cargamos las dependencias de Composer (incluyendo Firebase JWT)
require '../vendor/autoload.php';

// Importamos las clases necesarias para manejar JWT
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verificarToken()
{

    // Obtenemos la clave secreta desde las variables de entorno
    $jwtSecret = $_ENV['JWT_SECRET'];

    // Obtenemos los encabezados de la petición HTTP
    $headers = getallheaders();

    // Verificamos si el encabezado "Authorization" está presente
    if (!isset($headers['Authorization'])) {
        // Si no hay token en los headers, devolvemos un error 401 (No autorizado)
        http_response_code(401);
        echo json_encode(["error" => "No autorizado"]);
        exit;
    }

    // Extraemos el token eliminando la parte "Bearer " del encabezado
    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        // Intentamos decodificar el token usando la clave secreta y el algoritmo HS256
        return JWT::decode($token, new Key($jwtSecret, 'HS256'));
    } catch (Exception $e) {
        // Si la decodificación falla (token inválido, expirado, etc.), devolvemos un error 401
        http_response_code(401);
        echo json_encode(["error" => "Ocurrió un problema con la autenticación. Inténtalo más tarde."]);
        exit; // Detenemos la ejecución
    }
}
