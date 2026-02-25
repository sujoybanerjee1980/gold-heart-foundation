import React, { useState, useEffect } from 'react';
import Table from '@/components/Table';
import Form from '@/components/Form';
import apiService from '@/services/api';
import { Sale, Product } from '@/types/index';

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salesData, productsData] = await Promise.all([
        apiService.getSales(),
        apiService.getProducts(),
      ]);
      setSales(salesData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      await apiService.createSale({
        ...formData,
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
        totalPrice: parseFloat(formData.totalPrice),
      });
      setShowForm(false);
      await fetchData();
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await apiService.deleteSale(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting sale:', error);
      }
    }
  };

  const formFields = [
    {
      name: 'productId',
      label: 'Product',
      type: 'select' as const,
      required: true,
      options: products.map((p) => ({ value: p.id.toString(), label: p.name })),
    },
    { name: 'quantity', label: 'Quantity', type: 'number' as const, required: true },
    { name: 'totalPrice', label: 'Total Price', type: 'number' as const, required: true },
    { name: 'saleDate', label: 'Sale Date', type: 'text' as const, required: true, placeholder: 'YYYY-MM-DD' },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1f2937' }}>Sales Management</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ New Sale'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>Record New Sale</h2>
          <Form fields={formFields} onSubmit={handleSubmit} submitLabel="Record Sale" />
        </div>
      )}

      {loading ? (
        <div>Loading sales...</div>
      ) : (
        <div className="card">
          <Table
            columns={[
              { key: 'id', label: 'Sale ID' },
              { key: 'productId', label: 'Product ID' },
              { key: 'quantity', label: 'Quantity' },
              { key: 'totalPrice', label: 'Total Price' },
              { key: 'saleDate', label: 'Sale Date' },
              { key: 'notes', label: 'Notes' },
            ]}
            data={sales}
            actions={(sale) => (
              <button
                className="btn btn-secondary"
                onClick={() => handleDelete(sale.id)}
                style={{ padding: '5px 10px', fontSize: '12px', background: '#fee2e2', color: '#991b1b' }}
              >
                Delete
              </button>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Sales;
