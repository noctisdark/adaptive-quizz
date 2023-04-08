# Use a python docker image
FROM python:3.9-bullseye

# Project source at /api
WORKDIR /api

# Install dependencies, if any
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Expose this port
EXPOSE 5000

# Run the server
CMD flask run --host 0.0.0.0