<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;

require '../config/config.php';
require '../vendor/autoload.php';


// Obtener datos del frontend
$data = json_decode(file_get_contents("php://input"),true);
$name= $data['name'];
$lastname= $data['lastname'];
$phone= $data['phone'];
$email= $data['email'];
$password= $data['password'];

// Validacion de email unico
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->rowCount() > 0) {
    http_response_code(400);
    echo json_encode(["error" => "El email ya está registrado."]);
    exit;
}

// Validación de datos
if (empty($name) || empty($lastname) || empty($phone) || empty($email) || empty($password)) {
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

// Validacion del email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Formato de email no válido"]);
    exit;
}

// Validar que tenga exactamente 9 dígitos numéricos
if (!preg_match('/^[0-9]{9}$/', $phone)) {
    http_response_code(400);
    echo json_encode(["error" => "Número de teléfono inválido"]);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql= 'INSERT INTO users (NAME, LASTNAME, PHONE, EMAIL, PASSWORD) VALUES (?, ?, ?, ?, ?)';
$stmt= $pdo->prepare($sql);

try {
    // Inicia la transacción
    $pdo->beginTransaction();

    // Ejecuta la consulta
    $stmt->execute([$name, $lastname,$phone, $email, $hashed_password]);

    $user_id = $pdo->lastInsertId();

    $payload= [
        "user_id" => $user_id,
        "email" => $email,
        "exp" => time() + 3600 // Expira en 1 hora
    ];
    $token = JWT::encode($payload, $jwtSecret, 'HS256');

    // Confirma la transacción
    $pdo->commit();

    echo json_encode([
        "message" => "Usuario registrado exitosamente",
        "token" => $token
    ]);

} catch (Exception $e) {
    // Revierte la transacción si hay un error
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar el usuario: " . $e->getMessage()]);
}
?>

