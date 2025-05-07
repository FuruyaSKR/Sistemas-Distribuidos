# cliente_coap.py
import asyncio
from aiocoap import *

async def main():
    context = await Context.create_client_context()

    num1 = 10
    num2 = 25
    payload = f"{num1},{num2}".encode('utf-8')

    request = Message(code=POST, uri='coap://localhost/soma', payload=payload)

    response = await context.request(request).response
    print('Resposta do servidor:', response.payload.decode('utf-8'))

if __name__ == "__main__":
    asyncio.run(main())
