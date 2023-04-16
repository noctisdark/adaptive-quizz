import logging
import os
import shutil
from datetime import datetime
from base import app

from routes import *

# For the best use flask-migrate
from migration_scripts import HEAD
next_migration_name = getattr(HEAD, "name", None)
if next_migration_name:
  getattr(HEAD, "run")()
  timestamp = datetime.timestamp(datetime.now())
  next_filename = f"src/migration_scripts/{timestamp}_{next_migration_name.replace(' ', '_')}.py"
  app.logger.log(10, 'next_filename')
  app.logger.log(10, os.getcwd())
  shutil.copy('src/migration_scripts/HEAD.py', next_filename)
  with open('src/migration_scripts/HEAD.py', 'w') as f:
    f.write('')
    f.close()

if __name__ == "__main__":
  debug = True if os.getenv('ENV') == 'development' else False
    
  app.run(
    debug = debug,
    use_debugger = debug,
    use_reloader = debug
  )
