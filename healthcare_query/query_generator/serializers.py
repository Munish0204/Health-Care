# query_generator/serializers.py
from rest_framework import serializers

class QuerySerializer(serializers.Serializer):
    symptom = serializers.CharField(max_length=255)
    conditions = serializers.ListField(child=serializers.CharField(max_length=255))
    logical_operator = serializers.ChoiceField(choices=["AND", "OR", "NOT"])

class VoiceQuerySerializer(serializers.Serializer):
    voice_input = serializers.CharField()
from rest_framework import serializers
from .models import HealthRecord

class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = ['id', 'patient_id', 'diagnosis', 'symptoms']  # Include the fields you want to expose in the API

from rest_framework import serializers
from .models import Patient, MedicalRecord, ClinicalTrial, DrugInteraction, LabResult

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = '__all__'

class ClinicalTrialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalTrial
        fields = '__all__'

class DrugInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugInteraction
        fields = '__all__'

class LabResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabResult
        fields = '__all__'
