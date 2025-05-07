import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "generated"))

import grpc
import mensagem_pb2
import mensagem_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:50051')
    stub = mensagem_pb2_grpc.SistemaPedidosStub(channel)
    pedido = stub.ReceberPedido(mensagem_pb2.Solicitacao())
    print("Pedido recebido:", pedido.descricao)

if __name__ == "__main__":
    run()
