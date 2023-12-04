from typing import List
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from crud import laptop_info_list as crud
from schemas import laptop_info_list as schemas
import logging
from db.database import db

router = APIRouter()
logger = logging.getLogger(__name__)


# ex) http://localhost:8000/purchase/goods/desc?page=1&rating=s
@router.get("/purchase/goods/desc", response_model=List[schemas.Laptop])
def read_laptops(
    page: int = 1,
    rating: str = None,
    db: Session = Depends(db.session),
    response: Response = None,
):
    try:
        laptops, total_count = crud.get_laptops_desc(db, page=page, rating=rating)
        if laptops is None or len(laptops) == 0:
            raise ValueError

        response.headers["total_count"] = str(total_count)

        return laptops
    except ValueError:
        raise HTTPException(status_code=404, detail="Laptops not found")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


# ex) http://localhost:8000/purchase/goods/asc?page=1&rating=s
@router.get("/purchase/goods/asc", response_model=List[schemas.Laptop])
def read_laptops(
    page: int = 1,
    rating: str = None,
    db: Session = Depends(db.session),
    response: Response = None,
):
    try:
        laptops, total_count = crud.get_laptops_asc(db, page=page, rating=rating)
        if laptops is None or len(laptops) == 0:
            raise ValueError

        response.headers["total_count"] = str(total_count)

        return laptops
    except ValueError:
        raise HTTPException(status_code=404, detail="Laptops not found")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
