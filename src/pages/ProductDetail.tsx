
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/services/productService";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // In a real app, we would fetch this from an API
  const product = getProductById(id ? parseInt(id) : 0);
  
  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} x${quantity} added to your cart`,
    });
  };
  
  return (
    <Layout>
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/products')}
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <CardDescription className="text-xl font-semibold text-primary">
              ${product.price.toFixed(2)}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-700 mb-4">
              {product.description}
            </p>
            
            <div className="flex items-center space-x-4 mb-4">
              <span>Quantity:</span>
              <div className="flex items-center border rounded">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleAddToCart}
              className="w-full"
            >
              <ShoppingCart className="mr-2" size={16} />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductDetail;
