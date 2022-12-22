import os
import openai
import streamlit as st

# Set the API key
openai.api_key = os.getenv("OPENAI_API_KEY") or st.secrets["OPENAI_API_KEY"]

st.title("Restaurant Suggestion App")

# Get input from the user
input_text = st.text_input("Enter a location to get restaurant suggestions:")

# Use GPT-3 to generate text based on the input
prompt = (f"Restaurant suggestions in {input_text}")
model = "text-davinci-003"
completions = openai.Completion.create(
    engine=model,
    prompt=prompt,
    max_tokens=2048,
    n=1,
    temperature=0.5,
)

# Show the generated text to the user
output_text = completions.choices[0].text
st.write(output_text)