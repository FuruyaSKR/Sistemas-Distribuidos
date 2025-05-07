import threading
import queue
import time
import random

class Process(threading.Thread):
    def __init__(self, pid, message_queues):
        super().__init__()
        self.pid = pid
        self.clock = 0
        self.message_queues = message_queues
        self.queue = message_queues[pid]
        self.running = True

    def send_message(self, target_pid):
        self.clock += 1
        msg = (self.pid, self.clock)
        self.message_queues[target_pid].put(msg)
        print(f"Processo {self.pid} enviou mensagem para {target_pid} com clock {self.clock}")

    def receive_message(self):
        try:
            sender_pid, sender_clock = self.queue.get(timeout=1)
            self.clock = max(self.clock, sender_clock) + 1
            print(f"Processo {self.pid} recebeu mensagem de {sender_pid} com clock {sender_clock}, atualizou clock para {self.clock}")
        except queue.Empty:
            pass

    def internal_event(self):
        self.clock += 1
        print(f"Processo {self.pid} executou evento interno com clock {self.clock}")

    def run(self):
        for _ in range(5):
            action = random.choice(['send', 'receive', 'internal'])
            if action == 'send':
                target = random.choice([pid for pid in self.message_queues if pid != self.pid])
                self.send_message(target)
            elif action == 'receive':
                self.receive_message()
            else:
                self.internal_event()
            time.sleep(random.uniform(0.5, 1.5))  

        self.running = False
        print(f"Processo {self.pid} finalizado com clock {self.clock}")

if __name__ == "__main__":
    message_queues = {
        0: queue.Queue(),
        1: queue.Queue(),
        2: queue.Queue()
    }

    processes = [Process(pid, message_queues) for pid in message_queues]
    for p in processes:
        p.start()

    for p in processes:
        p.join()

    print("Simulação de relógios lógicos de Lamport finalizada.")
