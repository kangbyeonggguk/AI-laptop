from datetime import timedelta, datetime
from typing import Union
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import ExpiredSignatureError
from starlette import status

from crud.oauth_client import OAuthClient
from fastapi import Depends, FastAPI, Header, Query, Request, HTTPException

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "a3f01a785683f03aa5fb82371b8be33e01630a66db8e6e1170693e7f468c59de"
ALGORITHM = "HS256"


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
    client_id="your_client_id",
    client_secret_id="your_client_secret_id",
    redirect_uri="your_callback_uri",
    authentication_uri="https://nid.naver.com/oauth2.0",
    resource_uri="https://openapi.naver.com/v1/nid/me",
    verify_uri="https://openapi.naver.com/v1/nid/verify",
)

kakao_client = OAuthClient(
    client_id="your_client_id",
    client_secret_id="your_client_secret_id",
    redirect_uri="your_callback_uri",
    authentication_uri="https://kauth.kakao.com/oauth",
    resource_uri="https://kapi.kakao.com/v2/user/me",
    verify_uri="https://kapi.kakao.com/v1/user/access_token_info",
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