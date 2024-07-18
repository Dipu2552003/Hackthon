from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def home():
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Streamlit App in Flask</title>
    </head>
    <body>
        <h1>Streamlit App Embedded in Flask</h1>
        <iframe src="http://localhost:8501" width="100%" height="800px"></iframe>
    </body>
    </html>
    ''')

if __name__ == '__main__':
    app.run(port=5000)
