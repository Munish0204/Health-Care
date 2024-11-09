import os
import django
from faker import Faker
import random

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "healthcare_query.settings")
django.setup()

from query_generator.models import Patient, MedicalRecord, ClinicalTrial, DrugInteraction, LabResult

fake = Faker()

# Seeding functions
def seed_patients(n=10):
    for _ in range(n):
        Patient.objects.create(
            patient_id=fake.unique.uuid4(),
            age=random.randint(18, 90),
            gender=random.choice(['Male', 'Female']),
            ethnicity=fake.random_element(elements=("Caucasian", "African American", "Asian", "Hispanic", "Other"))
        )

def seed_medical_records(n=20):
    patients = list(Patient.objects.all())
    symptoms = ["Cough", "Fever", "Headache", "Chest Pain", "Shortness of Breath"]
    diagnoses = ["Flu", "Pneumonia", "Migraine", "Angina", "Asthma"]
    for _ in range(n):
        MedicalRecord.objects.create(
            patient=random.choice(patients),
            symptom=random.choice(symptoms),
            diagnosis=random.choice(diagnoses),
            date_recorded=fake.date_between(start_date="-1y", end_date="today")
        )

def seed_clinical_trials(n=5):
    conditions = ["Diabetes", "Hypertension", "Asthma", "Cancer", "Heart Disease"]
    for _ in range(n):
        ClinicalTrial.objects.create(
            title=f"{fake.word().capitalize()} Trial on {random.choice(conditions)}",
            description=fake.text(max_nb_chars=200),
            related_conditions=", ".join(fake.words(nb=3, ext_word_list=conditions))
        )

def seed_drug_interactions(n=10):
    drugs = ["Aspirin", "Ibuprofen", "Paracetamol", "Warfarin", "Metformin", "Atorvastatin"]
    for _ in range(n):
        drug1, drug2 = random.sample(drugs, 2)
        DrugInteraction.objects.create(
            drug_name=drug1,
            interacting_drug=drug2,
            interaction_effect=f"{drug1} and {drug2} may cause increased risk of bleeding."
        )

def seed_lab_results(n=30):
    patients = list(Patient.objects.all())
    tests = ["Blood Pressure", "Blood Sugar", "Cholesterol", "Hemoglobin", "Platelet Count"]
    units = ["mmHg", "mg/dL", "g/dL", "x10^9/L", "mm3"]
    for _ in range(n):
        LabResult.objects.create(
            patient=random.choice(patients),
            test_name=random.choice(tests),
            value=round(random.uniform(3.5, 200), 2),
            unit=random.choice(units),
            date_conducted=fake.date_between(start_date="-1y", end_date="today")
        )

# Run all seeding functions
def seed_all():
    seed_patients()
    seed_medical_records()
    seed_clinical_trials()
    seed_drug_interactions()
    seed_lab_results()

if __name__ == "__main__":
    seed_all()
