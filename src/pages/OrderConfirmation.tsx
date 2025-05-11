
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 size={64} className="text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-xl mb-6">Thank you for your purchase.</p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8 w-full max-w-md">
          <p className="text-sm text-gray-500 mb-2">Order Number:</p>
          <p className="text-lg font-semibold mb-4">{orderId}</p>
          
          <p className="text-sm text-gray-500 mb-2">Order Date:</p>
          <p className="text-lg font-semibold mb-4">
            {new Date().toLocaleDateString()}
          </p>
          
          <p className="text-sm text-gray-500 mb-2">Estimated Delivery:</p>
          <p className="text-lg font-semibold">
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        </div>
        
        <p className="text-gray-600 mb-8">
          A confirmation email has been sent with your order details.
        </p>
        
        <Button onClick={() => navigate('/products')}>
          <ShoppingBag className="mr-2" size={16} />
          Continue Shopping
        </Button>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
