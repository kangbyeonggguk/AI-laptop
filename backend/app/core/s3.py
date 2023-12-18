import boto3
from decouple import config


def s3_connection():
    try:
        client_s3 = boto3.client(
            's3',
            aws_access_key_id=config('aws_access_key_id'),
            aws_secret_access_key=config('aws_secret_access_key'),
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return client_s3


