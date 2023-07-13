import os
from flask import Flask, render_template, request, session, Response
from flask_dropzone import Dropzone
from werkzeug.utils import secure_filename
import json
from datetime import datetime
from receipt_scanner import scan_files
import uuid
from flask_socketio import SocketIO


basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

socketio = SocketIO(app)

app.config['SECRET_KEY'] = 'super secret key'

app.config.update(
    UPLOADED_PATH='static/uploads',
    # Flask-Dropzone config:
    DROPZONE_ALLOWED_FILE_TYPE='image',
    DROPZONE_MAX_FILE_SIZE=3,
    DROPZONE_MAX_FILES=30,
)

dropzone = Dropzone(app)


def items_list(receipts):
    a = []
    for i in receipts:
        a.append([j['id'] for j in i['items']])
    return a


@app.route('/', methods=['POST', 'GET'])
def upload():
    if request.method == 'GET':
        session['ip'] = request.remote_addr
        session['date'] = str(datetime.now())
        session['folder'] = session['date'].replace(':', '-') + ' ' + session['ip'] + ' ' + str(uuid.uuid4())[:8]
        session['folder'] = app.config['UPLOADED_PATH'] + '/' + session['folder']

    if request.method == 'POST':
        f = request.files.get('file')
        file_name = secure_filename(f.filename)

        if not os.path.exists(session['folder']):
            os.makedirs(session['folder'])

        file_path = os.path.join(session['folder'], file_name)
        f.save(file_path)
        
    return render_template('index.html', receipt_url='/receipt', root_url = request.url_root)


@app.route('/receipt')
def receipt():
    try:
        with open(session['folder'] + '/' + 'out.json') as f:
            receipts_data = json.load(f)
    except FileNotFoundError:
        return 'please upload some receipts first'

    if not receipts_data['receipts']:
        return 'make sure your images are valid receipts'

    items_list(receipts_data['receipts'])
    return render_template('receipt.html', receipts=receipts_data['receipts'], items = items_list(receipts_data['receipts']))


@app.route("/progress/<socketid>", methods = ["POST"])
async def progress(socketid):
        try:
            files = [i for i in os.listdir(session['folder'])]
            scan_files(files, session['folder'], socketio, socketid)
        except FileNotFoundError:
            pass
        return Response(status=204)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
    
