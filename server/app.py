from config import app, api
from models import User, Procedure, Patient, Checklist
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


api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')


class Patients(Resource):
    def get(self):
        patients = [p.to_dict(only=('id', 'name', 'dob', 'mrn', 'image', 'address', 'phone', 'primary', 'procedures.name', 'procedures.surgeon', 'procedures.service_line', 'procedures.duration', 'procedures.location')) for p in Patient.query.all()]
        return make_response(patients, 200)

api.add_resource(Patients, '/patients')

class PatientById(Resource):
    def get(self):
        return 'hi'

api.add_resource(PatientById, '/patients/<int:id>')

if __name__ == '__main__':
    app.run(port=5555)
    