<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\Order;
use App\Mail\NewOrderNotification;
use Illuminate\Support\Facades\Mail;

class EmailNotificationService
{
    public function sendNewOrderNotification(Order $order)
    {
        try {
            // Get all admin emails
            $adminEmails = Admin::pluck('email')->toArray();

            // Send email to all admins
            foreach ($adminEmails as $email) {
                Mail::to($email)->send(new NewOrderNotification($order));
            }

            \Log::info('Order notification email sent successfully for order #' . $order->id);
            return true;
        } catch (\Exception $e) {
            \Log::error('Failed to send order notification email for order #' . $order->id . ': ' . $e->getMessage());
            return false;
        }
    }
}