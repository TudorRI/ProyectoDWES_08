<?php

require '../config/config.php';
require '../vendor/autoload.php';
require '../api/auth.php';


use Firebase\JWT\JWT;

//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

$userData = verificarToken(); // Verificamos el token

$data = json_decode(file_get_contents("php://input"), true);

$day_price = $data['day_price'];
$initialDate = $data['initialDate'];
$finalDate = $data['finalDate'];

// Funcion para calcular la cantidad de dias totales de la reserva
function amountOfDays($initialDate, $finalDate)
{

    $initial = new DateTime($initialDate);
    $final = new DateTime($finalDate);

    $diference = $initial->diff($final);

    return $diference->days; // Devuelve solo el numero de dias
}

$days = amountOfDays($initialDate, $finalDate);

$total = $days * $day_price;

if (isset($days) && isset($total)) {
    echo json_encode([
        "days" => $days,
        "total" => $total
    ]);
} else {
    echo json_encode(["error" => "Ha habido un error al obtener el total de dias o la cantidad total de la reserva"]);
}
