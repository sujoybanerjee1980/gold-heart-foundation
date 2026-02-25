# Frontend Documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

### Components
- **Layout**: Main layout with sidebar and header
- **StatCard**: Statistics card component
- **Table**: Reusable table component
- **Form**: Dynamic form component with validation

### Pages
- **Dashboard**: Main dashboard with statistics
- **Inventory**: Product management
- **Sales**: Sales recording and management
- **Reports**: Report generation and viewing
- **Settings**: Application settings

### Services
- **api.ts**: API service for backend communication

### Types
- **index.ts**: TypeScript type definitions

## API Integration

The API service (`src/services/api.ts`) handles all backend communication:

```typescript
import apiService from '@/services/api';

// Get products
const products = await apiService.getProducts();

// Create product
const product = await apiService.createProduct({
  name: 'Product Name',
  category: 'Category',
  quantity: 100,
  price: 25.50,
  description: 'Description'
});

// Get sales
const sales = await apiService.getSales();

// Create sale
const sale = await apiService.createSale({
  productId: 1,
  quantity: 10,
  totalPrice: 250,
  saleDate: '2026-02-25',
  notes: 'Notes'
});

// Generate report
const report = await apiService.generateReport('sales');

// Get dashboard stats
const stats = await apiService.getDashboardStats();
```

## Component Usage

### StatCard
```tsx
<StatCard 
  title="Total Products" 
  value={100} 
  icon="📦" 
  color="#3b82f6" 
/>
```

### Table
```tsx
<Table
  columns={[
    { key: 'name', label: 'Product Name' },
    { key: 'price', label: 'Price' }
  ]}
  data={products}
  actions={(row) => (
    <button onClick={() => handleDelete(row.id)}>Delete</button>
  )}
/>
```

### Form
```tsx
<Form
  fields={[
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true }
  ]}
  onSubmit={(data) => handleSubmit(data)}
  submitLabel="Create"
/>
```

## Styling

The application uses CSS for styling. Main styles are in:
- `src/App.css`: Component styles
- `src/index.css`: Global styles

Modify these files to customize appearance.

## Environment Variables

Create `.env` file in frontend directory:
```
NODE_ENV=development
REACT_APP_API_URL=http://localhost:8000/api
```

## Development

### Adding a New Page
1. Create file in `src/pages/`
2. Import in `src/App.tsx`
3. Add route in App.tsx

### Adding a New Component
1. Create file in `src/components/`
2. Export component
3. Import and use in pages

### Adding API Methods
1. Add method to `src/services/api.ts`
2. Use in components with `apiService.methodName()`

## Type Definitions

TypeScript types are defined in `src/types/index.ts`. Add new types here:

```typescript
export interface Product {
  id: number;
  name: string;
  // ... other properties
}
```

## Troubleshooting

### API Connection Issues
- Check `REACT_APP_API_URL` in `.env`
- Verify backend is running
- Check browser Network tab

### Build Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache

### TypeScript Errors
- Check type definitions in `src/types/`
- Ensure all imports are correct
- Verify component prop types
