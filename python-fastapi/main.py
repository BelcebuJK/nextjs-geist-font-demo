from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import random
import math

app = FastAPI()

class ReceiptRequest(BaseModel):
    origin: str
    destination: str
    datetime: str

class ReceiptData(BaseModel):
    totalFare: float
    baseFare: float
    duration: str
    applicationFee: float
    agreedFare: float
    cardNumber: str
    transactionDate: str
    transactionTime: str

def estimate_distance(origin: str, destination: str) -> float:
    locations = {
        'polanco': (19.4326, -99.1909),
        'roma norte': (19.4184, -99.1648),
        'condesa': (19.4103, -99.1711),
        'centro histórico': (19.4326, -99.1332),
        'santa fe': (19.3598, -99.2674),
        'coyoacán': (19.3467, -99.1618),
        'xochimilco': (19.2647, -99.1031),
        'aeropuerto': (19.4363, -99.0721)
    }
    origin_key = next((k for k in locations if k in origin.lower()), None)
    dest_key = next((k for k in locations if k in destination.lower()), None)
    if origin_key and dest_key:
        orig = locations[origin_key]
        dest = locations[dest_key]
        lat_diff = orig[0] - dest[0]
        lng_diff = orig[1] - dest[1]
        distance = math.sqrt(lat_diff**2 + lng_diff**2) * 111
        return max(5, round(distance))
    return random.randint(10, 30)

@app.post("/generate-receipt", response_model=ReceiptData)
def generate_receipt(request: ReceiptRequest):
    try:
        date = datetime.fromisoformat(request.datetime)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid datetime format")

    hour = date.hour
    distance = estimate_distance(request.origin, request.destination)
    is_peak_hour = 7 <= hour <= 9 or 17 <= hour <= 20

    if distance <= 5:
        base_fare = round(random.uniform(85, 110), 2)
    elif distance <= 10:
        base_fare = round(random.uniform(100, 130), 2)
    else:
        base_fare = round(random.uniform(120, 145), 2)

    if is_peak_hour:
        base_fare = round(base_fare * random.uniform(1.1, 1.2), 2)

    application_fee = round(random.uniform(3, 8), 2)

    has_agreed_fare = random.choice([True, False])
    if has_agreed_fare:
        agreed_fare = round(base_fare + random.uniform(-10, 10), 2)
    else:
        agreed_fare = base_fare

    total_fare = round(agreed_fare + application_fee, 2)

    duration = max(12, round(distance * random.uniform(2, 4)))

    card_number = "4768"

    transaction_date = date.strftime("%d/%m/%Y")
    transaction_time = date.strftime("%I:%M %p")

    return ReceiptData(
        totalFare=total_fare,
        baseFare=base_fare,
        duration=f"{duration}min",
        applicationFee=application_fee,
        agreedFare=agreed_fare,
        cardNumber=card_number,
        transactionDate=transaction_date,
        transactionTime=transaction_time
    )
