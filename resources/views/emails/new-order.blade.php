<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { padding: 20px; }
        .header { background: #f8f9fa; padding: 15px; margin-bottom: 20px; }
        .order-details { margin: 20px 0; }
        .footer { margin-top: 30px; text-align: center; color: #6c757d; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Order Notification</h2>
            <p>Order #{{ $order->id }} has been received</p>
        </div>

        <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Date:</strong> {{ Carbon\Carbon::parse($order->created_at)->format('d M Y H:i:s') }}</p>
            <p><strong>Customer Name:</strong> {{ $order->name }}</p>
            <p><strong>Address:</strong> {{ $order->address }}</p>
            <p><strong>Phone:</strong> {{ $order->phone }}</p>
            <p><strong>Items:</strong> {{ $order->food_name }}</p>
            <p><strong>Quantity:</strong> {{ $order->quantity }}</p>
            <p><strong>Total Amount:</strong> Rp {{ number_format($order->total_amount, 0, ',', '.') }}</p>
        </div>

        <div class="footer">
            <p>This is an automated message. Please do not reply.</p>
        </div>
    </div>
</body>
</html>