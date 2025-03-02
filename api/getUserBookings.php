<?php 
//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


require '../config/config.php';
require '../vendor/autoload.php';
require '../api/auth.php';

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

$userData = verificarToken();

try {
    $user_id = $userData->user_id; // Extraemos el ID del USER
    
    $sql = // Consulta SQL para obtener las reservas del usuario
    $sql = "SELECT 
                B.ID_BOOKING AS codigo_reserva,
                U.NAME AS nombre,
                U.LASTNAME AS apellidos,
                U.PHONE AS telefono,
                U.EMAIL AS email,
                C.BRAND AS marca_coche,
                C.MODEL AS modelo_coche,
                B.DATE_START AS fecha_inicio,
                B.DATE_FINISH AS fecha_fin,
                B.TOTAL AS total_pagado
            FROM BOOKING B
            JOIN USER U ON B.ID_USER = U.ID_USER
            JOIN CAR C ON B.ID_CAR = C.ID_CAR
            WHERE B.ID_USER = ?
            ORDER BY B.DATE_START DESC";
    $stmt = $pdo->prepare($sql);
    $stmt -> execute([$user_id]);
    $reservations= $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($reservations){
        // Si hay reservas del usuario las pasamos al JS
        http_response_code(200);
        echo json_encode([
            "reservations" => $reservations,
        ]);
    }else{
        http_response_code(404);
        echo json_encode(["message" => "No tienes reservas registradas."]);
    }
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["message" => "Token inválido"]);
}
?>