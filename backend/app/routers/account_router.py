import secrets

from fastapi import APIRouter, Header
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from starlette import status
from fastapi.security import OAuth2PasswordRequestForm
from core import util
from core.redis_config import redis_config
import httpx


from db.database import db
from crud import account_crud
from schemas import account_schema

router = APIRouter(
)


@router.post("/accounts", status_code=status.HTTP_200_OK)
async def account_create(_account: account_schema.AccountCreate, session: Session = Depends(db.session)):
    account_crud.create_account(db=session, account=_account)


@router.post("/accounts/login", response_model=account_schema.Token, status_code=status.HTTP_200_OK)
async def account_login(form_data: OAuth2PasswordRequestForm = Depends(),
                        session: Session = Depends(db.session)):
    account = account_crud.get_account(session, form_data.username)

    if not account or not account_crud.pwd_context.verify(form_data.password, account.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect id or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    rd = redis_config()
    two_weeks = 1209600
    refresh_token = util.create_refresh_token(account.account_id)
    rd.setex(refresh_token, two_weeks, account.account_id)

    return {"access_token": util.create_access_token(account.account_id),
            "refresh_token": refresh_token}


@router.post("/accounts/refresh-token", status_code=status.HTTP_200_OK)
async def account_refresh_token_check(refresh_token_key: str):
    rd = redis_config()
    check = rd.get(refresh_token_key)

    if check is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    return {"access_token": util.create_access_token(int(check))}


@router.post("/accounts/logout", status_code=status.HTTP_200_OK)
async def account_logout(refresh_token_key: str):
    rd = redis_config()
    rd.delete(refresh_token_key)



@router.get("/accounts/login/{sns}",status_code=status.HTTP_200_OK)
async def account_sns_login(sns: str,oauth_client=Depends(util.get_oauth_client),form_data:str=None,session: Session = Depends(db.session) ):
   
    if form_data is None:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect oathcode",
            headers={"WWW-Authenticate": "Bearer"}
        )
    else:
        oauthcode=form_data.oauthcode
        #redirect_uri = oauth_client(sns).redirect_uri
        # 카카오로부터 받은 코드를 사용하여 액세스 토큰 요청
        token_url = "https://kauth.kakao.com/oauth/token"
        data = {
            "grant_type": "authorization_code",
            "client_id": oauth_client(sns).client_id,  # 여기에 카카오 디벨로퍼스에서 발급받은 클라이언트 ID를 입력
            #"client_secret": oauth_client(sns).client_secret_id,  # 여기에 카카오 디벨로퍼스에서 발급받은 클라이언트 시크릿을 입력
            "redirect_uri": oauth_client(sns).redirect_uri,  # 여기에 카카오 디벨로퍼스에서 설정한 리다이렉트 URI를 입력
            "code": oauthcode,
        }
        platform_type
        if sns=="kakao":
            platform_type="K"
        else:
            platform_type="N"
        try:
            async with httpx.AsyncClient() as client:#카카오 토큰 요청
                response = await client.post(token_url, data=data)
                response_data = response.json()

            #토큰을 받게 될 시 유저 정보 가져오기    
            user_url = "https://kapi.kakao.com/v2/user/me"
            headers = {"Authorization": f"Bearer {response_data['access_token']}"}
            async with httpx.AsyncClient() as client:
                user_response = await client.get(user_url, headers=headers)
                user_data = user_response.json()

            #유저 정보가 없다면 저장
            check = account_crud.get_account(session, user_data.id)
            if not check:
                account_crud.create_account(db=session, account={"id":user_data.id,"platform_type":platform_type,"admin":0,"password":"kakao","nickname":user_data.kakao_account.name,"email":user_data.kakao_account.email,"phonenumber":user_data.kakao_acoount.phone_number})
                

            #리프레시 토큰과 액세스 토큰 발급 및 리턴
            rd = redis_config()
            two_weeks = 1209600
            refresh_token = util.create_refresh_token(user_data.id)
            rd.setex(refresh_token, two_weeks, user_data.id)

            return {"access_token": util.create_access_token(user_data.id),
            "refresh_token": refresh_token}
        
        except httpx.HTTPError as http_error:
            # HTTP 요청이 실패한 경우에 대한 처리
            return {"error": str(http_error)}


@router.get("/callback")
async def callback(
        code: str, state: Optional[str] = None, oauth_client=Depends(util.get_oauth_client)
):
    token_response = await oauth_client.get_tokens(code, state)
    return {"response": token_response}


@router.get("/refresh")
async def callback(
        oauth_client=Depends(util.get_oauth_client),
        refresh_token: str = Depends(util.get_authorization_token)
):
    token_response = await oauth_client.refresh_access_token(
        refresh_token=refresh_token)

    return {"response": token_response}


@router.get("/sns_account", dependencies=[Depends(util.login_required)])
async def get_sns_account(
        oauth_client=Depends(util.get_oauth_client()),
        access_token: str = Depends(util.get_authorization_token),
):
    user_info = await oauth_client.get_user_info(access_token=access_token)
    return {"account": user_info}


@router.get("/accounts/duplicate", status_code=status.HTTP_200_OK)
async def account_id_check(id: str, session: Session = Depends(db.session)):
    check = account_crud.get_account(session, id)

    if check:
        raise HTTPException(status_code=400)


@router.patch("/accounts", status_code=status.HTTP_200_OK)
async def account_info_update(account: account_schema.AccountUpdate, session: Session = Depends(db.session), token: str = Header(None)):
    account_crud.update_account(db=session, token=token, account=account)


@router.get("/accounts", status_code=status.HTTP_200_OK)
async def account_info_get(session: Session = Depends(db.session), token: str = Header(None)):
    result = account_crud.get_account_info(db=session, token=token)
    print(result)

    if result:
        account_info = {
            "id": result.id,
            "nickname": result.nickname,
            "email": result.email,
            "phonenumber": result.phonenumber
         }
        return {"response": account_info}
