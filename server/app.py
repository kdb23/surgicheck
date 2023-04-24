from config import app, api
from models import User
from flask import make_response, session, request
from flask_restful import Resource

class Home(Resource):
    def get(self):
        return 'Hi'
    
api.add_resource(Home, '/')

class Login(Resource):
    def post(self):

        username = request.get_json()['username']
        user = User.query.filter(User.username == username)

        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        
        return {'error': 'Invalid username or password'}, 401

if __name__ == '__main__':
    app.run(port=5555)
    