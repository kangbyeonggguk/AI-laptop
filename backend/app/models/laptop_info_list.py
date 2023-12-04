from sqlalchemy import Column, Integer, String, DATETIME, func,ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base

class Laptop(Base):
    __tablename__ = 'laptop_info_list'

    laptop_info_list_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(16), index=True)
    price = Column(Integer, nullable=False)
    price_time_sale = Column(Integer, nullable=False)
    os = Column(String(16), nullable=False)
    screen_size = Column(String(16), nullable=False)
    business_usage = Column(String(16), nullable=False)
    internet_lecture_usage = Column(String(16), nullable=False)
    gaming_usage = Column(String(16), nullable=False)
    hardware = Column(String(32), nullable=False)
    hashtag = Column(String(64), nullable=False)
    purchase_limit = Column(String(16), nullable=False)
    delivery_fee = Column(String(16), nullable=False)
    product_code = Column(Integer, nullable=False)
    own_product_code = Column(String(16), nullable=False)
    manufacturing_company = Column(String(16), nullable=False)
    brand = Column(String(16), nullable=False)
    stock = Column(String(16), nullable=False)
    rank = Column(String(64), nullable=False)
    create_date = Column(DATETIME, nullable=False, default=func.utc_timestamp())
    update_date = Column(DATETIME)
    # Image 클래스와의 관계를 설정하며, Image 클래스는 아직 정의되지 않았으므로 문자열로 지정
    laptop_info_list_image = relationship("Image", back_populates="laptop")

class Image(Base):
    __tablename__ = 'laptop_info_list_image'

    laptop_info_image_id = Column(Integer, primary_key=True, index=True)
    laptop_info_list_id = Column(Integer, ForeignKey("laptop_info_list.laptop_info_list_id"))
    path = Column(String(255), nullable=False)
    create_date = Column(DATETIME, nullable=False, default=func.utc_timestamp())
    update_date = Column(DATETIME)
    laptop = relationship("Laptop", back_populates="laptop_info_list_image")