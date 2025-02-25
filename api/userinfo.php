<?php
header("Content-Type: application/json");

require '../config/config.php';

$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

// Consulta SQL
$sql = "SELECT NAME, LASTNAME, PHONE, EMAIL FROM USER WHERE id = 1";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $fila = $result->fetch_assoc();
    echo json_encode($fila); // Convertir datos a JSON
} else {
    echo json_encode(["error" => "Usuario no encontrado"]);
}

$conn->close();
