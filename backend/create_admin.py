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

    # Remove any existing users with the same email to prevent duplicates/errors
    User.objects.filter(email=email).exclude(username=username).delete()

    user, created = User.objects.get_or_create(
        username=username,
        defaults={'email': email, 'is_staff': True, 'is_superuser': True}
    )
    
    if created:
        user.set_password(password)
        user.save()
        print(f"Superuser '{username}' created successfully.")
    else:
        # Ensure it has the right email and password even if it existed
        user.email = email
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"Superuser '{username}' already existed, credentials reset.")
    
    print(f"Login details check: {username} / {email} / {password}")

if __name__ == '__main__':
    create_superuser()
