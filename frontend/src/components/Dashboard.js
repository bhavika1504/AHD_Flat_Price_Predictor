import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, MapPin, DollarSign } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../apiConfig';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/analytics`);
                setAnalytics(response.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="loading">
            <p>Gathering market data...</p>

        </div>
    );

    const COLORS = ['#457367', '#B08E6F', '#764137', '#64748b', '#2c3e50'];

    return (
        <div className="dashboard-content">
            <header className="content-header">
                <h2>Ahmedabad Market Overview</h2>
                <p>Insights into current real estate trends across the city.</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card card">
                    <div className="stat-icon green">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Market Trend</span>
                        <span className="stat-value">Bullish (+4.2%)</span>
                    </div>
                </div>
                <div className="stat-card card">
                    <div className="stat-icon tan">
                        <MapPin size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Hottest Area</span>
                        <span className="stat-value">Sindhu Bhavan</span>
                    </div>
                </div>
                <div className="stat-card card">
                    <div className="stat-icon brown">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Avg. 3BHK Price</span>
                        <span className="stat-value">₹85.0 Lac</span>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-container card">
                    <h3>Top 10 Expensive Locations</h3>
                    <p className="chart-subtitle">Average property price in premium areas</p>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analytics?.top_locations}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={60} />
                                <YAxis tickFormatter={(value) => `₹${value / 100000}L`} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value) => [`₹${(value / 10000000).toFixed(2)} Cr`, 'Avg. Price']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="price" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-container card">
                    <h3>Price Distribution by BHK</h3>
                    <p className="chart-subtitle">Cost progression based on apartment size</p>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={analytics?.bhk_distribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="avg_price"
                                    nameKey="bhk"
                                    label={({ bhk }) => `${bhk} BHK`}
                                >
                                    {analytics?.bhk_distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`₹${(value / 100000).toFixed(1)} Lac`, 'Avg. Price']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
