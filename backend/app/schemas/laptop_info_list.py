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


class LaptopBase(BaseModel):
    title: Optional[str] = None
    price: int
    price_time_sale: int
    os: str
    screen_size: str
    business_usage: str
    internet_lecture_usage: str
    gaming_usage: str
    hardware: str
    hashtag: str
    purchase_limit: str
    delivery_fee: str
    product_code: int
    own_product_code: str
    manufacturing_company: str
    brand: str
    stock: str
    rank: str
    laptop_info_list_image: List[Image] = []


class Laptop(LaptopBase):
    laptop_info_list_id: int

    class Config:
        orm_mode = True