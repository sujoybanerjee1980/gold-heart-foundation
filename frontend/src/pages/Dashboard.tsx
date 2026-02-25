import React, { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import apiService from '@/services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: '#1f2937' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <StatCard 
          title="Total Products" 
          value={stats?.totalProducts || 0} 
          icon="📦" 
          color="#3b82f6" 
        />
        <StatCard 
          title="Total Sales" 
          value={`$${(stats?.totalSales || 0).toFixed(2)}`} 
          icon="💰" 
          color="#10b981" 
        />
        <StatCard 
          title="Inventory Value" 
          value={`$${(stats?.inventoryValue || 0).toFixed(2)}`} 
          icon="📊" 
          color="#f59e0b" 
        />
        <StatCard 
          title="Recent Sales" 
          value={stats?.recentSalesCount || 0} 
          icon="📈" 
          color="#8b5cf6" 
        />
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Quick Stats</h2>
        <ul style={{ listStyle: 'none' }}>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
            <strong>Low Stock Items:</strong> {stats?.lowStockItems || 0}
          </li>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
            <strong>Total Categories:</strong> {stats?.totalCategories || 0}
          </li>
          <li style={{ padding: '10px 0' }}>
            <strong>Monthly Revenue:</strong> ${(stats?.monthlyRevenue || 0).toFixed(2)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
