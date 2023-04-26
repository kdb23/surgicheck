from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

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

    serialize_rules = ('-updated_at', '-created_at')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    surgeon = db.Column(db.String)
    service_line = db.Column(db.String)
    duration = db.Column(db.Integer)
    time = db.Column(db.String)
    location = db.Column(db.String)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    checklists = db.relationship('Checklist', backref = 'procedure')
    patients = association_proxy('checklists', 'patient')

class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    serialize_rules = ('-updated_at', '-created_at')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    dob = db.Column(db.String)
    mrn = db.Column(db.String)
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

    serialize_rules = ('-updated_at', '-created_at')

    id = db.Column(db.Integer, primary_key=True)
    procedure_id = db.Column(db.Integer, db.ForeignKey('procedures.id'))
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    history = db.Column(db.String)
    anesthesia_consent = db.Column(db.String)
    surgical_consent = db.Column(db.String)
    covid_test = db.Column(db.String)
    imaging = db.Column(db.String)
    education = db.Column(db.String)
    updated_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, onupdate=db.func.now())


