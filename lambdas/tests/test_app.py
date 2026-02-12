# lambda/tests/test_app.py
import json
from types import SimpleNamespace

from app import handler


def fake_context():
    """
    Minimal Lambda context mock.
    Only include fields you actually use.
    """
    return SimpleNamespace(
        aws_request_id="test-request-id",
        function_name="test-function",
    )


def test_handler_returns_200_and_payload():
    event = {
        "hello": "world",
        "count": 3
    }

    response = handler(event, fake_context())

    assert response["statusCode"] == 200
    assert response["headers"]["Content-Type"] == "application/json"

    body = json.loads(response["body"])
    assert body["message"] == "Payload received"
    assert body["input"] == event


def test_handler_handles_empty_event():
    event = {}

    response = handler(event, fake_context())

    assert response["statusCode"] == 200
    body = json.loads(response["body"])
    assert body["input"] == {}
