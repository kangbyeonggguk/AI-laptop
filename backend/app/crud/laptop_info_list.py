from fastapi import HTTPException,Form,UploadFile
from sqlalchemy.orm import Session, joinedload
from models import laptop_info_list as models
from schemas import laptop_info_list as schemas
from schemas import laptop_schema 
from sqlalchemy import update
from typing import Annotated,List
from core.s3 import s3_connection
from io import BytesIO





def get_laptops_desc(db: Session, page: int = 1, rating=None):
    page_size = 6
    skip = (page - 1) * page_size

    query = db.query(models.Laptop2).options(joinedload(models.Laptop2.laptop_info_list).joinedload(models.Laptop.laptop_info_list_image))

    if rating is not None:
        query = query.filter(models.Laptop2.rank == rating)

    data_count = query.count()
   
    results = query.order_by(models.Laptop2.price.desc()).offset(skip).limit(page_size).all()
    for result in results:
        result.laptop_info_list.laptop_info_list_image = sorted(result.laptop_info_list.laptop_info_list_image, key=lambda x: x.laptop_info_image_id
    )

    return (
        results,
        data_count,
    )

def get_laptops_asc(db: Session, page: int = 1, rating=str):
    page_size = 6
    skip = (page - 1) * page_size
    data_count = db.query(models.Laptop2.laptop_info_list_id).count()
    query = db.query(models.Laptop2).options(joinedload(models.Laptop2.laptop_info_list).joinedload(models.Laptop.laptop_info_list_image))
  
    if rating is not None:
        query = query.filter(models.Laptop2.rank == rating)

    data_count = query.count()
    results = query.order_by(models.Laptop2.price.asc()).offset(skip).limit(page_size).all()
    for result in results:
        result.laptop_info_list.laptop_info_list_image = sorted(result.laptop_info_list.laptop_info_list_image, key=lambda x: x.laptop_info_image_id
    )
    return (
        results,
        data_count,
    )

def get_laptops_info(db: Session, page: int = 1, name=str):
    page_size = 7
    skip = (page - 1) * page_size
    query=db.query(models.Laptop).options(joinedload(models.Laptop.laptop_info_list_image))

    if name is not None:
        query=query.filter(models.Laptop.device_name.like(f"%{name}%"))
    total_count=query.count()
    results=query.order_by(models.Laptop.create_date.desc()).offset(skip).limit(page_size).all()
    for result in results:
        result.laptop_info_list_image = sorted(result.laptop_info_list_image, key=lambda x: x.laptop_info_image_id)

    return results, total_count

def patch_laptops_info(db: Session, info=schemas.PatchLaptopinfo):
    db.execute(
        update(models.Laptop).where(models.Laptop.laptop_info_list_id==info.info_id).values(device_name=info.device_name,screen_size=info.screen_size,business_usage=info.business_usage,internet_lecture_usage=info.internet_lecture_usage,gaming_usage=info.gaming_usage,purchase_limit=info.purchase_limit,delivery_fee=info.delivery_fee,manufacturing_company=info.manufacturing_company,brand=info.brand)
    )
    db.commit()

async def create_laptops_info(db: Session, device_name: Annotated[str, Form()],screen_size: Annotated[str, Form()],business_usage: Annotated[str, Form()],internet_lecture_usage: Annotated[str, Form()],gaming_usage: Annotated[str, Form()],purchase_limit: Annotated[str, Form()],delivery_fee: Annotated[str, Form()],manufacturing_company: Annotated[str, Form()],brand: Annotated[str, Form()],files: List[UploadFile]):
    db_info=models.Laptop(device_name=device_name,screen_size=screen_size,business_usage=business_usage,internet_lecture_usage=internet_lecture_usage,gaming_usage=gaming_usage,purchase_limit=purchase_limit,delivery_fee=delivery_fee,manufacturing_company=manufacturing_company,brand=brand)    
    db.add(db_info)
    db.commit()
    info_id=db_info.laptop_info_list_id
    
    s3 = s3_connection()
    location = 'ap-northeast-2'
    bucket_name = 'notebookproject-s3'

    try:
        for i in files:
            file_data = await i.read()
            s3_file_name = i.filename
            file_obj = BytesIO(file_data)
            s3.upload_fileobj(file_obj, bucket_name, s3_file_name)
            info_id=db_info.laptop_info_list_id
            url= f"https://{bucket_name}.s3.{location}.amazonaws.com/{s3_file_name}"
            db_image=models.Image(laptop_info_list_id=info_id,path=url)
            db.add(db_image)
            db.commit()
    except Exception as e:
        print(e)     

def delete_laptops_info(info_id:str,db:Session):
    laptop = (
        db.query(models.Laptop)
        .filter(models.Laptop.laptop_info_list_id == info_id)
        .first()
    )
    if laptop:
        image_paths = [image.path for image in laptop.laptop_info_list_image]
        s3 = s3_connection()

        bucket_name = 'notebookproject-s3'
        for i in image_paths:
            file_name = i.split("/")[-1]
            s3.delete_object(Bucket=bucket_name,Key=file_name)
    
     # laptop_info_list_id가 info_id와 일치하는 Image 데이터 삭제
    db.query(models.Image).filter(models.Image.laptop_info_list_id == info_id).delete()

    # laptop_info_list_id가 info_id와 일치하는 Laptop 데이터 삭제
    db.query(models.Laptop).filter(models.Laptop.laptop_info_list_id == info_id).delete()
   
    db.commit()

def get_laptop_list(db: Session, page: int = 1, name=str):
    query=db.query(models.Laptop2).options(joinedload(models.Laptop2.laptop_info_list).joinedload(models.Laptop.laptop_info_list_image))
    page_size = 7
    skip = (page - 1) * page_size
    if name is not None:
        info_id = (
            db.query(models.Laptop.laptop_info_list_id)
            .filter(models.Laptop.device_name.like(f"%{name}%"))
            .subquery()
        )
        query=query.filter(models.Laptop2.laptop_info_list_id.in_(info_id))
    query2 = db.query(models.Laptop.laptop_info_list_id, models.Laptop.device_name, models.Laptop.screen_size)
    result = query2.all()
    
    # 결과를 명시적인 형식으로 변환
    laptop_info_list = [(row.laptop_info_list_id, row.device_name, row.screen_size) for row in result]
    total_count=query.count()
   
    return query.order_by(models.Laptop2.create_date.desc()).offset(skip).limit(page_size).all(),total_count,laptop_info_list
   
def patch_laptop_list(db: Session, info:laptop_schema.PatchLaptop):
    db.execute(
        update(models.Laptop2).where(models.Laptop2.laptop_id==info.laptop_id).values(title=info.title,hashtag=info.hashtag,price=info.price,price_time_sale=info.price_time_sale,os=info.os,hardware=info.hardware,rank=info.rank,laptop_info_list_id=info.laptop_info_list_id)
    )
    db.commit()

def delete_laptop_list(laptop_id:str,db=Session):
    
    db.query(models.Laptop2).filter(models.Laptop2.laptop_id == laptop_id).delete()
   
    db.commit()

def create_laptop_list(info:laptop_schema.CreateLaptop,db=Session):
    db_info=models.Laptop2(title=info.title,hashtag=info.hashtag,price=info.price,price_time_sale=info.price_time_sale,os=info.os,hardware=info.hardware,rank=info.rank,laptop_info_list_id=info.laptop_info_list_id)    
    db.add(db_info)
    db.commit()