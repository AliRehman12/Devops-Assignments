
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-xl">E-Shop</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary">Products</Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/cart')}
              className="relative mr-2"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
