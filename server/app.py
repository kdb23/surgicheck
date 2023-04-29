from config import app, api
from models import db, User, Procedure, Patient, Checklist
from flask import make_response, session, request, jsonify
from flask_restful import Resource


class Login(Resource):
    def post(self):
        data= request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter(User.username == username).first()
        if user.authenticate(password):
            return user.to_dict(), 200
        return {'error': '401 Unauthroized'}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)
    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {}, 204


api.add_resource(Login, '/login', endpoint = 'login')
api.add_resource(Logout, '/logout', endpoint = 'logout')
api.add_resource(CheckSession, '/check_session', endpoint = 'check_session')


class Patients(Resource):
    def get(self):
        patients = Patient.query.all()
        patient_list = []
        for patient in patients:
            p_dict = {
                'id': patient.id,
                'name' : patient.name,
                'dob' : patient.dob,
                'mrn' : patient.mrn,
                'address' : patient.address,
                'phone' : patient.phone,
                'primary' : patient.primary,
            }
            patient_list.append(p_dict)
        return make_response(jsonify(patient_list), 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_patient = Patient(
                name = data['name'],
                dob = data['dob'],
                mrn = data['mrn'],
                address = data['address'],
                phone = data['phone'],
                primary = data['primary']
            )
        except:
            return make_response({'error': ' 400 Unable to process request'}, 400)
        db.session.add(new_patient)
        db.session.commit()
        return make_response(new_patient.to_dict(), 201)


api.add_resource(Patients, '/patients')

class PatientById(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id = id).first()
        if not patient:
            return make_response({'error': '404 Patient Not Found'}, 404)
        return make_response(patient.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        person = Patient.query.filter_by(id = id).first()
        try:
            for new_info in data:
                setattr(person, new_info, data[new_info])
        except:
            return make_response({'error': 'Unable to Process Request'}, 400)
        db.session.add(person)
        db.session.commit()
        return make_response(person.to_dict(), 202)
    
    def delete(self, id):
        doomed = Patient.query.filter_by(id = id).first()
        if not doomed:
            return make_response({'error': '404 Unable to Process Request'}, 404)
        db.session.delete(doomed)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(PatientById, '/patients/<int:id>')

class Procedures(Resource):
    def get(self):
        surgery = Procedure.query.all()
        surgery_list = []
        for s in surgery:
            s_dict = {
                'id': s.id,
                'name' : s.name,
                'surgeon' : s.surgeon,
                'service_line' : s.service_line,
                'duration' : s.duration,
                'location' : s.location
            }
            surgery_list.append(s_dict)
        return make_response(jsonify(surgery_list), 200)
    
    def post (self):
        data = request.get_json()
        try:
            new_procedure = Procedure (
                name = data['name'],
                surgeon = data['surgeon'],
                service_line = data['service_line'],
                duration = data['duration'],
                location = data['location']
            )
        except:
            return make_response({'error' : 'Uanble to Add Procedure'}, 400)
        db.session.add(new_procedure)
        db.session.commit()
        return make_response(new_procedure.to_dict(), 201)

    
api.add_resource(Procedures, '/procedures')

class ProceduresById(Resource):
    def get(self, id):
        surgery = Procedure.query.filter_by(id = id).first()
        if not surgery:
            return make_response({'error': '404 Procedure Not Found'}, 404)
        return make_response(surgery.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        surgery = Procedure.query.filter_by(id = id).first()
        try:
            for new_info in data:
                setattr(surgery, new_info, data[new_info])
        except:
            return make_response({'error': 'Unable to Process Request'}, 400)
        db.session.add(surgery)
        db.session.commit()
        return make_response(surgery.to_dict(), 202)
    
    
    def delete(self, id):
        doomed = Procedure.query.filter_by(id = id).first()
        if not doomed:
            return make_response({'error': '404 Unable to Process Request'}, 404)
        db.session.delete(doomed)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(ProceduresById, '/procedures/<int:id>')


class PatientProcedures(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id = id).first()
        if not patient:
            return make_response({'error': "404 Patient Not Found"}, 404)
        procedures = patient.procedures
        procedure_list = []
        for p in procedures:
            p_dict = {
                'id': p.id,
                'name' : p.name,
                'surgeon' : p.surgeon,
                'service_line' : p.service_line,
                'duration' : p.duration,
                'location' : p.location
            }
            procedure_list.append(p_dict)
        return make_response(jsonify(procedure_list), 200)
    
api.add_resource(PatientProcedures, '/patients/<int:id>/procedures')

class Checklists(Resource):
    def get(self):
        checklist = Checklist.query.all()
        check_list = []
        for c in checklist:
            c_dict = {
                'id' : c.id,
                'procedure_id' : c.procedure_id,
                'patient_id' : c.patient_id,
                'history' : c.history,
                'anesthesia_consent' : c.anesthesia_consent,
                'surgical_consent' : c.surgical_consent,
                'imaging' : c.imaging,
                'education' : c.education
            }
            check_list.append(c_dict)
        return make_response(jsonify(check_list), 200)
    
api.add_resource(Checklists, '/checklists')

class ChecklistsById(Resource):
    def get(self, id):
        checklist = Checklist.query.filter_by(id = id).first()
        if not checklist:
            return make_response({'error': '404 Checklist Not Found'}, 404)
        return make_response(checklist.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        checklist = Checklist.query.filter_by(id = id).first()
        try:
            for new_info in data:
                setattr(checklist, new_info, data[new_info])
        except:
            return make_response({'error': 'Unable to Process Request'}, 400)
        db.session.add(checklist)
        db.session.commit()
        return make_response(checklist.to_dict(), 202)
    
    
    def delete(self, id):
        doomed = Checklist.query.filter_by(id = id).first()
        if not doomed:
            return make_response({'error': '404 Unable to Process Request'}, 404)
        db.session.delete(doomed)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(ChecklistsById, '/checklists/<int:id>')

class PatientChecklists(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id = id).first()
        if not patient:
            return make_response({'error': '404 Patient Not Found'}, 404)
        checklists = patient.checklists
        check_list = []
        for c in checklists:
            c_dict = {
                'id' : c.id,
                'procedure_id' : c.procedure_id,
                'patient_id' : c.patient_id,
                'history' : c.history,
                'anesthesia_consent' : c.anesthesia_consent,
                'surgical_consent' : c.surgical_consent,
                'imaging' : c.imaging,
                'education' : c.education
            }
            check_list.append(c_dict)
        return make_response(jsonify(check_list), 200)
    
api.add_resource(PatientChecklists, '/patients/<int:id>/checklists')


if __name__ == '__main__':
    app.run(port=5555)
    