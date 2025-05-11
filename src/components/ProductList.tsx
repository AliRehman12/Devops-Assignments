
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getProducts } from "@/services/productService";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const ProductList = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const products = getProducts();
  
  const handleAddToCart = (productId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`,
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="cursor-pointer transition-all hover:shadow-md"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="relative pt-[100%]">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
            />
          </div>
          
          <CardHeader className="pb-2">
            <h3 className="font-semibold truncate">{product.name}</h3>
            <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
          </CardHeader>
          
          <CardContent className="pb-2">
            <p className="text-gray-500 text-sm line-clamp-2">
              {product.description}
            </p>
          </CardContent>
          
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={(e) => handleAddToCart(product.id, e)}
            >
              <ShoppingCart className="mr-2" size={16} />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
