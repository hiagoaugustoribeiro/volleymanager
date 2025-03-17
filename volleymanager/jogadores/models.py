from django.db import models # Importa os modelos do Django para criar tabelas no banco de dados

# Modelo para armazenar informações dos jogadores
class Jogador(models.Model):
    nome = models.CharField(max_length=100) # Nome do jogador (texto até 100 caracteres)
    idade = models.IntegerField() # Idade do jogador
    posicao = models.CharField(max_length=50) # Posição que o jogador atua no time
    contato = models.CharField(max_length=100) # Informação de contato do jogado
    status = models.CharField(max_length=20, default='ativo') # Indica se o jogador está ativo ou inativo

# Modelo para controlar os pagamentos das mensalidades dos jogadores
class Mensalidade(models.Model):
    jogador = models.ForeignKey('Jogador', on_delete=models.CASCADE)  # Relacionamento com jogador
    data_pagamento = models.DateField(auto_now_add=True) # Registra automaticamente a data do pagamento
    valor = models.DecimalField(max_digits=6, decimal_places=2) # Valor da mensalidade
    status = models.CharField(
        max_length=10,
        choices=[('pago', 'Pago'), ('pendente', 'Pendente')], # Opções para status do pagamento
        default='pendente' # O padrão é "pendente"
    )

    def __str__(self): # Retorna uma string amigável ao visualizar um registro
        return f"{self.jogador.nome} - {self.status}" # Exibe o nome do jogador e status do pagamento

