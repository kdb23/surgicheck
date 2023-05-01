from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import event

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
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
    
class Procedure(db.Model, SerializerMixin):
    __tablename__ = 'procedures'

    serialize_rules = ('-updated_at', '-created_at', '-checklists', '-patients')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    surgeon = db.Column(db.String, nullable = False)
    service_line = db.Column(db.String, nullable = False)
    duration = db.Column(db.Integer)
    location = db.Column(db.String, nullable = False)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    checklists = db.relationship('Checklist', backref = 'procedure')
    patients = association_proxy('checklists', 'patient')

    @validates('time')
    def validate_time(self, key, value):
        if value < '0700':
            raise ValueError("Procedure cannot be scheduled before 0700")
        elif value > '1800':
            raise ValueError("Procedure cannot be scheduled after 1800")
        return value

class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    serialize_rules = ('-updated_at', '-created_at', '-procedures', '-checklists.patient')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    dob = db.Column(db.String, nullable = False)
    mrn = db.Column(db.String, nullable = False)
    image = db.Column(db.String)
    address = db.Column(db.String)
    phone = db.Column(db.Integer)
    primary = db.Column(db.String)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())

    checklists = db.relationship('Checklist', backref = 'patient')
    procedures = association_proxy('checklists', 'procedure')


class Checklist(db.Model, SerializerMixin):
    __tablename__ = 'checklists'

    serialize_rules = ('-updated_at', '-created_at', '-patient.checklists', '-procedure.checklists')

    id = db.Column(db.Integer, primary_key=True)
    procedure_id = db.Column(db.Integer, db.ForeignKey('procedures.id'))
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    history = db.Column(db.String)
    anesthesia_consent = db.Column(db.String)
    surgical_consent = db.Column(db.String)
    imaging = db.Column(db.String)
    education = db.Column(db.String)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())


