<?php 

require '../config/config.php';
require '../vendor/autoload.php';

//Configuración de errores
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');



try{

    $sql = "SELECT ID_CAR, BRAND, MODEL, RELEASE_YEAR, DAY_PRICE FROM CAR WHERE AVAILABLE = 1";
    $stmt = $pdo->query($sql);
    $cars= $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($cars as $index => &$car) {
        $car['IMAGE_URL'] = "../styles/cars/coche" . ($index + 1) . ".png"; // coche1, coche2, coche3 ...
    }
    echo json_encode($cars);

}catch(PDOException $e){
    error_log("Error en la base de datos: " . $e->getMessage());
    echo json_encode(["error" => "Error en la base de datos"]);
    exit;
}
?>