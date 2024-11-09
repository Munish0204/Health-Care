# query_generator/models.py
from django.db import models

class Symptom(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name
# models.py
from django.db import models

class HealthRecord(models.Model):
    patient_id = models.CharField(max_length=100)
    diagnosis = models.TextField()
    symptoms = models.TextField()  # Store symptoms as a text string

    def __str__(self):
        return self.patient_id

class Condition(models.Model):
    name = models.CharField(max_length=255)
    symptoms = models.ManyToManyField(Symptom)

    def __str__(self):
        return self.name

from django.db import models

class Patient(models.Model):
    patient_id = models.CharField(max_length=50, unique=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    ethnicity = models.CharField(max_length=50)

    def __str__(self):
        return f"Patient {self.patient_id}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    symptom = models.CharField(max_length=255)
    diagnosis = models.CharField(max_length=255)
    date_recorded = models.DateField()

    def __str__(self):
        return f"Record for {self.patient.patient_id} - {self.symptom}"

class ClinicalTrial(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    related_conditions = models.CharField(max_length=255)  # e.g., "Diabetes, Hypertension"

    def __str__(self):
        return self.title

class DrugInteraction(models.Model):
    drug_name = models.CharField(max_length=100)
    interacting_drug = models.CharField(max_length=100)
    interaction_effect = models.TextField()

    def __str__(self):
        return f"Interaction between {self.drug_name} and {self.interacting_drug}"

class LabResult(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    test_name = models.CharField(max_length=100)
    value = models.FloatField()
    unit = models.CharField(max_length=20)
    date_conducted = models.DateField()

    def __str__(self):
        return f"Lab result for {self.patient.patient_id} - {self.test_name}"
