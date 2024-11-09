from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import spacy

from .models import MedicalRecord, Patient
from .serializers import MedicalRecordSerializer, PatientSerializer
from .utils import generate_boolean_query

# Load the Spacy model once for all requests
nlp = spacy.load("en_core_web_sm")

def search_view(request):
    symptom = request.GET.get('symptom')
    conditions = request.GET.getlist('conditions')
    logical_operator = request.GET.get('operator', 'AND').upper()

    if not symptom or not conditions:
        return JsonResponse({'error': 'Symptom and conditions are required.'}, status=400)

    # Construct the query based on the logical operator
    base_query = Q(symptom__icontains=symptom)
    condition_queries = Q()
    if logical_operator == 'AND':
        for condition in conditions:
            condition_queries &= Q(symptom__icontains=condition)
    elif logical_operator == 'OR':
        for condition in conditions:
            condition_queries |= Q(symptom__icontains=condition)
    elif logical_operator == 'NOT':
        for condition in conditions:
            condition_queries &= ~Q(symptom__icontains=condition)
    else:
        return JsonResponse({'error': 'Invalid logical operator.'}, status=400)

    final_query = base_query & condition_queries
    records = MedicalRecord.objects.filter(final_query)

    serializer = MedicalRecordSerializer(records, many=True)
    return JsonResponse({'results': serializer.data}, status=200)

@csrf_exempt
def generate_symptom_based_query(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            symptom = data.get('symptom')
            conditions = data.get('conditions', [])
            logical_operator = data.get('logical_operator', 'AND').upper()

            if not symptom or not conditions:
                return JsonResponse({'error': 'Symptom and conditions are required.'}, status=400)

            query = f'"{symptom}" {logical_operator} ' + f' {logical_operator} '.join(f'"{condition}"' for condition in conditions)
            return JsonResponse({'query': query})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

class PatientListView(APIView):
    def get(self, request):
        try:
            search_query = request.query_params.get('search', '')
            gender_filter = request.query_params.get('gender', '')
            ethnicity_filter = request.query_params.get('ethnicity', '')
            min_age = request.query_params.get('min_age')
            max_age = request.query_params.get('max_age')

            queryset = Patient.objects.all()
            if search_query:
                queryset = queryset.filter(Q(patient_id_icontains=search_query) | Q(ethnicity_icontains=search_query))
            if gender_filter:
                queryset = queryset.filter(gender__iexact=gender_filter)
            if ethnicity_filter:
                queryset = queryset.filter(ethnicity__iexact=ethnicity_filter)
            if min_age is not None:
                queryset = queryset.filter(age__gte=min_age)
            if max_age is not None:
                queryset = queryset.filter(age__lte=max_age)

            serializer = PatientSerializer(queryset, many=True)
            return Response({'status': 'success', 'message': 'Patients retrieved successfully', 'count': queryset.count(), 'data': serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PatientDetailView(APIView):
    def get_object(self, patient_id):
        try:
            return Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            return None

    def get(self, request, patient_id):
        patient = self.get_object(patient_id)
        if not patient:
            return Response({'status': 'error', 'message': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientSerializer(patient)
        return Response({'status': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, patient_id):
        patient = self.get_object(patient_id)
        if not patient:
            return Response({'status': 'error', 'message': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Patient updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'status': 'error', 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, patient_id):
        patient = self.get_object(patient_id)
        if not patient:
            return Response({'status': 'error', 'message': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        patient.delete()
        return Response({'status': 'success', 'message': 'Patient deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class GenerateVoiceQuery(APIView):
    def post(self, request, *args, **kwargs):
        try:
            voice_input = request.data.get('voice_input', None)
            if not voice_input:
                return Response({'detail': 'Voice input is required.'}, status=status.HTTP_400_BAD_REQUEST)

            query = generate_boolean_query(voice_input)
            records = MedicalRecord.objects.filter(symptom__icontains=query.capitalize())
            serializer = MedicalRecordSerializer(records, many=True).data

            return Response({'query': query, 'records': serializer}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'detail': 'Internal server error. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)