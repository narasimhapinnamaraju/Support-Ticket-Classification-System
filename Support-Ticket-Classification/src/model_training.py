import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
from data_preprocessing import preprocess_text

def train_models():
    print("Loading data...")
    try:
        df = pd.read_csv('../dataset/sample_tickets.csv')
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return
        
    df.dropna(inplace=True)
    
    print("Preprocessing text... This may take a moment.")
    df['Clean_Text'] = df['Ticket Text'].apply(preprocess_text)
    
    print("Vectorizing text data...")
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(df['Clean_Text'])
    
    y_cat = df['Category']
    y_pri = df['Priority']
    
    X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(X, y_cat, test_size=0.2, random_state=42)
    X_train_p, X_test_p, y_train_p, y_test_p = train_test_split(X, y_pri, test_size=0.2, random_state=42)
    
    print("Training Category Model (Random Forest)...")
    cat_model = RandomForestClassifier(random_state=42)
    cat_model.fit(X_train_c, y_train_c)
    cat_preds = cat_model.predict(X_test_c)
    print("Category Model Accuracy:", accuracy_score(y_test_c, cat_preds))
    print(classification_report(y_test_c, cat_preds, zero_division=0))
    
    print("Training Priority Model (Logistic Regression)...")
    pri_model = LogisticRegression(random_state=42, max_iter=1000)
    pri_model.fit(X_train_p, y_train_p)
    pri_preds = pri_model.predict(X_test_p)
    print("Priority Model Accuracy:", accuracy_score(y_test_p, pri_preds))
    print(classification_report(y_test_p, pri_preds, zero_division=0))
    
    # Save models
    print("Saving models to /models/")
    os.makedirs('../models', exist_ok=True)
    joblib.dump(cat_model, '../models/category_model.pkl')
    joblib.dump(pri_model, '../models/priority_model.pkl')
    joblib.dump(vectorizer, '../models/tfidf_vectorizer.pkl')
    print("Done! Models are ready for inference.")

if __name__ == "__main__":
    train_models()
