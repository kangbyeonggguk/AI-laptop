from datetime import datetime

from pydantic import BaseModel, Field, field_validator, EmailStr


class AccountCreate(BaseModel):
    id: str
    platform_type: str
    admin: bool
    password: str = Field(title='비밀번호') #, pattern='^(?=(.*[A-Z]|[a-z]|\d|[!@#$%^&*()_+|{}[\]:;<>,.?~\\-]){2,}).{8,16}$')
    nickname: str
    email: EmailStr
    phonenumber: str = Field(title='휴대전화', pattern='^010-([0-9]{4})-([0-9]{4})$')
    create_date: datetime

    class Config:
        orm_mode: True

    @field_validator('id', 'password', 'nickname', 'email', 'phonenumber')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v


class Token(BaseModel):
    access_token: str
    refresh_token: str


class AccountUpdate(BaseModel):
    password: str
    nickname: str
    email: EmailStr
    phonenumber: str = Field(title='휴대전화', pattern='^010-([0-9]{4})-([0-9]{4})$')
    update_date: datetime