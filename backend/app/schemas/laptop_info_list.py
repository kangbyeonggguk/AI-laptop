from pydantic import BaseModel
from typing import Optional, List


# 순환참조 문제: 인터프립터 언어 특징상 LaptopBase에서 image를 참조해야 하므로 Imageclass를 먼저 선언
class ImageBase(BaseModel):
    laptop_info_list_id: int
    path: str


class Image(ImageBase):
    laptop_info_image_id: int

    class Config:
        orm_mode = True

class PatchLaptopinfo(BaseModel):
    info_id: int
    device_name: str
    screen_size: str
    business_usage: str
    internet_lecture_usage: str
    gaming_usage: str
    purchase_limit: str
    delivery_fee: str
    manufacturing_company: str
    brand: str

    class Config:
        orm_mode = True
    