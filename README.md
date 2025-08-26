# Receipt Generator

A simple and customizable receipt generator that creates professional-looking receipts for businesses, freelancers, and personal use. Generate receipts in multiple formats with ease.

## Features

- **Multiple Output Formats**: Generate receipts as PDF, HTML, or plain text
- **Customizable Templates**: Choose from various receipt layouts and styles
- **Business Information**: Add your company logo, contact details, and branding
- **Item Management**: Add multiple items with descriptions, quantities, and prices
- **Tax Calculations**: Automatic tax computation with configurable rates
- **Currency Support**: Support for multiple currencies and formatting
- **Receipt Numbering**: Automatic sequential receipt numbering
- **Date/Time Stamps**: Automatic timestamping of receipts
- **Customer Information**: Optional customer details and billing information

## Installation

### Prerequisites

- Python 3.7 or higher
- pip package manager

### Install Dependencies

```bash
# Clone the repository
git clone https://github.com/yourusername/receipt-generator.git
cd receipt-generator

# Install required packages
pip install -r requirements.txt
```

### Required Python Packages

```
reportlab>=3.6.0
jinja2>=3.0.0
python-dateutil>=2.8.0
pillow>=8.0.0
```

## Quick Start

### Basic Usage

```python
from receipt_generator import ReceiptGenerator

# Initialize the generator
generator = ReceiptGenerator()

# Set business information
generator.set_business_info(
    name="Your Business Name",
    address="123 Main St, City, State 12345",
    phone="(555) 123-4567",
    email="contact@yourbusiness.com"
)

# Add items
generator.add_item("Product 1", quantity=2, price=19.99)
generator.add_item("Product 2", quantity=1, price=35.50)

# Set tax rate (optional)
generator.set_tax_rate(0.08)  # 8% tax

# Generate receipt
receipt = generator.generate_pdf("receipt_001.pdf")
print("Receipt generated successfully!")
```

### Command Line Usage

```bash
# Generate a receipt from command line
python receipt_generator.py --business "My Store" --items "Coffee,2,4.99" "Sandwich,1,8.50" --tax 0.075 --output receipt.pdf

# Use a configuration file
python receipt_generator.py --config my_receipt_config.json
```

## Configuration

### JSON Configuration Example

```json
{
  "business": {
    "name": "Coffee Shop",
    "address": "456 Oak Ave, Downtown, ST 67890",
    "phone": "(555) 987-6543",
    "email": "orders@coffeeshop.com",
    "logo": "logo.png"
  },
  "receipt": {
    "number": "RCP-001",
    "currency": "USD",
    "tax_rate": 0.0875,
    "template": "modern"
  },
  "items": [
    {
      "description": "Espresso",
      "quantity": 2,
      "price": 3.50
    },
    {
      "description": "Croissant",
      "quantity": 1,
      "price": 4.25
    }
  ],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## API Reference

### ReceiptGenerator Class

#### Methods

- `set_business_info(name, address, phone, email, logo=None)`: Set business details
- `add_item(description, quantity, price, tax_exempt=False)`: Add an item to the receipt
- `set_customer_info(name, email=None, address=None)`: Set customer information
- `set_tax_rate(rate)`: Set the tax rate (as decimal, e.g., 0.08 for 8%)
- `set_currency(currency_code)`: Set currency (USD, EUR, GBP, etc.)
- `generate_pdf(filename)`: Generate PDF receipt
- `generate_html(filename)`: Generate HTML receipt
- `generate_text()`: Generate plain text receipt
- `clear_items()`: Clear all items from the receipt

### Templates

Available templates:
- `classic`: Traditional receipt layout
- `modern`: Clean, contemporary design
- `minimal`: Simple, no-frills format
- `detailed`: Comprehensive layout with extra fields

## Examples

### Generate Receipt with Customer Info

```python
from receipt_generator import ReceiptGenerator

generator = ReceiptGenerator()

# Business setup
generator.set_business_info(
    name="Tech Repair Shop",
    address="789 Tech Street, Silicon Valley, CA 94000",
    phone="(555) 246-8135",
    email="service@techrepair.com",
    logo="shop_logo.png"
)

# Customer information
generator.set_customer_info(
    name="Alice Johnson",
    email="alice@email.com",
    address="321 Home Ave, Hometown, CA 90210"
)

# Services provided
generator.add_item("Screen Repair", 1, 89.99)
generator.add_item("Battery Replacement", 1, 49.99)
generator.add_item("Labor", 2, 25.00)

# Configure receipt
generator.set_tax_rate(0.095)  # 9.5% tax
generator.set_currency("USD")

# Generate with custom template
receipt = generator.generate_pdf("repair_receipt.pdf", template="detailed")
```

### Bulk Receipt Generation

```python
import json
from receipt_generator import ReceiptGenerator

# Load multiple receipt configurations
with open('bulk_receipts.json', 'r') as file:
    receipts_data = json.load(file)

generator = ReceiptGenerator()

for i, receipt_data in enumerate(receipts_data):
    generator.load_config(receipt_data)
    generator.generate_pdf(f"receipt_{i+1:03d}.pdf")
    generator.clear_items()
```

## Customization

### Custom Templates

Create custom templates by modifying the HTML/CSS templates in the `templates/` directory:

```html
<!-- templates/my_custom_template.html -->
<!DOCTYPE html>
<html>
<head>
    <style>
        /* Your custom CSS styles */
        .receipt { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="receipt">
        <!-- Your custom receipt layout -->
    </div>
</body>
</html>
```

### Adding Custom Fields

```python
# Extend the generator with custom fields
generator.add_custom_field("Order ID", "ORD-12345")
generator.add_custom_field("Cashier", "Jane Smith")
generator.add_custom_field("Payment Method", "Credit Card")
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite:

```bash
# Run all tests
python -m pytest tests/

# Run specific test file
python -m pytest tests/test_receipt_generation.py

# Run with coverage
python -m pytest --cov=receipt_generator tests/
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### Version 1.2.0 (2024-08-26)
- Added support for custom templates
- Improved PDF generation performance
- Added bulk receipt generation
- Enhanced currency formatting

### Version 1.1.0 (2024-07-15)
- Added HTML output format
- Customer information support
- Configuration file support
- Bug fixes and improvements

### Version 1.0.0 (2024-06-01)
- Initial release
- Basic PDF receipt generation
- Tax calculation
- Command line interface

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/receipt-generator/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/receipt-generator/wiki)
- **Email**: support@receiptgen.com

## Acknowledgments

- Thanks to the ReportLab team for the excellent PDF library
- Jinja2 templating engine for flexible template rendering
- All contributors who helped improve this project
