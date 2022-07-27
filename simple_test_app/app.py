from flask import Flask, render_template, request


app = Flask(__name__)


@app.route('/')
def main_page():
    return render_template('index.html')


@app.route('/search')
def search():
    text = request.args.get('test')
    return text * 4

if __name__ == '__main__':
    app.run(debug=True)