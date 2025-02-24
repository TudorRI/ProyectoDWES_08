<?php

require '../config/config.php';
require '../vendor/autoload.php';

//Configuración de errores
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');

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
