from datetime import timedelta, datetime
from typing import Union
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import ExpiredSignatureError
from starlette import status

from crud.oauth_client import OAuthClient
from fastapi import Depends, FastAPI, Header, Query, Request, HTTPException
from decouple import config

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')


# make access token
def encode_token(account: Union[str, int], expire: timedelta):
    if account:
        data = {
            'sub': str(account),
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + expire
        }

        token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return token


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        return payload["sub"]
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")


def create_access_token(account):  # access_token 유효 기간 -> 1시간
    if account:
        sub = account
        return encode_token(sub, timedelta(hours=1))


def create_refresh_token(account):  # refresh_token 유효 기간 -> 1주일
    if account:
        sub = f"{account}.refurlab"
        return encode_token(sub, timedelta(weeks=1))



naver_client = OAuthClient(
    client_id=config('naver_client_id'),
    client_secret_id=config('naver_client_secret_id'),
    redirect_uri=config('naver_redirect_uri'),
    authentication_uri=config('naver_authentication_uri'),
    resource_uri=config('naver_resource_uri'),
    verify_uri=config('naver_verify_uri'),
)

kakao_client = OAuthClient(
    client_id=config('kakao_client_id'),
    client_secret_id=config('kakao_client_secret_id'),
    redirect_uri=config('kakao_redirect_uri'),
    authentication_uri=config('kakao_authentication_uri'),
    resource_uri=config('kakao_resource_uri'),
    verify_uri=config('kakao_verify_uri'),
)


def get_oauth_client(provider: str = Query(..., regex="naver|kakao")):
    if provider == "naver":
        return naver_client
    if provider == "kakao":
        return kakao_client


def get_authorization_token(authorization: str = Header(...)) -> str:
    scheme, _, param = authorization.partition(" ")
    if not authorization or scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return param


async def login_required(
    oauth_client: OAuthClient = Depends(get_oauth_client),
    access_token: str = Depends(get_authorization_token),
):
    if not await oauth_client.is_authenticated(access_token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)