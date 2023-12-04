# models 파일은 데이터베이스 테이블과 매칭되는 모델
from sqlalchemy import Column, BIGINT, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.database import Base
import pytz


class LaptopSellInfo(Base):
    __tablename__ = 'laptop_sell_info'
    laptop_sell_info_id = Column(BIGINT, primary_key=True, autoincrement=True)
    device_name = Column(String(30), nullable=False)
    serial_number = Column(String(30), nullable=False)
    product_details = Column(String(255), nullable=False)
    step = Column(String(2), nullable=False)
    create_date = Column(DateTime, nullable=True, default=datetime.now(pytz.timezone("Asia/Seoul")))
    update_date = Column(DateTime, nullable=True)

    # foreignkey 생성
    account_id = Column(BIGINT, ForeignKey("account.account_id"), nullable=True)
    accounts = relationship("Account", back_populates="laptop_sell_infos")

    laptop_sell_images = relationship("LaptopSellImage", back_populates="laptop_sell_infos")
