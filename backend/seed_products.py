import os
import django
import shutil
from django.core.files import File

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from products.models import Product

def seed_products():
    # Source directory for images (Local within backend for deployment)
    frontend_assets_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'seed_images')
    
    products_data = [
        {
            "id": 1,
            "image_filename": "7.jpg",
            "name": "Lenovo",
            "price": 29.99,
        },
        {
            "id": 2,
            "image_filename": "6.jpg",
            "name": "Asus",
            "price": 39.99,
        },
        {
            "id": 3,
            "image_filename": "5.jpg",
            "name": "Casual shoe",
            "price": 19.99,
        },
        {
            "id": 4,
            "image_filename": "4.jpg",
            "name": "HeadPhones",
            "price": 49.99,
        },
        {
            "id": 5,
            "image_filename": "3.jpg",
            "name": "Laptop",
            "price": 39.99,
        },
        {
            "id": 6,
            "image_filename": "2.jpg",
            "name": "SmartWatch",
            "price": 49.99,
        },
        {
            "id": 7,
            "image_filename": "1.jpg",
            "name": "SmartPhone",
            "price": 59.99,
        },
        {
            "id": 8,
            "image_filename": "8.jpg",
            "name": "Jacket",
            "price": 39.99,
            "description": "The seamless blend of patterns and textures"
        },
        {
            "id": 9,
            "image_filename": "9.jpg",
            "name": "Arabic Fashion",
            "price": 59.99,
            "description": "Creating a sophisticated ambiance that speaks of luxury and timeless style."
        },
        {
            "id": 10,
            "image_filename": "10.jpg",
            "name": "Co-Ords Set",
            "price": 39.19,
            "description": "Pink Floral Printed Cotton Co-Ords Set featuring a mandarin collar tunic with button closure and comfy palazzo pants. Elegant & breathable."
        },
    ]

    print("Seeding products...")
    Product.objects.all().delete() # Clear existing products

    for item in products_data:
        try:
            image_path = os.path.join(frontend_assets_dir, item['image_filename'])
            if not os.path.exists(image_path):
                print(f"Image not found: {image_path}")
                continue

            product = Product(
                name=item['name'],
                price=item['price'],
                description=item.get('description', '')
            )
            
            # Copy and save image
            with open(image_path, 'rb') as f:
                product.image.save(item['image_filename'], File(f), save=False)
            
            product.save()
            print(f"Created product: {product.name}")

        except Exception as e:
            print(f"Error creating product {item['name']}: {e}")

    print("Seeding complete.")

if __name__ == '__main__':
    seed_products()
