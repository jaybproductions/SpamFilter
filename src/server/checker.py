import requests

test = requests.get("http://localhost:80/contactforms/email")

print(test.json())
