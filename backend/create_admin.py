import os
import django
from django.contrib.auth import get_user_model

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

User = get_user_model()

def create_superuser():
    username = 'admin'
    email = 'admin@example.com'
    password = 'password123'
    
    if not User.objects.filter(username=username).exists():
        print(f"Creating superuser '{username}'...")
        try:
            User.objects.create_superuser(username, email, password)
            print(f"Superuser created successfully.")
            print(f"Username: {username}")
            print(f"Email: {email}")
            print(f"Password: {password}")
        except Exception as e:
            print(f"Error creating superuser: {e}")
    else:
        print(f"Superuser '{username}' already exists.")

if __name__ == '__main__':
    create_superuser()
