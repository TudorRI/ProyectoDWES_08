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

$userData = verificarToken(); 

$data = json_decode(file_get_contents("php://input"), true);

$id_car = $data['id_car'];

$sql = "SELECT ID_BOOKING, DATE_START, DATE_FINISH FROM BOOKING WHERE ID_CAR = ? ";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id_car]);
$dates = $stmt->fetchAll(PDO::FETCH_ASSOC);

if($dates){

    http_response_code(200);
    echo json_encode([
        "dates" => $dates
    ]);
}else{

    http_response_code(404);
    echo json_encode([
        "message" => "Este coche no esta reservado en ninguna fecha"
    ]);
}

?>