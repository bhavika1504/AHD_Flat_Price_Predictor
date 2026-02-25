import os
import json
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def index():
    return "Server is up and running!"


model = pickle.load(open("model/Ahmedabad_flats_price_model.pkl", "rb"))

with open("model/model_columns.json", "r") as f:
    columns = json.load(f)

def prepare_input(area, bhk, location):
    x = np.zeros(len(columns))
    
    x[columns.index("area_in_sqft")] = area
    x[columns.index("bhk")] = bhk
    
    loc_col = f"location_{location}"
    if loc_col in columns:
        x[columns.index(loc_col)] = 1
    
    return x.reshape(1, -1)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    
    area = float(data["area"])
    bhk = int(data["bhk"])
    location = data["location"]

    # sanity check
    if area / bhk < 250:
        return jsonify({
            "error": "Invalid input: area too small for given BHK"
        }), 400

    X = prepare_input(area, bhk, location)
    log_price = model.predict(X)[0]
    price = np.expm1(log_price)
    
    return jsonify({"predicted_price": round(price, 2)})

@app.route("/api/locations", methods=["GET"])
def get_locations():
    # Extracted from model_columns.json
    locs = [l.replace("location_", "") for l in columns if l.startswith("location_")]
    return jsonify(locs)

@app.route("/api/analytics", methods=["GET"])
def get_analytics():
    # Representative data based on notebook analysis
    data = {
        "top_locations": [
            {"name": "Ambli", "price": 12500000},
            {"name": "Bodakdev", "price": 11000000},
            {"name": "Science City", "price": 9500000},
            {"name": "Thaltej", "price": 9000000},
            {"name": "Sindhu Bhavan", "price": 15000000},
            {"name": "Satellite", "price": 8500000},
            {"name": "Prahlad Nagar", "price": 8800000},
            {"name": "Bopal", "price": 6000000},
            {"name": "Gota", "price": 4500000},
            {"name": "South Bopal", "price": 5500000}
        ],
        "bhk_distribution": [
            {"bhk": 1, "avg_price": 2500000},
            {"bhk": 2, "avg_price": 4500000},
            {"bhk": 3, "avg_price": 8500000},
            {"bhk": 4, "avg_price": 18000000},
            {"bhk": 5, "avg_price": 35000000}
        ]
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)