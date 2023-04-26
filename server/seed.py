from random import choice as rc, randint
from faker import Faker
from config import app
from models import db, Procedure, Patient, Checklist
import random


def make_procedures():
    Procedure.query.delete()

    amputation = Procedure(
        id=1,
        name='Amputation',
        surgeon='Castroviejo',
        service_line='Vascular',
        duration= 60,
        time='0700',
        location='Main',
    )

    fempop = Procedure(
        id=2,
        name='Femoropopliteal Bypass',
        surgeon='Castroviejo',
        service_line='Vascular',
        duration=240,
        time='0900',
        location='Main'
    )

    wedge = Procedure(
        id=3,
        name='VATS Wedge Resection',
        surgeon='Harken',
        service_line='Thoracic',
        duration=200,
        time='0900',
        location='Main'
    )

    lobe = Procedure(
        id= 4,
        name='VATS Lobectomy',
        surgeon='Harken',
        service_line='Thoracic',
        duration=180,
        time='1300',
        location='Main'
    )

    abdomin = Procedure(
        id= 5,
        name='Abdominoplasty',
        surgeon='Mouchantat',
        service_line='Plastics',
        duration=180,
        time='1230',
        location='Main'
    )
    
    scar = Procedure(
        id= 6,
        name='Scar Revision',
        surgeon='Mouchantat',
        service_line='Plastics',
        duration=45,
        time='0800',
        location='SAG'
    )

    tah = Procedure(
        id= 7,
        name='Total Abdominal Hysterectomy',
        surgeon='Masterson',
        service_line='GYN',
        duration=90,
        time='1130',
        location='Main'
    )

    fess = Procedure(
        id= 8,
        name='Functional Endoscopic Sinus Surgery',
        surgeon='Esau',
        service_line='ENT',
        duration=75,
        time='0700',
        location='Main'
    )

    hernia_open = Procedure(
        id= 9,
        name='Open Hernia Repair',
        surgeon='Hwang',
        service_line='General',
        duration=45,
        time='0800',
        location='SAG'
    )


    lapcholy = Procedure(
        id= 10,
        name='Laparoscopic Cholecystectomy',
        surgeon='Hwang',
        service_line='General',
        duration=60,
        time='1030',
        location='SAG'
    )

    neck = Procedure(
        id= 11,
        name='Radial Neck Dissection with Anterolateral Free Flap',
        surgeon='Esau',
        service_line='ENT',
        duration=720,
        time='0700',
        location='Main'
    )

    stent = Procedure(
        id= 12,
        name='Cystoscopy with Stent Placement',
        surgeon='Gail',
        service_line='Urology',
        duration=60,
        time='1000',
        location='SAG'
    )

    no_stent = Procedure(
        id= 13,
        name='Cystoscopy without Stent Placement',
        surgeon='Gail',
        service_line='Urology',
        duration=30,
        time='0800',
        location='SAG'
    )

    tka = Procedure(
        id= 14,
        name='Total Knee Arthroplasty',
        surgeon='White',
        service_line='Orthopedics',
        duration=90,
        time='0800',
        location='SAG'
    )

    hip = Procedure(
        id= 15,
        name='Total IM Hip Nailing',
        surgeon='White',
        service_line='Orthopedics',
        duration=30,
        time='1230',
        location='Main'
    )

    acdf = Procedure(
        id= 16,
        name='Anterior Cervical Discectomy and Fusion',
        surgeon='Hsu',
        service_line='Neuro',
        duration=90,
        time='0700',
        location='Main'
    )

    carotid_neuro = Procedure(
        id= 17,
        name='Carotid Endarterectomy',
        surgeon='Wilson',
        service_line='Neuro',
        duration=120,
        time='1200',
        location='Main'
    )

    tumor = Procedure(
        id= 18,
        name='Intradural Tumor Resection',
        surgeon='Hsu',
        service_line='Neuro',
        duration=60,
        time='1030',
        location='Main'
    )

    brain = Procedure(
        id= 19,
        name='Brain Aneurysm Clipping',
        surgeon='Wilson',
        service_line='Neuro',
        duration=60,
        time='0700',
        location='Main'
    )

    carotid_vas = Procedure(
        id= 20,
        name='Carotid Endarterectomy',
        surgeon='Castroviejo',
        service_line='Vascular',
        duration=120,
        time='1500',
        location='Main'
    )

    db.session.add_all([ amputation, fempop, wedge, lobe, abdomin, scar, tah, fess, hernia_open, lapcholy, neck, stent, no_stent, tka, hip, acdf, carotid_neuro, tumor, brain, carotid_vas])
    db.session.commit()


