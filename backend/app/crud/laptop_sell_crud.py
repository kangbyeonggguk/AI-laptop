from sqlalchemy.orm import Session, joinedload
from models.laptop_sell_info_model import LaptopSellInfo
from models.laptop_sell_image_model import LaptopSellImage
from core.s3 import s3_connection
from io import BytesIO
from core import util
from typing import List, Annotated
from fastapi import UploadFile, Form
from serving import image_serving


async def laptop_sell_info_input(device_name: Annotated[str, Form()], serial_number: Annotated[str, Form()], product_details: Annotated[str, Form()], step: Annotated[int,Form()],
                                 files: List[UploadFile], db: Session, token: str):
    account_id = int(util.decode_token(token))
    db_sell = LaptopSellInfo(device_name=device_name, serial_number=serial_number,
                             product_details=product_details, step=step,
                             account_id=account_id)
    db.add(db_sell)
    db.commit()

    # 슈퍼키가 유일성 만족하는 것 (후보키로 쓰는거죠 - PK 값을 대신할 수 있는) / 급한대로 device_name과 serial_number로 설정
    # 추후 refactoring 할 때 더 고민해보기
    sell_id = db.query(LaptopSellInfo.laptop_sell_info_id).filter(LaptopSellInfo.device_name == device_name,
                                              LaptopSellInfo.serial_number == serial_number).first()[0]

    s3 = s3_connection()
    # 처음에 등록하고
    # 이미지 값 차곡차곡 쌓아서 넣어주기 (FK)
    location = 'ap-northeast-2'
    bucket_name = 'notebookproject-s3'

    try:
        for i in files:
            file_data = await i.read()
            s3_file_name = i.filename
            file_obj = BytesIO(file_data)
            s3.upload_fileobj(file_obj, bucket_name, s3_file_name)

            url = f"https://{bucket_name}.s3.{location}.amazonaws.com/{s3_file_name}"
            db_image = LaptopSellImage(path=url, laptop_sell_info_id=sell_id)
            db.add(db_image)
            db.commit()
        try:
            serving_datas = await image_serving(files=files)
            return {"sell_id": sell_id,
                    "front_image": f"https://{bucket_name}.s3.{location}.amazonaws.com/{files[1].filename}",
                    "serving_datas": serving_datas}

        except Exception as e:
            print(e)

    except Exception as e:
        print(e)


# laptop_id로 get 요청
def latop_sell_info_get(sell_info_id: str, db: Session):
    return db.query(LaptopSellInfo).filter(LaptopSellInfo.laptop_sell_info_id == sell_info_id).first()