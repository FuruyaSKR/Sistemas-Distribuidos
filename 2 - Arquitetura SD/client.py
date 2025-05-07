import pika

# Estabelece uma conexão com o servidor RabbitMQ local
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))

# Cria um canal de comunicação dentro da conexão
channel = connection.channel()

# Garante que a fila 'fila_exemplo' exista. Se ela já existir, o comando apenas assegura sua existência
channel.queue_declare(queue='fila_exemplo')

# Envia uma mensagem para a fila 'fila_exemplo'
# O parâmetro exchange='' indica que estamos usando o exchange padrão
# routing_key define o nome da fila que vai receber a mensagem
channel.basic_publish(exchange='', routing_key='fila_exemplo', body='Olá do PC!')
print("📤 Mensagem publicada!")

# Fecha a conexão com o servidor RabbitMQ
connection.close()

