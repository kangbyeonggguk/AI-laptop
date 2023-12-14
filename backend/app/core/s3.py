import boto3


def s3_connection():
    try:
        client_s3 = boto3.client(
            's3',
            aws_access_key_id="AKIAYR3S3YY352DFTTCE",
            aws_secret_access_key="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",
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return client_s3


