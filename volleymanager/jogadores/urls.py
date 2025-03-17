from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JogadorViewSet, MensalidadeViewSet
from .views import add_jogador, listar_jogadores

router = DefaultRouter()
router.register(r'jogadores', JogadorViewSet)
router.register(r'mensalidades', MensalidadeViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Inclui as rotas do ViewSet automaticamente
    path('jogadores/', listar_jogadores),
    path('jogadores/adicionar/', add_jogador),
]
