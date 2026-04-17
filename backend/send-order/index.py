import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку на пирог и отправляет письмо на почту владельца."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—")
    phone = body.get("phone", "—")
    pie = body.get("pie", "—")
    address = body.get("address", "—")
    time = body.get("time", "—")

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender_email = "O.kerenceva@bk.ru"
    recipient_email = "O.kerenceva@bk.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новый заказ: {pie}"
    msg["From"] = sender_email
    msg["To"] = recipient_email

    html = f"""
    <html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ff4d00; border-bottom: 2px solid #ff4d00; padding-bottom: 10px;">Новый заказ пирога 🥧</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px; font-weight: bold; width: 40%;">Имя:</td><td style="padding: 10px;">{name}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Телефон:</td><td style="padding: 10px;"><a href="tel:{phone}">{phone}</a></td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Пирог:</td><td style="padding: 10px; color: #ff4d00; font-weight: bold;">{pie}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Адрес доставки:</td><td style="padding: 10px;">{address}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Время доставки:</td><td style="padding: 10px;">{time}</td></tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(sender_email, smtp_password)
        server.sendmail(sender_email, recipient_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
