<?php
require '../config/config.php';
require '../vendor/autoload.php';

use Firebase\JWT\JWT;

//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

$data = json_decode(file_get_contents("php://input"), true);

$id_car = $data['id_car'];
$initialDate = $data['initialDate'];
$finalDate = $data['finalDate'];


// Validación de datos
if (empty($initialDate) || empty($finalDate || empty($id_car))) {
<<<<<<< HEAD
=======
    http_response_code(400);
>>>>>>> 33f791d (Guardado)
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

<<<<<<< HEAD
// Consulta para ver si el coche esta disponible en las fechas seleccionadas
$sql = "SELECT * FROM BOOKING WHERE ID_CAR = ? AND DATE_START<= ? AND DATE_FINISH >= ?";
=======
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
>>>>>>> 33f791d (Guardado)
$stmt = $pdo->prepare($sql);
$stmt->execute([$id_car, $initialDate, $finalDate]);
$booking = $stmt->fetch(PDO::FETCH_ASSOC);

<<<<<<< HEAD
// Si el array contiene informacion significa que si hay una reserva en esas fechas, si esta vacio es que esta disponible
if ($booking) {
    echo json_encode(["error" => "El coche no esta disponible durante estas fechas. Por favor introduzca otras fechas"]);
    exit;
} else {
    echo json_encode(["message" => "Fechas seleccionadas con exito."]);
}
=======
// Si hay una reserva en esas fechas, el coche no está disponible
if ($booking) {
    http_response_code(400);
    echo json_encode(["error" => "El coche no está disponible durante estas fechas. Por favor, consulte la disponibilidad de este coche en la anterior pestaña."]);
    exit;
} else {
    http_response_code(200);
    echo json_encode(["message" => "Fechas seleccionadas con éxito."]);
}

>>>>>>> 33f791d (Guardado)
