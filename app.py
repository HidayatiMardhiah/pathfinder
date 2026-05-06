from flask import Flask, render_template, request, jsonify
from BFS import bfs

app = Flask(__name__)

# Make a route for user to visit html page
@app.route('/')
def home():
    return render_template('grid.html')

# Make a route at /findpath that receives a post request with a json body runs bfs function and returns path as json

@app.route('/findpath', methods=['POST'])
def find_path():
    data = request.get_json()
    grid = data['grid']
    start = tuple(data['start'])
    end = tuple(data['end'])
    path = bfs(grid, start, end)
    return jsonify({'path': path})

@app.route('/reset', methods=['POST'])
def reset():
    return jsonify({'message': 'Grid reset successful'})    