import streamlit as st
import requests
from bs4 import BeautifulSoup
import spacy

# Load the NLP model
nlp = spacy.load("en_core_web_md")

def extract_text(url):
    """Extracts text from the given URL using BeautifulSoup."""
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = soup.find_all("p")
        text = " ".join(p.get_text() for p in paragraphs)
        return text if text else None
    except requests.exceptions.RequestException:
        return None

def check_relevance(subject, content):
    """Computes similarity between subject and extracted content using spaCy."""
    subject_doc = nlp(subject)
    content_doc = nlp(content)
    return subject_doc.similarity(content_doc) * 100  # Convert to percentage

# Streamlit UI
st.title("Link Relevance Checker")
subject = st.text_input("Enter the subject/topic:")
link = st.text_input("Enter the URL:")

if st.button("Check Relevance"):
    if not subject or not link:
        st.error("Both subject and link are required.")
    else:
        content = extract_text(link)
        if not content:
            st.error("Failed to extract content from the link.")
        else:
            relevance_score = check_relevance(subject, content)
            st.write(f"Relevance Score: {round(relevance_score, 2)}%")
            if relevance_score >= 50:
                st.success("The link is relevant to the subject.")
            else:
                st.warning("The link is not very relevant to the subject.")
