<?php 

require '../config/config.php';
require '../vendor/autoload.php';


use Firebase\JWT\JWT;

//Configuración de errores
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');

// Obtener datos del frontend
$data = json_decode(file_get_contents("php://input"),true);
$name= $data['name'];
$lastname= $data['lastname'];
$phone= $data['phone'];
$email= $data['email'];
$password= $data['password'];
$confirmPassword= $data['confirmPassword'];

error_log($password);
error_log($confirmPassword);

// Validación de datos
if (empty($name) || empty($lastname) || empty($phone) || empty($email) || empty($password)) {
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

// Validacion de email unico
$stmt = $pdo->prepare("SELECT ID_USER FROM USER WHERE EMAIL = ?");
$stmt->execute([$email]);
if ($stmt->rowCount() > 0) {
    http_response_code(400);
    echo json_encode(["error" => "El email ya está registrado."]);
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

// Validar que ambas contraseñas sean iguales
if ($password != $confirmPassword){
    http_response_code(400);
    echo json_encode(["error" => "Ambas contraseñas no coinciden. Por favor vuelva a intentarlo."]);
    exit;
}

// Encriptar la password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql= 'INSERT INTO USER (NAME, LASTNAME, PHONE, EMAIL, PASSWORD) VALUES (?, ?, ?, ?, ?)';
$stmt= $pdo->prepare($sql);

try {
    // Inicia la transacción
    $pdo->beginTransaction();

    // Ejecuta la consulta
    $stmt->execute([$name, $lastname, $phone, $email, $hashed_password]);

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