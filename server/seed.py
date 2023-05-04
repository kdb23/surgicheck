from random import choice as rc
from faker import Faker
from config import app
from models import db, Procedure, Patient, Checklist
import random

fake = Faker()

def make_procedures():
    Procedure.query.delete()

    amputation = Procedure(
        id=1,
        name='Amputation',
        surgeon='Matthew Edwards',
        service_line='Vascular',
        duration= 60,
        location='Main',
    )

    fempop = Procedure(
        id=2,
        name='Femoropopliteal Bypass',
        surgeon='Matthew Edwards',
        service_line='Vascular',
        duration=240,
        location='Main'
    )

    wedge = Procedure(
        id=3,
        name='VATS Wedge Resection',
        surgeon='Nicholas Karis',
        service_line='Thoracic',
        duration=200,
        location='Main'
    )

    lobe = Procedure(
        id= 4,
        name='VATS Lobectomy',
        surgeon='Nicholas Karis',
        service_line='Thoracic',
        duration=180,
        location='Main'
    )

    abdomin = Procedure(
        id= 5,
        name='Abdominoplasty',
        surgeon='Richard Mouchantat',
        service_line='Plastics',
        duration=180,
        location='Main'
    )
    
    scar = Procedure(
        id= 6,
        name='Scar Revision',
        surgeon='Richard Mouchantat',
        service_line='Plastics',
        duration=45,
        location='SAG'
    )

    tah = Procedure(
        id= 7,
        name='Total Abdominal Hysterectomy',
        surgeon='Katlynn Waugh',
        service_line='GYN',
        duration=90,
        location='Main'
    )

    fess = Procedure(
        id= 8,
        name='Functional Endoscopic Sinus Surgery',
        surgeon='Esau Felton',
        service_line='ENT',
        duration=75,
        location='Main'
    )

    hernia_open = Procedure(
        id= 9,
        name='Open Hernia Repair',
        surgeon='Richard Hwang',
        service_line='General',
        duration=45,
        location='SAG'
    )

    lapcholy = Procedure(
        id= 10,
        name='Laparoscopic Cholecystectomy',
        surgeon='Richard Hwang',
        service_line='General',
        duration=60,
        location='SAG'
    )

    neck = Procedure(
        id= 11,
        name='Radial Neck Dissection with Anterolateral Free Flap',
        surgeon='Esau Felton',
        service_line='ENT',
        duration=720,
        location='Main'
    )

    stent = Procedure(
        id= 12,
        name='Cystoscopy with Stent Placement',
        surgeon='Gail Grubbs',
        service_line='Urology',
        duration=60,
        location='SAG'
    )

    no_stent = Procedure(
        id= 13,
        name='Cystoscopy without Stent Placement',
        surgeon='Gail Grubbs',
        service_line='Urology',
        duration=30,
        location='SAG'
    )

    tka = Procedure(
        id= 14,
        name='Total Knee Arthroplasty',
        surgeon='Bryan White',
        service_line='Orthopedics',
        duration=90,
        location='SAG'
    )

    hip = Procedure(
        id= 15,
        name='Total IM Hip Nailing',
        surgeon='Bryan White',
        service_line='Orthopedics',
        duration=30,
        location='Main'
    )

    acdf = Procedure(
        id= 16,
        name='Anterior Cervical Discectomy and Fusion',
        surgeon='Wesley Hsu',
        service_line='Neuro',
        duration=90,
        location='Main'
    )

    carotid_neuro = Procedure(
        id= 17,
        name='Carotid Endarterectomy',
        surgeon='John Wilson',
        service_line='Neuro',
        duration=120,
        location='Main'
    )

    tumor = Procedure(
        id= 18,
        name='Intradural Tumor Resection',
        surgeon='Wesley Hsu',
        service_line='Neuro',
        duration=60,
        location='Main'
    )

    brain = Procedure(
        id= 19,
        name='Brain Aneurysm Clipping',
        surgeon='John Wilson',
        service_line='Neuro',
        duration=60,
        location='Main'
    )

    carotid_vas = Procedure(
        id= 20,
        name='Carotid Endarterectomy',
        surgeon='Matthew Goldman',
        service_line='Vascular',
        duration=120,
        location='Main'
    )

    db.session.add_all([ amputation, fempop, wedge, lobe, abdomin, scar, tah, fess, hernia_open, lapcholy, neck, stent, no_stent, tka, hip, acdf, carotid_neuro, tumor, brain, carotid_vas])
    db.session.commit()


def make_patients():
    Patient.query.delete()

    patients = []

    primary = ["Powers", "Birkedal", "Branch", "O'Gara"]

    for i in range(25):
        patient = Patient(
            name = fake.name(),
            dob= fake.date_between(start_date='-98y', end_date='-18y'),
            mrn = fake.credit_card_number(),
            address = fake.address(),
            phone = fake.phone_number(),
            primary = random.choice(primary)
        )
        patients.append(patient)
    db.session.add_all(patients)
    db.session.commit()

def make_checklists():
    Checklist.query.delete()

    surgeries = Procedure.query.all()
    patients = Patient.query.all()

    checklists = []

    for patient in patients:
        random.shuffle(surgeries)
        for procedure in surgeries[:1]:
            if not Checklist.query.filter_by(patient_id = patient.id, procedure_id = procedure.id).first():
                checklist = Checklist(
                    procedure_id = procedure.id,
                    patient_id = patient.id,
                    history = False,
                    anesthesia_consent = False,
                    surgical_consent = False,
                    imaging = False,
                    education = False
                )
                checklists.append(checklist)
    db.session.add_all(checklists)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        make_procedures()
        make_patients()
        make_checklists()