import os
from azure.communication.sms import SmsClient

try:
    # Create the SmsClient object that you use to send SMS messages.
    sms_client = SmsClient.from_connection_string(
        "endpoint=https://helpcenter.communication.azure.com/;accesskey=Psq8R4YKV7nOSu2wfdR3qIsHh+FAxZBrQOftZ5p/voaMOPblV9nFk0La6OcU/56CxQNIHmE4hE1ZikC3ycGjjQ=="
    )
    # Call send() with SMS values.
    sms_responses = sms_client.send(
        from_="+17865506825",
        to="+8801759130649",
        message="Hello World via SMS",
        enable_delivery_report=True,  # optional property
        tag="custom-tag",
    )  # optional property

except Exception as ex:
    print("Exception:")
    print(ex)
