# python-projects-crud

<h2>Backend</h2>

pip install -r requirements.txt

create you .env file as .env.example

create your database on postgresql , the same database name in .env file

Run the command: alembic revision --autogenerate -m "creat users table"

Run the command: alembic upgrade head

Run server: uvicorn app.main:app --host localhost --port 8000 --reload

<h2>FrontEnd</h2>

Run: npm start

The app will run on localhost:3000
