from dataclasses import asdict
from db import database
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import account_router, laptop_router,laptop_info_list, laptop_sell_router
from core.config import conf
from routers import laptop_info_list

app = FastAPI()


def create_app():
    c = conf()
    app = FastAPI()
    conf_dict = asdict(c)
    database.db.init_app(app, **conf_dict)
    app.include_router(account_router.router)
    app.include_router(laptop_router.router)
    app.include_router(laptop_info_list.router)
    app.include_router(laptop_sell_router.router)

    # CORS 미들웨어 추가
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["total_count"],
    )

    return app


app = create_app()
