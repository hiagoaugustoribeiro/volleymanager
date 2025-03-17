from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Jogador, Mensalidade # Importa os modelos do banco de dados
from .serializers import JogadorSerializer, MensalidadeSerializer # Importa os serializers
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

# ViewSet para Jogadores - Ele já cria automaticamente as operações CRUD
class JogadorViewSet(viewsets.ModelViewSet):
    queryset = Jogador.objects.all() # Retorna todos os jogadores cadastrados
    serializer_class = JogadorSerializer # Converte os dados do modelo para JSON


# ViewSet para Mensalidades - Gerencia os pagamentos dos jogadores
class MensalidadeViewSet(viewsets.ModelViewSet):
    queryset = Mensalidade.objects.all() # Retorna todas as mensalidades registradas
    serializer_class = MensalidadeSerializer # Converte os dados para JSON

    # Adiciona filtros para buscar mensalidades por jogador ou status (Pago/Pendente)
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['jogador', 'status']

# Endpoint para adicionar um jogador manualmente via POST
@api_view(['POST'])
def add_jogador(request):
    serializer = JogadorSerializer(data=request.data) # Converte JSON recebido para objeto Python
    if serializer.is_valid(): # Verifica se os dados são válidos
        serializer.save() # Salva no banco de dado
        return Response({"mensagem": "Jogador cadastrado com sucesso!"}) # Retorna uma resposta de sucesso
    return Response(serializer.errors, status=400) # Retorna erros se os dados forem inválidos

# Endpoint para listar todos os jogadores via GET
@api_view(['GET'])
def listar_jogadores(request):
    jogadores = Jogador.objects.all() # Busca todos os jogadores no banco de dados
    serializer = JogadorSerializer(jogadores, many=True) # Serializa os dados (transforma em JSON)
    return Response(serializer.data) # Retorna os jogadores cadastrados
