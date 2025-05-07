import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "generated"))

import grpc
import mensagem_pb2
import mensagem_pb2_grpc


def run():
    channel = grpc.insecure_channel('localhost:50051')
    stub = mensagem_pb2_grpc.SistemaPedidosStub(channel)
    descricao = input("Digite o pedido a ser enviado: ")
    confirmacao = stub.EnviarPedido(mensagem_pb2.Pedido(descricao=descricao))
    print(confirmacao.status)

if __name__ == "__main__":
    run()
