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

$id_car = $data['id_car'];
$initialDate = $data['initialDate'];
$finalDate = $data['finalDate'];


// Validación de datos
if (empty($initialDate) || empty($finalDate || empty($id_car))) {
    http_response_code(400);
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

if($initialDate == $finalDate){
    http_response_code(400);
    echo json_encode(["error" => "Las fechas de inicio y fin no pueden ser iguales"]);
    exit;
}

if($initialDate > $finalDate){
    http_response_code(400);
    echo json_encode(["error" => "La fecha de finalizacion no puede ser anterior a la de inicio"]);
    exit;
}

// Consulta para ver si el coche esta disponible en esas fechas o no
$sql = "SELECT * FROM BOOKING  
        WHERE ID_CAR = ?  
        AND NOT (DATE_FINISH < ? OR DATE_START > ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id_car, $initialDate, $finalDate]);
$booking = $stmt->fetch(PDO::FETCH_ASSOC);

// Si hay una reserva en esas fechas, el coche no está disponible
if ($booking) {
    http_response_code(400);
    echo json_encode(["error" => "El coche no está disponible durante estas fechas. Por favor, consulte la disponibilidad de este coche en la anterior pestaña."]);
    exit;
} else {
    http_response_code(200);
    echo json_encode(["success" => "Fechas seleccionadas con éxito."]);
}

