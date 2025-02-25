<?php
require '../config/config.php';
require 'vendor/autoload.php'; // Cargar Stripe con Composer

\Stripe\Stripe::setApiKey("TU_CLAVE_SECRETA"); // Reemplaza con tu clave secreta

try {
    $checkout_session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'usd',
                'product_data' => ['name' => 'Producto de prueba'],
                'unit_amount' => 1000, // Monto en centavos (10.00 USD)
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => "https://tusitio.com/success.php",
        'cancel_url' => "https://tusitio.com/cancel.php",
    ]);

    echo json_encode(['id' => $checkout_session->id]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
