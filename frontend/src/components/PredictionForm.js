import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Calculator, MapPin, Square, Layers, CircleCheck } from 'lucide-react';
import { motion } from 'framer-motion';

import API_BASE_URL from '../apiConfig';

const PredictionForm = () => {
    const [area, setArea] = useState('');
    const [bhk, setBhk] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const areaRef = useRef(null);
    const bhkRef = useRef(null);
    const locationRef = useRef(null);
    const submitRef = useRef(null);

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            nextRef.current.focus();
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/locations`);
                setLocations(response.data);
            } catch (err) {
                console.error('Error fetching locations');
            }
        };
        fetchLocations();
    }, []);

    const predictPrice = async (e) => {
        e.preventDefault();
        if (!area || !bhk || !location) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/predict`, {
                area,
                bhk,
                location,
            });
            setPrice(res.data.predicted_price);
        } catch (err) {
            setPrice(null);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Error predicting price. Ensure backend is running.');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatINR = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <div className="prediction-container">
            <div className="prediction-header">
                <h2>Property Value Estimator</h2>
                <p>Get a precise market estimate for your house based on area and location.</p>
            </div>

            <div className="prediction-layout">
                <form className="prediction-form card" onSubmit={predictPrice}>
                    <div className="input-group">
                        <label><Square size={16} /> Total Area (sqft)</label>
                        <input
                            ref={areaRef}
                            type="number"
                            placeholder="e.g. 1500"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, bhkRef)}
                        />
                    </div>

                    <div className="input-group">
                        <label><Layers size={16} /> Bedrooms (BHK)</label>
                        <input
                            ref={bhkRef}
                            type="number"
                            placeholder="e.g. 3"
                            value={bhk}
                            onChange={(e) => setBhk(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, locationRef)}
                        />
                    </div>

                    <div className="input-group">
                        <label><MapPin size={16} /> Preferred Location</label>
                        <select
                            ref={locationRef}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, submitRef)}
                        >
                            <option value="">Select Location</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <button
                        ref={submitRef}
                        type="submit"
                        className="btn-primary predict-btn"
                        disabled={loading}
                    >
                        <Calculator size={20} />
                        {loading ? 'Analyzing...' : 'Calculate Estimate'}
                    </button>
                </form>

                <div className="result-section">
                    {price !== null ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="result-card card"
                        >
                            <div className="result-badge">
                                <CircleCheck size={16} /> Verified Algorithm
                            </div>
                            <span className="result-label">Estimated Market Value</span>
                            <h3 className="result-value">{formatINR(price)}</h3>
                            <p className="result-meta">Based on recent sales in {location}</p>

                            <div className="result-breakdown">
                                <div className="breakdown-item">
                                    <span>Price per sqft:</span>
                                    <span>{formatINR(price / area)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="result-placeholder card">
                            <Calculator size={48} className="placeholder-icon" />
                            <p>Enter property details to generate an instant AI-powered valuation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;
