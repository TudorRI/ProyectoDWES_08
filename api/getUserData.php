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

$userData = verificarToken(); // Verificamos el token

try {
    $user_id = $userData->user_id; // Extraemos el ID del USER
    
    $stmt = $pdo->prepare("SELECT NAME, LASTNAME, EMAIL, PHONE FROM USER WHERE ID_USER = ?");
    $stmt -> execute([$user_id]);
    $user= $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user){
        
        // Si existe el usuario recogemos los datos de la consulta y los mandamos al JS con JSON
        http_response_code(200);
        echo json_encode([
            "name" => $user['NAME'],
            "lastname" => $user['LASTNAME'],
            "email" => $user['EMAIL'],
            "phone" => $user['PHONE'],
        ]);
    }else{
        http_response_code(404);
        echo json_encode(["error" => "Usuario no encontrado."]);
    }
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => "Error en la solicitud. Inténtalo más tarde."]);
}
?>