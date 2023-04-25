from config import app, api
from models import User
from flask import make_response, session, request
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


api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555)
    