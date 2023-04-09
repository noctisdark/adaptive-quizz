
import os
from base import app

from routes import *

if __name__ == "__main__":
  app.run(
    debug = True if os.getenv('DEBUG') else False 
  )
