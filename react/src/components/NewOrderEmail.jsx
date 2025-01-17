import React from "react";

const NewOrderEmail = ({ order }) => {
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(order.total_amount);

  const formattedDate = new Date(order.created_at).toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="font-sans leading-relaxed">
      <div className="p-5">
        <div className="bg-gray-100 p-4 mb-5">
          <h2 className="text-2xl font-bold mb-2">New Order Notification</h2>
          <p className="text-gray-700">Order #{order.id} has been received</p>
        </div>

        <div className="my-5">
          <h3 className="text-xl font-bold mb-4">Order Details:</h3>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Date:</span> {formattedDate}
            </p>
            <p>
              <span className="font-semibold">Customer Name:</span> {order.name}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {order.address}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.phone}
            </p>
            <p>
              <span className="font-semibold">Items:</span> {order.food_name}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {order.quantity}
            </p>
            <p>
              <span className="font-semibold">Total Amount:</span>{" "}
              {formattedAmount}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>This is an automated message. Please do not reply.</p>
        </div>
      </div>
    </div>
  );
};

export default NewOrderEmail;
