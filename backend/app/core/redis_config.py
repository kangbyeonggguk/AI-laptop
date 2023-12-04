import redis


def redis_config():
    try:
        REDIS_HOST = str = "localhost"
        REDIS_PORT = integer = 6379
        REDIS_DATABASE = integer = 0
        rd = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)
        return rd

    except:
        print("redis connection failure")