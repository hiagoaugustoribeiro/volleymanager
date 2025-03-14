from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Jogador
from .serializers import JogadorSerializer

class JogadorViewSet(viewsets.ModelViewSet):
    queryset = Jogador.objects.all()
    serializer_class = JogadorSerializer

@api_view(['POST'])
def add_jogador(request):
    serializer = JogadorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"mensagem": "Jogador cadastrado com sucesso!"})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def listar_jogadores(request):
    jogadores = Jogador.objects.all()
    serializer = JogadorSerializer(jogadores, many=True)
    return Response(serializer.data)
