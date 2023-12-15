from pydantic import BaseModel


class LaptopSellFormCreate(BaseModel):
    device_name: str
    serial_number: str
    product_details: str
    step: int

    class Config:
        orm_mode: True