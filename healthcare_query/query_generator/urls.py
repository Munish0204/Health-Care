# query_generator/urls.py
from django.urls import path
from .views import GenerateVoiceQuery, generate_symptom_based_query, search_view,PatientListView, PatientDetailView

urlpatterns = [
    path('generate-voice-query/', GenerateVoiceQuery.as_view(), name='generate-voice-query'),
    path('generate-symptom-query/', generate_symptom_based_query, name='generate-symptom-query'),
    path('search/', search_view, name='search_view'),
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('patients/<str:patient_id>/', PatientDetailView.as_view(), name='patient-detail'),

]
