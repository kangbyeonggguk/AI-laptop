from pydantic import BaseModel

class CreateLaptop(BaseModel):
    title: str
    hashtag: str
    price: int
    price_time_sale: int
    os:str
    hardware:str
    rank:str
    laptop_info_list_id:int
    class Config:
        orm_mode: True


class PatchLaptop(BaseModel):
    laptop_id: int
    title: str
    hashtag: str
    price: int
    price_time_sale: int
    os:str
    hardware:str
    rank:str
    laptop_info_list_id:int
    class Config:
        orm_mode: True


