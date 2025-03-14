from django.db import models

class Jogador(models.Model):
    nome = models.CharField(max_length=100)
    idade = models.IntegerField()
    posicao = models.CharField(max_length=50)
    contato = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='ativo')
