import redis
from decouple import config

def redis_config():
    try:
        REDIS_HOST = str = config('REDIS_HOST')
        REDIS_PORT = integer = int(config('REDIS_PORT'))
        REDIS_DATABASE = integer = int(config('REDIS_DATABASE'))
        rd = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)
        return rd

    except:
        print("redis connection failure")