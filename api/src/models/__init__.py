# The goal is not to import *, but we want to make it definely possible

from os.path import dirname, basename, isfile, join
import glob

routes = glob.glob(join(dirname(__file__), "*.py"))
__all__ = [
  basename(f)[:-3]
  for f in routes if isfile(f) and not f.startswith('__')
]