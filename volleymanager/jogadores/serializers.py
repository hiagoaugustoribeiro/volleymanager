from rest_framework import serializers
from .models import Jogador # Importa o modelo de Jogador
from .models import Mensalidade # Importa o modelo de Mensalidade

# Serializer para converter dados do modelo Jogador para JSON
class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador # Define o modelo que será serializado
        fields = '__all__' # Inclui todos os campos do modelo na API

        
# Serializer para converter dados do modelo Mensalidade para JSON
class MensalidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensalidade # Define o modelo que será serializado
        fields = '__all__' # Inclui todos os campos do modelo na API
