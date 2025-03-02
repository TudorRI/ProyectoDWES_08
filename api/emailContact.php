<?php

require '../config/config.php';
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;
use Dotenv\Loader\Loader;
use Firebase\JWT\JWT;

//Configuración de errores EN DESARROLLO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//Configuración de errores EN PRODUCCION
/*ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/errors.log');*/

// Cargar variables de entorno
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();


$smtpMailUsername = $_ENV['SMTP_MAIL_USERNAME'];
$smtpMailPassword = $_ENV['SMTP_MAIL_PASSWORD'];

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'];
$email = $data['email'];
$mensaje = $data['mensaje'];

// Validación de datos
if (empty($nombre) || empty($email) || empty($mensaje)) {
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

// Configuramos el correo con SMTP

$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $smtpMailUsername;
    $mail->Password = $smtpMailPassword;  // Clave de aplicación (NO la contraseña normal)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Remitente y destinatario
    $mail->setFrom('trentingsoporte@gmail.com', 'T-Renting Soporte');
    $mail->addAddress($email, $nombre); // Envía el correo al usuario que escribió en el formulario

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = "Notificacion Contacto - T-Renting";
    $mail->Body    = "
        <p>Hola <strong>$nombre</strong>,</p>
        <p>Hemos recibido tu mensaje:</p>
        <blockquote>$mensaje</blockquote>
        <p>Nos pondremos en contacto contigo lo antes posible.</p>
        <p>Atentamente, <br> <strong>El equipo de T-Renting</strong></p>
    ";

    // Enviar el correo
    $mail->send();

    http_response_code(200);
    echo json_encode(["success" => "Mensaje enviado correctamente"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al enviar el mensaje: " . $mail->ErrorInfo]);
    
}
