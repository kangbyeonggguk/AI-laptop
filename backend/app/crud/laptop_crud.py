from sqlalchemy.orm import Session, joinedload
from schemas.laptop_schema import LaptopInput
from models.laptop_model import Laptop2

def laptop_input(db: Session, laptop: LaptopInput):
    db_laptop = Laptop2(device_name=laptop.device_name, os=laptop.os, screen_size=laptop.screen_size,
                            hardware=laptop.hardware, brand=laptop.brand)
    db.add(db_laptop)
    db.commit()


