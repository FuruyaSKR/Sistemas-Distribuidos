import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "generated"))

from concurrent import futures
import grpc
import mensagem_pb2
import mensagem_pb2_grpc

fila_pedidos = []

class SistemaPedidosServicer(mensagem_pb2_grpc.SistemaPedidosServicer):
    def EnviarPedido(self, request, context):
        fila_pedidos.append(request.descricao)
        return mensagem_pb2.Confirmacao(status="Pedido recebido com sucesso")

    def ReceberPedido(self, request, context):
        if fila_pedidos:
            return mensagem_pb2.Pedido(descricao=fila_pedidos.pop(0))
        return mensagem_pb2.Pedido(descricao="Nenhum pedido disponível")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    mensagem_pb2_grpc.add_SistemaPedidosServicer_to_server(SistemaPedidosServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
