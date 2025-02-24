<?php
require '../config/config.php';
require '../vendor/autoload.php';

//Configuración de errores
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');

$data = json_decode(file_get_contents("php://input"), true);

$id_car = $data['id_car'];
$initialDate = $data['initialDate'];
$finalDate = $data['finalDate'];


// Validación de datos
if (empty($initialDate) || empty($finalDate || empty($id_car))) {
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

// Consulta para ver si el coche esta disponible en las fechas seleccionadas
$sql = "SELECT * FROM BOOKING WHERE ID_CAR = ? AND DATE_START<= ? AND DATE_FINISH >= ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id_car, $initialDate, $finalDate]);
$booking = $stmt->fetch(PDO::FETCH_ASSOC);

// Si el array contiene informacion significa que si hay una reserva en esas fechas, si esta vacio es que esta disponible
if ($booking) {
    echo json_encode(["error" => "El coche no esta disponible durante estas fechas. Por favor introduzca otras fechas"]);
    exit;
} else {
    echo json_encode(["message" => "Fechas seleccionadas con exito."]);
}
