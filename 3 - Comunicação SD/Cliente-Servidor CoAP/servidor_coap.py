# servidor_coap.py
import asyncio
from aiocoap import *
from aiocoap.resource import Resource, Site

class SomaResource(Resource):
    async def render_post(self, request):
        try:
            payload = request.payload.decode('utf-8')
            num1, num2 = map(int, payload.split(','))
            resultado = num1 + num2
            resposta = f"Resultado da soma: {resultado}"
        except Exception as e:
            resposta = f"Erro: {str(e)}"

        return Message(payload=resposta.encode('utf-8'))

async def main():
    root = Site()
    root.add_resource(['soma'], SomaResource())

    await Context.create_server_context(root, bind=('localhost', 5683))

    print("Servidor CoAP aguardando requisições em coap://localhost:5683/soma...")
    await asyncio.get_running_loop().create_future()

if __name__ == "__main__":
    asyncio.run(main())
