
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-2" 
          onClick={() => navigate('/products')}
        >
          <ArrowLeft className="mr-2" size={16} />
          Continue Shopping
        </Button>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <span>{item.product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>${item.product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center border rounded w-24">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="px-3">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-4 border-t mt-4">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate('/checkout')}
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
