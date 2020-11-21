import os
from pathlib import Path
from urllib.parse import urlparse

import django

django.setup()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = False
ALLOWED_HOSTS = ['colloborative-editor.herokuapp.com']
SECRET_KEY = os.environ.get('SECRET_KEY', 'SOME+RANDOM+BACKUPKEz9+3vnmjb0u@&w68t#5_e8s9-lbfhv-')  


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
import dj_database_url

db_from_env = dj_database_url.config()
DATABASES['default'].update(db_from_env)
DATABASES['default']['CONN_MAX_AGE'] = 500


## Channels Specific
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],
        },
        "symmetric_encryption_keys": [SECRET_KEY],
    },
}
ASGI_APPLICATION = 'CollaborativeEditor.routing.application'
