
import os

import boto3
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

load_dotenv()

app = FastAPI(title="The Automation Hub API")

# Allow the local React website to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
  
allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
],

    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS SES configuration
ses = boto3.client(
    "ses",
    region_name=os.getenv("AWS_REGION", "ap-southeast-2"),
)

SENDER = os.getenv("SES_SENDER")
CONTACT_EMAIL = os.getenv("CONTACT_EMAIL")


# Contact form data
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str


# Test the API
@app.get("/")
def home():
    return {"message": "The Automation Hub API is running"}


# Send contact form submissions through AWS SES
@app.post("/contact")
def send_contact_email(form: ContactForm):
    if not SENDER or not CONTACT_EMAIL:
        raise HTTPException(
            status_code=500,
            detail="Email configuration is missing.",
        )

    try:
        ses.send_email(
            Source=SENDER,
            Destination={
                "ToAddresses": [CONTACT_EMAIL],
            },
            Message={
                "Subject": {
                    "Data": f"Website inquiry from {form.name}",
                },
                "Body": {
                    "Text": {
                        "Data": (
                            f"Name: {form.name}\n"
                            f"Email: {form.email}\n\n"
                            f"Message:\n{form.message}"
                        ),
                    },
                },
            },
            ReplyToAddresses=[str(form.email)],
        )

        return {
            "message": "Your inquiry has been sent successfully."
        }

    except Exception as e:
        print("SES error:", str(e))
        raise HTTPException(
            status_code=500,
            detail="Email could not be sent. Check the backend logs.",
        )
