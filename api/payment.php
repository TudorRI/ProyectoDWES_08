<<<<<<< HEAD
<?php
require '../config/config.php'; // Carga la configuración de Stripe
require '../vendor/autoload.php';


header('Content-Type: application/json');

try {
    // Obtén los datos del pago desde el frontend (precio, descripción, etc.)
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // Crea una sesión de pago con Stripe Checkout
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'eur', // Cambia a tu moneda
                'product_data' => [
                    'name' => 'Alquiler de coche',
                ],
                'unit_amount' => $data->amount * 100, // Stripe usa centavos
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => 'https://tudominio.com/exito', // URL de éxito
        'cancel_url' => 'https://tudominio.com/cancelado', // URL de cancelación
    ]);

    // Devuelve el ID de la sesión al frontend
    echo json_encode(['sessionId' => $session->id]);
} catch (\Stripe\Exception\ApiErrorException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
=======
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


$userData = verificarToken(); //Verificamos que el token sea valido
$user_id = $userData->user_id; // Recuperamos del token el user_id

$data = json_decode(file_get_contents("php://input"), true);

// Recuperamos los datos bancarios
$cardNumber = $data['cardNumber'];
$cardHolder = $data['cardHolder'];
$expireDate = $data['expireDate'];
$cvv = $data['cvv'];

$id_car = $data['id_car'];
$initialDate = $data['initialDate'];
$finalDate = $data['finalDate'];
$total = $data['total'];


// Comprobamos que se han rellenado
if(empty($cardNumber) || empty($cardHolder) || empty($expireDate) || empty($cvv)){
    http_response_code(400);
    echo json_encode(["error" => "No se han introducido los datos bancarios"]);
    exit;
}else{

    // Realizamos la insercion de la reserva
    $sql = 'INSERT INTO BOOKING (ID_USER, ID_CAR, DATE_START, DATE_FINISH, TOTAL) VALUES (?, ?, ?, ?, ?)';
    $stmt = $pdo->prepare($sql);

    try{
        // Ejecuta la consulta
        $stmt->execute([$user_id, $id_car, $initialDate, $finalDate, $total]);

        http_response_code(200);
        echo json_encode(["success" => "Reserva confirmada con exito"]);

    }catch(Throwable $e){
        http_response_code(500);
        echo json_encode(["error" => " Ha ocurrido el siguiente error: " . $e->getMessage()]);
    }
}
?>
>>>>>>> 33f791d (Guardado)
