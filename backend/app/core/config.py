from dataclasses import dataclass
from os import path, environ

base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))


@dataclass
class Config:
    """
    기본 Configuration
    """
    BASE_DIR = base_dir

    DB_POOL_RECYCLE: int = 900
    DB_ECHO: bool = True


@dataclass
class LocalConfig(Config):
    DB_URL: str = "mysql+pymysql://root:191212@127.0.0.1:3306/refurlab?charset=utf8mb4"
    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["*"]


@dataclass
class ProdConfig(Config):
    DB_URL: str = "mysql+pymysql://admin:574152657@database-1.c52gjp0zbb7f.ap-northeast-2.rds.amazonaws.com:3306/mydb?charset=utf8mb4"
    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["*"]


def conf():
    """
    환경 불러오기
    :return:
    """
    config = dict(prod=ProdConfig(), local=LocalConfig())
    return config.get(environ.get("API_ENV", "prod"))
