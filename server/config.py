from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt



app = Flask(__name__)
app.secret_key = b'\xc4\x17d\x98\xae\xbd>\xe1\xb6\x07\xf1\\\xa2\xd0\xd9\x13'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///models.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
md = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata = md)
migrate = Migrate( app, db)

db.init_app(app)
api = Api(app)

CORS(app)

bcrypt = Bcrypt( app )
