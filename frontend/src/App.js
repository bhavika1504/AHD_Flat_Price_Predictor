import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PredictionForm from './components/PredictionForm';
import { Search, User, Bell, Menu, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false); // Close sidebar on mobile after selection
        }}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-layout">
        <header className="navbar">
          <button className="mobile-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search for locations, trends..." />
          </div>
          {/* <div className="navbar-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="user-profile">
              <div className="avatar">B</div>
              <span>Bhavika</span>
            </div>
          </div> */}
        </header>

        <section className="content-area">
          {activeTab === 'dashboard' ? <Dashboard /> : <PredictionForm />}
        </section>
      </main>
    </div>
  );
}

export default App;