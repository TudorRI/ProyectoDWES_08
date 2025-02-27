<?php

//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;

require '../config/config.php';
require '../vendor/autoload.php';

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

$data = json_decode(file_get_contents("php://input"), true);

$infoName= $data['infoName'];
$infoLastName= $data['infoLastName'];
$infoEmail= $data['infoEmail'];
$infoPhone= $data['infoPhone'];

echo json_encode([
    "mesage" => "Informacion recibida y guardada con exito"
]);