<?php
require '../config/config.php';

$payload = @file_get_contents('php://input');
$event = null;

try {
    $event = \Stripe\Event::constructFrom(json_decode($payload, true));
} catch (\UnexpectedValueException $e) {
    http_response_code(400);
    exit();
}

// Maneja el evento de pago exitoso
if ($event->type === 'checkout.session.completed') {
    $session = $event->data->object;

    // Guarda la información en tu base de datos
    // Ejemplo: INSERT INTO pagos (stripe_session_id, monto, estado) VALUES (...)
}

http_response_code(200);
