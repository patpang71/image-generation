import json
import logging

# Set up structured logging (shows up in CloudWatch)
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    """
    Lambda entry point.

    :param event: The incoming request / event payload
    :param context: Lambda runtime information
    """
    # Log the raw event
    logger.info("Incoming event: %s", json.dumps(event))

    # Optional: log some context info
    logger.info(
        "RequestId=%s Function=%s",
        context.aws_request_id,
        context.function_name,
    )

    # Return a basic response (API Gateway friendly)
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "message": "Payload received",
            "input": event
        })
    }
