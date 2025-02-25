<?php
header("Content-Type: application/json");

require '../config/config.php';

// Conectar a MySQL usando mysqli
$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit;
}

// Consulta SQL preparada para mayor seguridad
$sql = "SELECT NAME, LASTNAME, PHONE, EMAIL FROM USER WHERE id = ?";
$stmt = $conn->prepare($sql);
$id = 1;
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $fila = $result->fetch_assoc();
    echo json_encode($fila); // Convertir datos a JSON
} else {
    echo json_encode(["error" => "Usuario no encontrado"]);
}

// Cerrar conexiones
$stmt->close();
$conn->close();
