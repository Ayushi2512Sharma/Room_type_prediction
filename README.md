# Room_type_prediction
#  Room Type Prediction using Machine Learning

A Machine Learning web application that predicts the **room type of an Airbnb listing** based on listing-related features such as location, price, minimum nights, reviews, availability, and neighbourhood information.
The project uses a trained Machine Learning pipeline with a **FastAPI backend** and a web-based frontend.

##  Live Demo

 **Live Application:**
https://room-type-prediction-zup4.onrender.com

The application allows users to enter Airbnb listing details and receive:
*  Predicted Room Type
*  Prediction Probabilities

##  Project Overview
The goal of this project is to build a Machine Learning application that can predict the room type of an Airbnb listing from its available features.
The Machine Learning model is integrated with a **FastAPI REST API**, while the frontend provides a simple interface for users to enter listing information.

### Workflow
```text
User Input
    ↓
Frontend (HTML + CSS + JavaScript)
    ↓
POST Request
    ↓
FastAPI Backend
    ↓
Pre-trained ML Pipeline
    ↓
Room Type Prediction
    ↓
Prediction Probability
    ↓
Result displayed on Website
```

##  Technologies Used
### Frontend
* HTML
* CSS
* JavaScript

### Backend
* Python
* FastAPI
* Uvicorn
* Pydantic

### Machine Learning
* Pandas
* Scikit-learn
* Joblib

### Deployment
* Render
* GitHub

##  Features Used
The model uses the following Airbnb listing features:

| Feature                          | Description                            |
| -------------------------------- | -------------------------------------- |
| `latitude`                       | Geographic latitude of the listing     |
| `longitude`                      | Geographic longitude of the listing    |
| `price`                          | Price per night                        |
| `minimum_nights`                 | Minimum number of nights required      |
| `number_of_reviews`              | Total number of reviews                |
| `reviews_per_month`              | Average reviews received per month     |
| `calculated_host_listings_count` | Number of listings managed by the host |
| `availability_365`               | Number of available days in a year     |
| `neighbourhood_group`            | Neighbourhood group of the listing     |
| `neighbourhood`                  | Specific neighbourhood                 |

##  Machine Learning Model
The trained Machine Learning pipeline is saved using **Joblib** and loaded by the FastAPI backend.
The backend receives the input data, converts it into a Pandas DataFrame, and passes it to the trained model.

##  Deployment
The backend is deployed as a FastAPI web service on **Render**, while the frontend can be deployed separately as a static website.
Render supports FastAPI deployment using a Python web service and Uvicorn.

##  Application Features
* ✅ User-friendly prediction form
* ✅ Input validation
* ✅ Machine Learning-based prediction
* ✅ Prediction probability display
* ✅ REST API using FastAPI
* ✅ CORS support
* ✅ Deployed backend
* ✅ Deployed frontend
* ✅ Real-time prediction through API

##  Author
**Ayushi Sharma**

Computer Science Student
Interested in Machine Learning, Data Analytics 

This project was developed as a Machine Learning application to demonstrate the complete workflow from **data processing and model prediction to API development and deployment**.
