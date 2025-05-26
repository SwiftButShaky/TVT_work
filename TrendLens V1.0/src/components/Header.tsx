import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600';
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">TrendLens</h1>
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link 
                to="/analysis" 
                className={`${isActive('/analysis')} transition-colors font-medium`}
              >
                Analysis
              </Link>
            </li>
            <li>
              <Link 
                to="/documentation" 
                className={`${isActive('/documentation')} transition-colors font-medium`}
              >
                Documentation
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;