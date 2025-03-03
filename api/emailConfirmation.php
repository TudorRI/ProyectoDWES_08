<?php

require '../config/config.php';
require '../vendor/autoload.php';
require '../api/auth.php';

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

$userData = verificarToken();
$user_id = $userData->user_id;

$sql = ("SELECT NAME, EMAIL FROM USER WHERE ID_USER = ?");
$stmt = $pdo->prepare($sql);
$stmt->execute([$user_id]);
$user= $stmt->fetch(PDO::FETCH_ASSOC);

$name = $user['NAME'];
$email = $user['EMAIL'];

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
    $mail->addAddress($email, $name); // Envía el correo al usuario que escribió en el formulario

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = "Confirmacion de Reserva - T-Renting";
    $mail->Body    = "
        <p>Hola <strong>$name</strong>,</p>
        <p>Hemos recibido el pago y confirmado tu reserva</p>
        <p>Para consultar los detalles de la reserva, entra en nuestra pagina web y ve al apartado Mis Reservas.</p>
        <p>Esperamos que disfrutes mucho tu vehículo. Para cualquier duda, no dudes en contactar con nosotros via teléfono o email.</p><br></br>
        <p>Atentamente, <br> <strong>El equipo de T-Renting</strong></p>
    ";

    // Enviar el correo
    $mail->send();

    http_response_code(200);
    echo json_encode(["success" => "Mensaje de confirmacion enviado correctamente"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al enviar el mensaje: " . $mail->ErrorInfo]);
    
}
