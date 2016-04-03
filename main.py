from datetime import datetime
from operator import attrgetter
from google.appengine.ext import ndb
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    weather_query = Weather.query().order(-Weather.date)
    weathers = weather_query.fetch(49)
    weathers.sort(key=attrgetter('date'))
    
    return render_template('index.html', weathers=weathers)


@app.route('/post/')
def post():
    weather = Weather()
    weather.owner = request.args.get('owner')
    weather.date = datetime.strptime(request.args.get('date'), '%Y-%m-%d %H:%M:%S')
    weather.temperature = float(request.args.get('temperature'))
    weather.humidity = float(request.args.get('humidity'))
    weather.put()
    
    return 'success'


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500


class Weather(ndb.Model):
    owner = ndb.StringProperty()
    temperature = ndb.FloatProperty()
    humidity = ndb.FloatProperty()
    date = ndb.DateTimeProperty()
