from pydantic_settings import BaseSettings
from decouple import config

class Settings(BaseSettings):
    twilio_account_sid: str=config('twilio_account_sid')
    twilio_auth_token: str=config('twilio_auth_token')
    twilio_phone_number: str=config('twilio_phone_number')

    