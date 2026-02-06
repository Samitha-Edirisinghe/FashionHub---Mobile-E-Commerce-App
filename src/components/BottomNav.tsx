import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Settings } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const BottomNav = () => {
  const location = useLocation();
  const { itemCount } = useCart();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/cart', icon: ShoppingBag, label: 'Cart', badge: itemCount },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname.startsWith('/product');
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-3 px-4">
        {navItems.map(({ path, icon: Icon, label, badge }) => (
          <Link
            key={path}
            to={path}
            className={`bottom-nav-item ${isActive(path) ? 'bottom-nav-item-active' : ''}`}
          >
            <div className="relative">
              <Icon className="w-6 h-6" />
              {badge !== undefined && badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </div>
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
