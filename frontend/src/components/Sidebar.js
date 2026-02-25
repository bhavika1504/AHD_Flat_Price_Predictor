import React from 'react';
import { Home, BarChart2, Layout, Info } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Analytics Hub', icon: Layout },
        { id: 'prediction', label: 'Price Predictor', icon: BarChart2 },
        // { id: 'data', label: 'Dataset View', icon: Database },
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-logo">
                <Home size={28} className="logo-icon" />
                <span>Ahmedabad Flat Price Predictor</span>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="sidebar-footer">
                <div className="footer-item">
                    <Info size={16} />
                    <span>Based on 2024-25 listing dataset</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
