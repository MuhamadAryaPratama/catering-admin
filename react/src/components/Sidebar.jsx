import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-r from-blue-600 to-blue-700 text-white min-h-screen">
      <ul className="mt-6">
        <li className="py-3 pl-6 hover:bg-blue-800 cursor-pointer">
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="my-4 border-t border-gray-300" />
        <li className="py-3 pl-6 hover:bg-blue-800 cursor-pointer">
          <Link to="/foods" className="flex items-center space-x-2">
            <i className="fas fa-utensils"></i>
            <span>Menu Makanan</span>
          </Link>
        </li>
        <li className="py-3 pl-6 hover:bg-blue-800 cursor-pointer">
          <Link to="/category" className="flex items-center space-x-2">
            <i className="fas fa-list"></i>
            <span>Kategori</span>
          </Link>
        </li>
        <li className="py-3 pl-6 hover:bg-blue-800 cursor-pointer">
          <Link to="/orders" className="flex items-center space-x-2">
            <i className="fas fa-shopping-cart"></i>
            <span>Orders</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
