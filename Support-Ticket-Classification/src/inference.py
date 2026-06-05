import joblib
import pandas as pd
from data_preprocessing import preprocess_text
import os

def load_system():
    try:
        model_dir = os.path.join(os.path.dirname(__file__), '../models')
        cat_model = joblib.load(os.path.join(model_dir, 'category_model.pkl'))
        pri_model = joblib.load(os.path.join(model_dir, 'priority_model.pkl'))
        vectorizer = joblib.load(os.path.join(model_dir, 'tfidf_vectorizer.pkl'))
        return cat_model, pri_model, vectorizer
    except FileNotFoundError:
        print("Models not found. Please run model_training.py first.")
        return None, None, None

def predict_category(text, cat_model, vectorizer):
    cleaned = preprocess_text(text)
    vec = vectorizer.transform([cleaned])
    return cat_model.predict(vec)[0]

def predict_priority(text, pri_model, vectorizer):
    cleaned = preprocess_text(text)
    vec = vectorizer.transform([cleaned])
    return pri_model.predict(vec)[0]

def predict_ticket(text):
    cat_model, pri_model, vectorizer = load_system()
    if not cat_model:
        return
        
    category = predict_category(text, cat_model, vectorizer)
    priority = predict_priority(text, pri_model, vectorizer)
    
    print("\n--- Ticket Prediction Result ---")
    print(f"Ticket: '{text}'")
    print(f"Predicted Category: {category}")
    print(f"Predicted Priority: {priority}")
    print("--------------------------------\n")

if __name__ == "__main__":
    # Test inference system
    sample_text = "My payment was deducted twice."
    predict_ticket(sample_text)
