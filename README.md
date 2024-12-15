## Fast API, React Fullstack App

Clone the Repository
```
git clone https://github.com/nuwwan/fastapi_react_app.git
```

# Setup the Backend

1. Create virtual Environment(your current working directory should be the parent directory)
```
python3 -m venv venv
```

2. Activate Virtual environment
```
source activate venv/bin/activate
```

3. Install dependencies(cd into backend directory first)
```
cd backend
pip install -r requirements.txt
```

4. Change the Database connection String.

Go to file backend/config.py and change the following line.
```
DATABASE_URL = "postgresql://postgres:password@localhost:5433/test_db"
```

5. Run dev server
```
uvicorn main:app --reload
```

# Setup the Frontend
1. Change the working directory
```
cd frontend
```

2. Install Dependencies
```
npm install
```

3. Start Dev Server
```
npm start
```