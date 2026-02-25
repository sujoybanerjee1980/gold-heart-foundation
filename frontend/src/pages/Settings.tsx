import React, { useState } from 'react';
import Form from '@/components/Form';

const Settings: React.FC = () => {
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSubmit = (formData: any) => {
    // Here you would typically send this to your backend
    console.log('Settings updated:', formData);
    localStorage.setItem('appSettings', JSON.stringify(formData));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const settingsFields = [
    { name: 'companyName', label: 'Company Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone', type: 'text' as const },
    { name: 'address', label: 'Address', type: 'textarea' as const },
    {
      name: 'currency',
      label: 'Currency',
      type: 'select' as const,
      options: [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'INR', label: 'Indian Rupee (INR)' },
      ],
    },
    { name: 'timezone', label: 'Timezone', type: 'text' as const },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: '#1f2937' }}>Settings</h1>

      {settingsSaved && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          ✓ Settings saved successfully!
        </div>
      )}

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Application Settings</h2>
        <Form 
          fields={settingsFields} 
          onSubmit={handleSubmit} 
          submitLabel="Save Settings"
        />
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>System Information</h2>
        <ul style={{ listStyle: 'none' }}>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
            <strong>Application Version:</strong> 1.0.0
          </li>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </li>
          <li style={{ padding: '10px 0' }}>
            <strong>API Endpoint:</strong> {process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
