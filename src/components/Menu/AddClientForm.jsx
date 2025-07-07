import React, { useState, useEffect } from 'react';

const AddClientForm = ({ onClose, onSave, initialData, isEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    comments: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ background: '#f8e1f8', border: '2px solid #d8a7d8', borderRadius: 10, width: 300, padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <h3 style={{ color: '#800080', margin: 0 }}>{isEdit ? 'Edit Client' : 'Add Client'}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: '#800080', cursor: 'pointer' }}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ color: '#333', display: 'block', marginBottom: 5 }}>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: 5, marginBottom: 10, border: '1px solid #d8a7d8', borderRadius: 5 }} required />
          </div>
          <div>
            <label style={{ color: '#333', display: 'block', marginBottom: 5 }}>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: 5, marginBottom: 10, border: '1px solid #d8a7d8', borderRadius: 5 }} />
          </div>
          <div>
            <label style={{ color: '#333', display: 'block', marginBottom: 5 }}>Gender:</label>
            <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
          </div>
          <div>
            <label style={{ color: '#333', display: 'block', marginBottom: 5 }}>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: 5, marginBottom: 10, border: '1px solid #d8a7d8', borderRadius: 5 }} required />
          </div>
          <div>
            <label style={{ color: '#333', display: 'block', marginBottom: 5 }}>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: 5, marginBottom: 10, border: '1px solid #d8a7d8', borderRadius: 5 }} required />
          </div>
          <div>
            <label style={{ color: '#333', display: 'block', marginBottom: 5 }}>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: 5, marginBottom: 10, border: '1px solid #d8a7d8', borderRadius: 5 }} />
          </div>
          <div>
            <label style={{ color: '#333', display: 'block', marginBottom: 5 }}>Comments:</label>
            <input type="text" name="comments" value={formData.comments} onChange={handleChange} style={{ width: '100%', padding: 5, marginBottom: 10, border: '1px solid #d8a7d8', borderRadius: 5 }} />
          </div>
          <button type="submit" style={{ width: '100%', background: '#800080', color: '#fff', padding: 10, border: 'none', borderRadius: 5, cursor: 'pointer' }}>
            {isEdit ? 'Save' : 'Add Client'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClientForm;