import os
import django
from django.contrib.auth import get_user_model

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

User = get_user_model()

def fix_admin():
    try:
        # Try to find the user with username 'admin'
        user = User.objects.get(username='admin')
        user.username = 'admin@example.com' # Change username to match the email
        user.save()
        print("Updated superuser: username is now 'admin@example.com'")
    except User.DoesNotExist:
        print("User 'admin' not found. Checking if 'admin@example.com' exists...")
        if User.objects.filter(username='admin@example.com').exists():
            print("Superuser user 'admin@example.com' already exists correctly.")
        else:
             print("Creating new superuser 'admin@example.com'...")
             User.objects.create_superuser('admin@example.com', 'admin@example.com', 'password123')
             print("Created superuser 'admin@example.com'")

if __name__ == '__main__':
    fix_admin()
