import sys
import os
import grpc

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "generated"))

import pedido_pb2
import pedido_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:50051')
    stub = pedido_pb2_grpc.GerenciadorPedidosStub(channel)

    descricao = input("Digite o novo pedido: ")
    resposta = stub.RegistrarPedido(pedido_pb2.Pedido(descricao=descricao))
    print("Resposta do servidor:", resposta.status)

if __name__ == "__main__":
    run()
