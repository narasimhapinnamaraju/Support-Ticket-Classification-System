import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

def download_nltk_resources():
    datasets = ['punkt', 'stopwords', 'wordnet', 'punkt_tab']
    for data in datasets:
        try:
            nltk.download(data, quiet=True)
        except:
            pass

def preprocess_text(text):
    """
    Cleans text by removing punctuation, special chars, lowercasing, 
    removing stopwords and lemmatizing.
    """
    if not isinstance(text, str):
        return ""
        
    download_nltk_resources()
        
    # Lowercase
    text = text.lower()
    
    # Remove punctuation and special characters
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    
    # Tokenization
    tokens = word_tokenize(text)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    
    return " ".join(tokens)
