from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import event

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode( 'utf-8')
        )
    
    @validates('_password_hash')
    def validate_password(self, key, value):
        if len(value) < 8:
            raise ValueError('Password Must be at least 8 Characters')
        return value
    
class Procedure(db.Model, SerializerMixin):
    __tablename__ = 'procedures'

    serialize_rules = ('-updated_at', '-created_at', '-checklists', '-patients')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    surgeon = db.Column(db.String, nullable=False)
    service_line = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer)
    location = db.Column(db.String)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    checklists = db.relationship('Checklist', backref = 'procedure', cascade='all, delete-orphan')
    patients = association_proxy('checklists', 'patient')

    @validates('service-line')
    def validate_service(self, key, value):
        service = ['Vascular', 'Thoracic', 'Plastics', 'GYN', 'ENT', 'General', 'Urology', 'Orthopedics', 'Neuro', 'Trauma']
        if not service:
            raise ValueError("Error: service not in the approved service line")
        return value
    
    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Name, Surgeon, and Service Line is Required to Create a Procedure')
        return value
    
    @validates('surgeon')
    def validate_surgeon(self, key, value):
        if not value:
            raise ValueError('Name, Surgeon, and Service Line is Required to Create a Procedure')
        return value
    
    @validates('service_line')
    def validate_service(self, key, value):
        if not value:
            raise ValueError('Name, Surgeon, and Service Line is Required to Create a Procedure')
        return value


class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    serialize_rules = ('-updated_at', '-created_at', '-procedures', '-checklists.patient')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    dob = db.Column(db.String, nullable=False)
    mrn = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String)
    phone = db.Column(db.Integer)
    primary = db.Column(db.String)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())

    checklists = db.relationship('Checklist', backref = 'patient', cascade = 'all, delete-orphan')
    procedures = association_proxy('checklists', 'procedure')


    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Patient Name, DOB, and MRN is Required to Create a Patient')
        return value
    
    @validates('dob')
    def validate_dob(self, key, value):
        if not value:
            raise ValueError('Patient Name, DOB, and MRN is Required to Create a Patient')
        return value
    
    @validates('mrn')
    def validate_mrn(self, key, value):
        if not value:
            raise ValueError('Patient Name, DOB, and MRN is Required to Create a Patient')
        return value


class Checklist(db.Model, SerializerMixin):
    __tablename__ = 'checklists'

    serialize_rules = ('-updated_at', '-created_at', '-patient.checklists', '-procedure.checklists')

    id = db.Column(db.Integer, primary_key=True)
    procedure_id = db.Column(db.Integer, db.ForeignKey('procedures.id'))
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    history = db.Column(db.Boolean)
    anesthesia_consent = db.Column(db.Boolean)
    surgical_consent = db.Column(db.Boolean)
    imaging = db.Column(db.Boolean)
    education = db.Column(db.Boolean)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())


