import pika

# Função de callback que será executada sempre que uma nova mensagem for recebida na fila
def callback(ch, method, properties, body):
    # Exibe o conteúdo da mensagem recebida no terminal
    print(f"📥 Mensagem recebida: {body.decode()}")

# Estabelece uma conexão com o servidor RabbitMQ local
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))

# Cria um canal de comunicação
channel = connection.channel()

# Garante que a fila 'fila_exemplo' exista; caso não exista, ela será criada
channel.queue_declare(queue='fila_exemplo')

# Configura o consumo de mensagens da fila 'fila_exemplo' com a função callback
# auto_ack=True faz o RabbitMQ marcar a mensagem como lida automaticamente
channel.basic_consume(queue='fila_exemplo', on_message_callback=callback, auto_ack=True)
print('⏳ Aguardando mensagens...')

# Inicia o loop de consumo. Esse comando mantém o programa em execução esperando mensagens
channel.start_consuming()
