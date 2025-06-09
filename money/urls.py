from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('',views.money_graph, name = "money_graph"),
]