# models 파일은 데이터베이스 테이블과 매칭되는 모델
from sqlalchemy import Column, BIGINT, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.database import Base
import pytz


class LaptopImage(Base):
    __tablename__ = 'laptop_image'
    laptop_image_id = Column(BIGINT, primary_key=True, autoincrement=True)
    path = Column(String(255), nullable=False)
    create_date = Column(DateTime, nullable=True, default=datetime.now(pytz.timezone("Asia/Seoul")))
    update_date = Column(DateTime, nullable=True)

    # FK
   # laptop_sell_info_id = Column(BIGINT, ForeignKey("laptop.laptop_id"), nullable=False)

    # 관계 매핑
    #laptops = relationship("Laptop", back_populates="laptop_images")

