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

try {

    $sql = "SELECT ID_CAR, BRAND, MODEL, RELEASE_YEAR, DAY_PRICE FROM CAR WHERE AVAILABLE = 1";
    $stmt = $pdo->query($sql);
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($cars as $index => &$car) {
        $car['IMAGE_URL'] = "../styles/cars/coche" . ($index + 1) . ".png"; // coche1, coche2, coche3 ...
    }
    echo json_encode($cars);
} catch (PDOException $e) {
    echo json_encode(["error" => "Hubo un problema al cargar los coches. Inténtelo de nuevo más tarde."]);
    exit;
}
