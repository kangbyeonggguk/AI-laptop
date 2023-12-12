from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from db.database import db
from models import account_model as account_models
from models import  laptop_info_list as laptop_info_list_models
from crud import laptop_sell_crud

router = APIRouter(
)


@router.get("/admin/accounts", status_code=200)
def read_accounts(page: int = 1, name: str = None, db: Session = Depends(db.session)):
    page_size = 7
    skip = (page - 1) * page_size

    accounts_query = db.query(account_models.Account)

    if name is not None:
        accounts_query = accounts_query.filter(account_models.Account.nickname.like(f"%{name}%"))

    accounts = accounts_query.offset(skip).limit(page_size).all()
    data_count = accounts_query.count()


    if not accounts:
        raise HTTPException(status_code=404, detail="No admin accounts found")

    return {"accounts": accounts, "data_count": data_count}


@router.get("/admin/laptop_info_list", status_code=200)
def read_laptop_info_list(page: int = 1, name: str = None, db: Session = Depends(db.session)):
    

    list,data_count=laptop_sell_crud.get_laptop_sell_info_list(page=page,name=name,db=db,)


    if not list:
        raise HTTPException(status_code=404, detail="No admin info found")
    
    return {"list":list,"data_count":data_count}
    