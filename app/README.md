# GAINS App Home

requirements:
python 3.8+
django
yarn

launch:
create python venv
activate venv
pip install -r requirements.txt

cd app
yarn install
yarn prod

cd ../
python manage.py runserver
