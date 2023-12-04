from pydantic import BaseModel


class LaptopInput(BaseModel):
    device_name: str
    os: str
    screen_size: str
    hardware: str
    brand: str

    class Config:
        orm_mode: True


