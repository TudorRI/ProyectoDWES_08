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

$data = json_decode(file_get_contents("php://input"), true);

$codigo_reserva = $data['codigo_reserva'];

$sql = "DELETE FROM BOOKING WHERE ID_BOOKING = ?";
$stmt = $pdo->prepare($sql);

try{

    $pdo->beginTransaction();

    $stmt->execute([$codigo_reserva]);

    $pdo->commit();

    http_response_code(200);
    echo json_encode(["success" => "Reserva cancelada con exito"]);
}catch(Throwable $e){

    http_response_code(400);
    echo json_encode(["error" => "No se pudo cancelar la reserva. Intentelo mas tarde."]);
}
?>