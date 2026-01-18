from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Add custom fields here if needed in the future
    # For now, we stick to the default AbstractUser fields but have the flexibility to extend.
    pass
