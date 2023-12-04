from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from models import laptop_info_list as models
from schemas import laptop_info_list as schemas


# def get_laptops_desc(db: Session, page: int = 1, rating=str):
#     page_size = 6
#     skip = (page - 1) * page_size
#     data_count = db.query(models.Laptop.laptop_info_list_id).count()
#     return (
#         db.query(models.Laptop)
#         .options(joinedload(models.Laptop.laptop_info_list_image))
#         .filter(models.Laptop.rank == rating)
#         .order_by((models.Laptop.price.desc()))
#         .offset(skip)
#         .limit(page_size)
#         .all(),
#         data_count
#     )

# def get_laptops_desc(db: Session, page: int = 1, rating=str):
#     page_size = 6
#     skip = (page - 1) * page_size
#     data_count = db.query(models.Laptop.laptop_info_list_id).count()
#     query = db.query(models.Laptop).options(joinedload(models.Laptop.laptop_info_list_image))
#
#     if rating is not None:
#         query = query.filter(models.Laptop.rank == rating)
#
#     return (
#         query.order_by(models.Laptop.price.desc())
#         .offset(skip)
#         .limit(page_size)
#         .all(),
#         data_count
#     )


def get_laptops_desc(db: Session, page: int = 1, rating=None):
    page_size = 6
    skip = (page - 1) * page_size

    query = db.query(models.Laptop).options(
        joinedload(models.Laptop.laptop_info_list_image)
    )

    if rating is not None:
        query = query.filter(models.Laptop.rank == rating)

    data_count = query.count()

    return (
        query.order_by(models.Laptop.price.desc()).offset(skip).limit(page_size).all(),
        data_count,
    )


# def get_laptops_asc(db: Session, page: int = 1, rating=str):
#     page_size = 6
#     skip = (page - 1) * page_size
#     data_count = db.query(models.Laptop.laptop_info_list_id).count()
#     return (
#         db.query(models.Laptop)
#         .options(joinedload(models.Laptop.laptop_info_list_image))
#         .filter(models.Laptop.rank == rating)
#         .order_by((models.Laptop.price.asc()))
#         .offset(skip)
#         .limit(page_size)
#         .all(),
#         data_count
#     )


def get_laptops_asc(db: Session, page: int = 1, rating=str):
    page_size = 6
    skip = (page - 1) * page_size
    data_count = db.query(models.Laptop.laptop_info_list_id).count()
    query = db.query(models.Laptop).options(
        joinedload(models.Laptop.laptop_info_list_image)
    )

    if rating is not None:
        query = query.filter(models.Laptop.rank == rating)

    data_count = query.count()

    return (
        query.order_by(models.Laptop.price.asc()).offset(skip).limit(page_size).all(),
        data_count,
    )
