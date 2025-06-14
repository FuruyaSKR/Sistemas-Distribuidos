import sys
import os
from concurrent import futures
import grpc

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "generated"))

import pedido_pb2
import pedido_pb2_grpc

fila_pedidos = []

class GerenciadorPedidosServicer(pedido_pb2_grpc.GerenciadorPedidosServicer):
    """Serviço gRPC responsável pelo gerenciamento de pedidos."""

    def RegistrarPedido(self, request, context):
        """Registra um novo pedido na fila."""
        fila_pedidos.append(request.descricao)
        return pedido_pb2.Confirmacao(status="Pedido registrado com sucesso.")

    def ObterProximoPedido(self, request, context):
        """Fornece o próximo pedido disponível na fila."""
        if fila_pedidos:
            return pedido_pb2.Pedido(descricao=fila_pedidos.pop(0))
        return pedido_pb2.Pedido(descricao="Nenhum pedido disponível.")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pedido_pb2_grpc.add_GerenciadorPedidosServicer_to_server(GerenciadorPedidosServicer(), server)
    server.add_insecure_port('[::]:50051')
    print("Servidor gRPC iniciado na porta 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
