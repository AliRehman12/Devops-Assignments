
import React from "react";
import ProductList from "@/components/ProductList";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2"
        >
          <ShoppingCart size={18} />
          <span>View Cart</span>
        </Button>
      </div>
      
      <ProductList />
    </Layout>
  );
};

export default Products;
