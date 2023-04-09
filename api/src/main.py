import logging
import os
from base import app

from routes import *

if __name__ == "__main__":
  debug = True if os.getenv('ENV') == 'development' else False 
  app.run(
    debug = debug,
    use_debugger = debug,
    use_reloader = debug
  )
