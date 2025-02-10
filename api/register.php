<?php 

require '../config/config.php';

// Obtener datos del frontend
$data = json_decode(file_get_contents("php://input"),true);
$name= $data['name'];
$lastname= $data['lastname'];
$phone= $data['phone'];
$email= $data['email'];
$password= $data['password'];

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
if (!preg_match('/^[0-9]{9}$/', $telefono)) {
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

    // Confirma la transacción
    $pdo->commit();

    echo json_encode(["message" => "Usuario registrado exitosamente"]);
} catch (Exception $e) {
    // Revierte la transacción si hay un error
    $pdo->rollBack();
    echo json_encode(["error" => "Error al registrar el usuario: " . $e->getMessage()]);
}
?>