import tkinter as tk
import time
import threading
import pyttsx3
import speech_recognition as sr
from groq import Groq
import json

# Load API key and initial prompt from safe.json
with open('safe1.json') as f:
    item = json.load(f)
    groq_api_key = item['groq_api_key']
    initial_prompt = item['initial_prompt']

# Initialize the Groq client
groq_client = Groq(api_key=groq_api_key)

# Initialize the TTS engine, speech recognizer, and initial conversation
engine = pyttsx3.init()
recognizer = sr.Recognizer()
convo = [{'role': 'system', 'content': initial_prompt}]

# Function to prompt Groq with user input
def groq_prompt(prompt, conversation):
    conversation.append({'role': 'user', 'content': prompt})
    chat_completion = groq_client.chat.completions.create(messages=conversation, model='llama3-70b-8192')
    response = chat_completion.choices[0].message
    conversation.append({'role': 'assistant', 'content': response.content})
    return response.content

# Function to recognize speech from microphone
def recognize_speech_from_mic():
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)

    try:
        print("Recognizing...")
        speech_text = recognizer.recognize_google(audio)
        print(f"User: {speech_text}")
        return speech_text
    except sr.UnknownValueError:
        print("Sorry, I did not understand that.")
        return ""
    except sr.RequestError:
        print("Could not request results; check your network connection.")
        return ""

# Tkinter GUI for the chatbot face
class ChatbotFace(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Chatbot Face")

        self.canvas = tk.Canvas(self, width=300, height=300)
        self.canvas.pack()

        # Draw initial face components
        self.eye_left = self.canvas.create_oval(80, 80, 120, 120, fill="black")
        self.eye_right = self.canvas.create_oval(180, 80, 220, 120, fill="black")
        
        # Draw happy mouth
        self.mouth = self.canvas.create_arc(100, 150, 200, 180, start=0, extent=-180, style=tk.ARC)

        # Start blinking loop
        self.blink()

    def blink(self):
        self.canvas.itemconfig(self.eye_left, fill="white")
        self.canvas.itemconfig(self.eye_right, fill="white")
        self.after(250, self.unblink)

    def unblink(self):
        self.canvas.itemconfig(self.eye_left, fill="black")
        self.canvas.itemconfig(self.eye_right, fill="black")
        self.after(10000, self.blink) 

# Main function for chatbot interaction
def main():
    face = ChatbotFace()
    face.mainloop()

# Function to handle speech recognition and chatbot interaction
def chatbot_interaction():
    while True:
        prompt = recognize_speech_from_mic()
        if prompt:
            response = groq_prompt(prompt, convo)
            print(response)

            # Use TTS to speak the response
            engine.say(response)
            engine.runAndWait()

if __name__ == "__main__":
    gui_thread = threading.Thread(target=main)
    gui_thread.start()
    chatbot_interaction()
