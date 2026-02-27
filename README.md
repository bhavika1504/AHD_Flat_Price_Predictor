# 🏙️ Ahmedabad Flat Price Predictor

A modern, full-stack web application designed to predict residential property prices in Ahmedabad, India, using Machine Learning.

---

## 🌟 Overview

The **Ahmedabad Flat Price Predictor** leverages a Linear Regression model trained on real-world housing data from Ahmedabad. It provides users with an intuitive interface to estimate property values based on key parameters like location, area (sqft), and number of bedrooms (BHK).

### Why use this?
- **Data-Driven**: Predictions are backed by algorithmic analysis.
- **Interactive Dashboard**: View real-time analytics, including top-priced locations and BHK distributions.
- **Premium UI**: A sleek, responsive design built with React, Framer Motion, and Tailwind-inspired aesthetics.

---

## 🚀 Key Features

- **🎯 Precise Prediction**: Enter property details to get an instant market value estimate.
- **📊 Live Analytics**: Dynamic charts visualizing property trends across different neighborhoods.
- **📱 Responsive Design**: Seamless experience across mobile, tablet, and desktop devices.
- **⚡ Real-time Feedback**: Interactive form with immediate validation and smooth animations.
- **📍 Location Intelligence**: Supports major residential hubs across Ahmedabad (Ambli, Bodakdev, Bopal, etc.).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/)
- **State Management**: React Hooks
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts/Graphs**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Framework**: [Flask](https://flask.palletsprojects.com/) (Python)
- **Engine**: [Scikit-Learn](https://scikit-learn.org/) (Linear Regression)
- **Data Handling**: NumPy, Pandas
- **Serialization**: Pickle
- **CORS**: Flask-CORS for secure frontend-backend communication

### Data Science
- **Environment**: Jupyter Notebook
- **Analysis**: Feature engineering, outlier removal, and model optimization.

---

## 📂 Project Structure

```bash
├── backend/            # Flask API & ML Model
│   ├── model/          # Trained .pkl model and column definitions
│   ├── app.py          # API Endpoints
│   └── requirements.txt
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Dashboard, Prediction Form, Sidebar
│   │   └── apiConfig.js# Backend connection settings
│   └── package.json
└── notebook/           # Data Science research and Model training
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Python 3.8+
- Node.js & npm

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
*The server will start at `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
*The app will open at `http://localhost:3000`*

---

## 🔮 Future Enhancements
- [ ] Integration with Google Maps API for neighborhood selection.
- [ ] Historical price trend analysis.
- [ ] User authentication for saved predictions.
- [ ] Deployment to Vercel (Frontend) and Render/Heroku (Backend).

---

## 📄 License
This project is for educational purposes. Feel free to use and modify for your own learning!

---
*Built with ❤️ for Ahmedabad.*
