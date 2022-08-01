from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('play.html')

@app.route('/transducer', methods = ['GET'])
def how_to():
        return render_template('transducer.html')

@app.route('/corpus')
def main_page():
    return render_template('tsacorpus.html')

#
#
# @app.route('/search')
# def search():
#     text = request.args.get('test')
#     return text * 4

if __name__ == '__main__':
    app.run(debug=True)