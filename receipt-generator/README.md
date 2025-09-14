# Receipt Generator

<<<<<<< HEAD
A professional, modern receipt generator built with React, Vite, and Tailwind CSS.
=======
<<<<<<< HEAD
A simple and customizable receipt generator that creates professional-looking receipts for businesses, freelancers, and personal use. Generate receipts in multiple formats with ease.
>>>>>>> 24e49aa (Added Authentication)

## 🚀 Features

- **Lightning Fast** - Built with Vite for instant hot reload
- **Real-time Preview** - See your receipt as you type
- **Professional Design** - Clean, business-ready receipt layouts
- **Export Options** - Download as text file, print directly
- **Responsive** - Works perfectly on desktop, tablet, and mobile
- **Tax Calculations** - Automatic tax and discount calculations
- **Multiple Templates** - Various receipt styles for different businesses
- **Form Validation** - Input validation with helpful error messages
- **Modern Stack** - React 18, Vite, Tailwind CSS

## 🛠️ Quick Start

```bash
# Clone and install
git clone <your-repo>
cd receipt-generator
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview


src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   └── receipt/         # Receipt-specific components
├── context/             # State management
├── hooks/               # Custom React hooks
├── services/            # External services
├── utils/               # Utility functions
└── styles/              # Global styles


🎯 Usage

Store Information - Enter your business details
Receipt Details - Add receipt number and date
Customer Info - Add customer information
Items - Add products/services with quantities and prices
Tax & Discounts - Configure tax rates and discounts
Preview & Download - Review and download your receipt 


Configure the app through environment variables in .env:

VITE_API_URL - Backend API URL
VITE_ENABLE_PDF_EXPORT - Enable/disable PDF export
VITE_ENABLE_TEMPLATES - Enable/disable template selection


📱 Browser Support

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request



This project is licensed under the MIT License.


## 🧪 Step 16: Testing with Vitest

### `vitest.config.js`
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.js'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/context'),
      '@styles': path.resolve(__dirname, './src/styles')
    }
<<<<<<< HEAD
  },
})
=======
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
=======
A professional, modern receipt generator built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Lightning Fast** - Built with Vite for instant hot reload
- **Real-time Preview** - See your receipt as you type
- **Professional Design** - Clean, business-ready receipt layouts
- **Export Options** - Download as text file, print directly
- **Responsive** - Works perfectly on desktop, tablet, and mobile
- **Tax Calculations** - Automatic tax and discount calculations
- **Multiple Templates** - Various receipt styles for different businesses
- **Form Validation** - Input validation with helpful error messages
- **Modern Stack** - React 18, Vite, Tailwind CSS

## 🛠️ Quick Start

```bash
# Clone and install
git clone <your-repo>
cd receipt-generator
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview


src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   └── receipt/         # Receipt-specific components
├── context/             # State management
├── hooks/               # Custom React hooks
├── services/            # External services
├── utils/               # Utility functions
└── styles/              # Global styles


🎯 Usage

Store Information - Enter your business details
Receipt Details - Add receipt number and date
Customer Info - Add customer information
Items - Add products/services with quantities and prices
Tax & Discounts - Configure tax rates and discounts
Preview & Download - Review and download your receipt 


Configure the app through environment variables in .env:

VITE_API_URL - Backend API URL
VITE_ENABLE_PDF_EXPORT - Enable/disable PDF export
VITE_ENABLE_TEMPLATES - Enable/disable template selection


📱 Browser Support

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request



This project is licensed under the MIT License.


## 🧪 Step 16: Testing with Vitest

### `vitest.config.js`
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.js'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/context'),
      '@styles': path.resolve(__dirname, './src/styles')
    }
  },
})
>>>>>>> e6ad0fd (fixed download button and print)
>>>>>>> 24e49aa (Added Authentication)
