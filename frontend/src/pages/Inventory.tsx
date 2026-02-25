import React, { useState, useEffect } from 'react';
import Table from '@/components/Table';
import Form from '@/components/Form';
import apiService from '@/services/api';
import { Product } from '@/types/index';

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (editingId) {
        await apiService.updateProduct(editingId, formData);
        setEditingId(null);
      } else {
        await apiService.createProduct(formData);
      }
      setShowForm(false);
      await fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const formFields = [
    { name: 'name', label: 'Product Name', type: 'text' as const, required: true },
    { name: 'category', label: 'Category', type: 'text' as const, required: true },
    { name: 'quantity', label: 'Quantity', type: 'number' as const, required: true },
    { name: 'price', label: 'Price', type: 'number' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1f2937' }}>Inventory Management</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <Form fields={formFields} onSubmit={handleSubmit} submitLabel={editingId ? 'Update' : 'Create'} />
        </div>
      )}

      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="card">
          <Table
            columns={[
              { key: 'name', label: 'Product Name' },
              { key: 'category', label: 'Category' },
              { key: 'quantity', label: 'Quantity' },
              { key: 'price', label: 'Price' },
              { key: 'description', label: 'Description' },
            ]}
            data={products}
            actions={(product) => (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingId(product.id);
                    setShowForm(true);
                  }}
                  style={{ padding: '5px 10px', fontSize: '12px' }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDelete(product.id)}
                  style={{ padding: '5px 10px', fontSize: '12px', background: '#fee2e2', color: '#991b1b' }}
                >
                  Delete
                </button>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Inventory;
