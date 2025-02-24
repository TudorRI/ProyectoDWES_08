<?php
require '../config/config.php'; // Carga la configuración de Stripe

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
