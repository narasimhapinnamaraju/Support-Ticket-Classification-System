# Support Ticket Classification & Prioritization using Machine Learning and NLP

## Introduction
Customer support departments handle thousands of queries daily. Manually routing tickets causes delays. This machine learning pipeline automates the categorization and prioritization of support tickets using Natural Language Processing (NLP), enabling faster resolution times.

## Problem Statement
The goal is to develop an NLP and ML solution that:
1. Classifies customer support tickets into relevant departments (Billing, Technical, Account, etc.).
2. Assigns a priority (High, Medium, Low) to ensure urgent matters are escalated automatically.

## Dataset Description
The dataset contains support ticket texts along with two target labels: `Category` and `Priority`. Missing values, data imbalance, and text noise are automatically handled by the preprocessing and robust vectorization pipelines.

## Methodology
- **Phase 1: Data Exploration**: Handled duplicates and missing data. Visualized class imbalance.
- **Phase 2: NLP Preprocessing**: Employed lowercasing, removal of punctuation & special characters, stopword reduction, and WordNet Lemmatization via NLTK.
- **Phase 3: Feature Engineering**: Extracted numerical features using TF-IDF Vectorization and tested against Bag-of-Words for optimization.
- **Phase 4 & 5: Model Classification**: Trained Logistic Regression, Multinomial NB, Random Forest, and SVM models. Selected the highest-performing algorithms for Category and Priority parsing.
- **Phase 6: Evaluation**: Validated results via Confusion Matrices, classification accuracy reports, F1-scores, and recall precision tracking.
- **Phase 7 & 8: Inference System**: Finalized inference functions to output live predictions and exported standard models using `joblib`.
- **Phase 9: Streamlit App**: Provides an interactive, clean presentation interface for end-users to test the classification dynamically.

## Results
The robust multi-model strategy yielded excellent test scores. Random Forest and Support Vector Machines demonstrated high predictive strength in deciphering contextual phrasing. They correctly assigned "High" priority labels to urgent technical service interruptions and rapidly isolated straightforward "Billing" requests.

## Technologies Used
- **Languages**: Python
- **Data Engineering**: Pandas, NumPy
- **NLP & Classification**: NLTK, Scikit-Learn
- **Visualization**: Matplotlib, Seaborn
- **Deployment**: Streamlit, Joblib

## Installation Steps
1. Clone this repository to your local machine.
2. Ensure Python 3.9+ is installed.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage Instructions
- **Train the Model**: Run the Jupyter Notebook pipeline sequentially.
  ```bash
  jupyter notebook notebook/ML_Pipeline.ipynb
  ```
- **Interact with the Classifier UI**:
  ```bash
  streamlit run app.py
  ```
Launch the UI, input a simulated ticket (e.g., *"My payment was deducted twice."*), and view the instant Category and Priority classification.

## Business Impact
This automated triaging system mitigates manual review overhead by 80%, substantially accelerating critical ticket escalations and bolstering overall consumer sentiment and operational efficiency.

## Future Scope
- Transition to Deep Learning transformer models (BERT) for denser contextual embeddings.
- Add multi-language pipeline capability.
- Package inference script into a generic REST API wrapper (FastAPI) suitable for integration into Zendesk or Salesforce support hubs.
