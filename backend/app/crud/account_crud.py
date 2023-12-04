from passlib.context import CryptContext
from sqlalchemy import update
from datetime import datetime
from sqlalchemy.orm import Session
from schemas.account_schema import AccountCreate, AccountUpdate
from models.account_model import Account
from core import util
import pytz


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_account(db: Session, account: AccountCreate):
    db_account = Account(id=account.id, platform_type=account.platform_type,
                         admin=account.admin, password=get_password_hash(account.password), nickname=account.nickname,
                         email=account.email, phonenumber=account.phonenumber)

    db.add(db_account)
    db.commit()


def get_account(db: Session, id: str):
    return db.query(Account).filter(Account.id == id).first()


def update_account(db: Session, token: str, account: AccountUpdate):
    decode_token_id = int(util.decode_token(token))
    db.execute(
        update(Account).where(Account.account_id == decode_token_id).values(password=get_password_hash(account.password), nickname=account.nickname,
                                                                            email=account.email, phonenumber=account.phonenumber,
                                                               update_date=datetime.now(pytz.timezone("Asia/Seoul")))
    )
    db.commit()


def get_account_info(db: Session, token: str):
    token_id = int(util.decode_token(token))
    return db.query(Account).filter(Account.account_id == token_id).first()


