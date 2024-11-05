from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr

class EmailConfig:
    EMAIL_USERNAME = 'your_email@soy.sena.edu.co'
    EMAIL_PASSWORD = 'hola'
    EMAIL_FROM = 'your_email@soy.sena.edu.co'
    EMAIL_PORT = 587
    EMAIL_SERVER = 'smtp.office365.com'

conf = ConnectionConfig(
    MAIL_USERNAME=EmailConfig.EMAIL_USERNAME,
    MAIL_PASSWORD=EmailConfig.EMAIL_PASSWORD,
    MAIL_FROM=EmailConfig.EMAIL_FROM,
    MAIL_PORT=EmailConfig.EMAIL_PORT,
    MAIL_SERVER=EmailConfig.EMAIL_SERVER,
    MAIL_STARTTLS=True,  # Usa MAIL_STARTTLS en lugar de MAIL_TLS
    MAIL_SSL_TLS=False,  # Usa MAIL_SSL_TLS en lugar de MAIL_SSL
)

async def send_email(to_email: str, subject: str, body: str):
    message = MessageSchema(
        subject=subject,
        recipients=[EmailStr(to_email)],
        body=body,
        subtype="plain"
    )
    fm = FastMail(conf)
    await fm.send_message(message)
