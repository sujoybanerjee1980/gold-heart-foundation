import React, { useState, useEffect } from 'react';
import Table from '@/components/Table';
import apiService from '@/services/api';
import { Report } from '@/types/index';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('sales');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await apiService.getReports();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      await apiService.generateReport(reportType);
      await fetchReports();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: '#1f2937' }}>Reports</h1>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Generate New Report</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', flex: 1 }}
          >
            <option value="sales">Sales Report</option>
            <option value="inventory">Inventory Report</option>
            <option value="revenue">Revenue Report</option>
            <option value="product">Product Report</option>
          </select>
          <button className="btn btn-primary" onClick={handleGenerateReport}>
            Generate Report
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading reports...</div>
      ) : (
        <div className="card">
          <Table
            columns={[
              { key: 'id', label: 'Report ID' },
              { key: 'title', label: 'Title' },
              { key: 'type', label: 'Type' },
              { key: 'generatedAt', label: 'Generated Date' },
            ]}
            data={reports}
          />
        </div>
      )}
    </div>
  );
};

export default Reports;
