from fastapi import APIRouter, Header, Depends
from starlette import status
from schemas import laptop_schema
from crud import laptop_crud
from db.database import db
from sqlalchemy.orm import Session

router = APIRouter(
)


@router.post("/laptops", status_code=status.HTTP_200_OK)
async def laptop_input(laptop: laptop_schema.LaptopInput, session: Session = Depends(db.session)):
    laptop_crud.laptop_input(db=session, laptop=laptop)