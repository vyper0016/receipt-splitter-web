from veryfi import Client
import json
import os
from flask import url_for, jsonify
from api_keys import client_id, client_secret, username, api_key

veryfi_client = Client(client_id, client_secret, username, api_key)

def api_scan(file_path: str):
    r = veryfi_client.process_document(file_path, delete_after_processing=True)
    return r

def clean_json(responses: list, files: list, dir):
    nr, id = 0, 0
    output = {'receipts': []}
    for r, f in zip(responses, files):
        temp_dict = {'url': url_for('static', filename=dir + '/' + f),
                     'nr': nr,
                     'date': r['date'] or r['created_date'],
                     'market': r['vendor']['name'],
                     'address': r['vendor']['address'],
                     'logo_url': r['vendor']['logo'],
                     'items': []}
        nr += 1
        
        for i in r['line_items']:
            i_dic = {
                'id': id,
                'description': i['description'],
                'quantity': int(i['quantity']),
                'price': i['price'] or i['total']
            }
            id += 1
            temp_dict['items'].append(i_dic)
        
        if not temp_dict['items'] or [temp_dict['address'], temp_dict['logo_url'], temp_dict['market']] == [None, None, None]:
            continue

        output['receipts'].append(temp_dict)
    
    return output

def scan_files(file_paths: list, outdir: str, socketio, socketid):
    r = []
    socketio.emit("update total", len(file_paths), to=socketid)
    
    for i, f in enumerate(file_paths):
        print(f'waiting for api response {i}/{len(file_paths)}...')
        r.append(api_scan(os.path.join(outdir, f)))
        socketio.emit("update progress", i+1, to=socketid)

    data = clean_json(r, file_paths, outdir.replace('static/', ''))

    with open(os.path.join(outdir, 'out.json'), 'w') as fp:
        json.dump(data, fp, indent=3)
    
    return data
