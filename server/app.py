from config import app, api
from models import db, User, Procedure, Patient, Checklist
from flask import make_response, session, request, jsonify
from flask_restful import Resource, reqparse
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import os
import base64


UPLOAD_FOLDER = '/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 *1024

ALLOWED_EXTENSIONS = set(['tx', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return'.' in filename and filename.rsplit('.' , 1)[1].lower() in ALLOWED_EXTENSIONS
class Login(Resource):
    def post(self):
        data= request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            return user.to_dict(), 200
        return {'error': '401 Unauthroized'}, 401
    
class UsersList(Resource):
    def get(self):
        list = User.query.all()
        list_dict = [l.to_dict() for l in list]
        return make_response(list_dict, 200)

class UserResource(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        if len(password) < 8:
            return make_response({'error' : 'Password must be at least 8 characters long'}, 400)

        if User.query.filter_by(username = username).first():
            return {'error' : 'Username already exists'}, 400
        
        user = User(username=username)
        user.password_hash = password
        db.session.add(user)
        db.session.commit()

        return user.to_dict(), 201

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
api.add_resource(UserResource, '/users', endpoint ='users')
api.add_resource(UsersList, '/users/list', endpoint='users_list')
api.add_resource(Logout, '/logout', endpoint = 'logout')
api.add_resource(CheckSession, '/check_session', endpoint = 'check_session')

class Home(Resource):
    def get(self):
        return 'SurgiCheck Project'
    
api.add_resource(Home, '/')


class Patients(Resource):
    def get(self):
        patients = Patient.query.all()
        patient_list = []
        for patient in patients:
            procedures = [procedure.to_dict() for procedure in patient.procedures]
            p_dict = {
                'id': patient.id,
                'name' : patient.name,
                'dob' : patient.dob,
                'mrn' : patient.mrn,
                'address' : patient.address,
                'phone' : patient.phone,
                'primary' : patient.primary,
                'surgeries' : procedures
            }
            patient_list.append(p_dict)
        return make_response(patient_list, 200)
    
    def post(self):
        data = request.get_json()
        try:
            # import ipdb
            # ipdb.set_trace()
            new_patient = Patient(
                name = data['name'],
                dob = data['dob'],
                mrn = data['mrn'],
                address = data['address'],
                phone = data['phone'],
                primary = data['primary']
            )
            db.session.add(new_patient)
            db.session.commit()
        except ValueError: 
            return make_response({'error': ' 400 Unable to process request, Missing Information'}, 400)
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
        procedures = Procedure.query.all()
        surgery_list = []
        for procedure in procedures:
            s_dict = {
                'id': procedure.id,
                'name' : procedure.name,
                'surgeon' : procedure.surgeon,
                'service_line' : procedure.service_line,
                'duration' : procedure.duration,
                'location' : procedure.location,
            }
            surgery_list.append(s_dict)
        return make_response(surgery_list, 200)

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
            db.session.add(new_procedure)
            db.session.commit()
        except ValueError:
            return make_response({'error' : 'Uanble to Add Procedure'}, 400)
        return make_response(new_procedure.to_dict(), 201)

    
api.add_resource(Procedures, '/procedures')

class ProceduresById(Resource):
    def get(self, id):
        procedure = Procedure.query.filter_by(id = id).first()
        if not procedure:
            return make_response({'error': '404 Procedure Not Found'}, 404)
        return make_response(procedure.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        procedure = Procedure.query.filter_by(id = id).first()
        try:
            for new_info in data:
                setattr(procedure, new_info, data[new_info])
        except:
            return make_response({'error': 'Unable to Process Request'}, 400)
        db.session.add(procedure)
        db.session.commit()
        return make_response(procedure.to_dict(), 202)
    
    
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
    
    def post(self, id):
        data = request.get_json()
        patient = Patient.query.filter_by(id = id).first()
        if not patient:
            return make_response({'error': '404 Patient Not Found'}, 404)
        try:
            procedure = Procedure(
                name = data['name'],
                surgeon = data['surgeon'],
                service_line = data['service_line'],
                duration = data['duration'],
                location = data['location'],
            )
            checklist = Checklist(patient = patient, procedure = procedure)
            patient.procedures.append(procedure)
            db.session.add(procedure)
            db.session.add(checklist)
            db.session.commit()
        except ValueError:
            return make_response({'error' : 'Service not in the approved service line'}, 400)
        return make_response(procedure.to_dict(), 201)
    
    def patch(self, id):
        data = request.get_json()
        procedure = Procedure.query.filter_by(id = id).first()
        if not procedure:
            return make_response({'error' : '404 Procedure Not Found'}, 404)
        try:
            for new_info in data:
                setattr(procedure, new_info, data[new_info])
        except:
            return make_response({'error': 'Unable to Process Request'}, 400)
        db.session.add(procedure)
        db.session.commit()
        return make_response(procedure.to_dict(), 202)
    
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
    
api.add_resource(PatientChecklists, '/patients/<int:id>/checklists')


# class Uploads(Resource):
#     def get(self, id):
#         uploads = Checklist.query.filter_by(id = id).all()
#         upload_list = []
#         for upload in uploads:
#             upload_data = {
#                 'file_name' : upload.file_name,
#                 'file_uploaded' : upload.file_uploaded
#             }
#             with open(os.path.join(app.config['UPLOAD_FOLDER'], upload.file_name), 'rb') as f:
#                 file_data = f.read()
#                 upload_data['file_data'] = base64.b64encode(file_data).decode('utf-8')
#             upload_list.append(upload_data)
#         return {'uploads': upload_list}, 200
    
 
    # def get(self, id):
    #     uploads = Checklist.query.filter_by(id=id).all()
    #     upload_list = []
    #     for upload in uploads:
    #         upload_data = {
    #             'file_name': upload.file_name,
    #             'file_uploaded': upload.file_uploaded
    #         }
    #         if upload.file_url is not None:
    #             with open(os.path.join(app.config['UPLOAD_FOLDER'], upload.file_name), 'rb') as f:
    #                 file_data = base64.b64encode(f.read()).decode('utf-8')
    #             upload_data['file_url'] = upload.file_url
    #             upload_data['file_data'] = file_data
    #         else:
    #             upload_data['file_url'] = DEFAULT_PHOTO_URL
    #             upload_data['file_data'] = None
    #         upload_list.append(upload_data)
    #     return {'uploads': upload_list}, 200

#     def post(self, id):
#         parser = reqparse.RequestParser()
#         parser.add_argument('file', type=FileStorage, location='files')
#         args = parser.parse_args()

#         file = args['file']
#         if file is None:
#             return {'message': 'No file uploaded'}, 400

#         # Save file to disk
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

#         # Save file info to database
#         checklist = Checklist.query.filter_by(id=id).first()
#         if checklist is None:
#             return {'message': 'Checklist not found'}, 404
        

#         # Update Checklist object with file name and URL
#         checklist.file_name = filename
#         checklist.file_url = f'http://localhost:3000/uploads/{filename}'
#         db.session.commit()

#         return {'message': 'File uploaded successfully'}, 200
        
# api.add_resource(Uploads, '/uploads')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'files[]' not in request.files:
        resp=jsonify({'message' : 'No file part in the request'})
        resp.status_code=400
        return resp
    
    files = request.files.getlist('files[]')

    errors = {}
    success = False

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success = True
        else:
            errors[file.filename] = 'File type is not allowed'

    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        resp = jsonify({'message' : ' Files successfully uploaded'})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp


if __name__ == '__main__':
    app.run(port=5555, debug=True)
    