from config import app, api
from models import User
from flask import make_response
from flask_restful import Resource

class Home(Resource):
    def get(self):
        return 'Hi'
    
api.add_resource(Home, '/')

if __name__ == '__main__':
    app.run(port=5555)
    