import React, { useState } from 'react';
import '../../css/MenuCss/EstiloCliente.css';
import AddClientForm from './AddClientForm';

const mockClientes = [
  { id: '1', name: 'Juan Pérez', age: '', gender: '', email: 'juan@mail.com', phone: '0999999999', address: '', comments: '' },
  { id: '2', name: 'Ana López', age: '', gender: '', email: 'ana@mail.com', phone: '0988888888', address: '', comments: '' },
];

const initialCliente = { name: '', age: '', gender: '', email: '', phone: '', address: '', comments: '' };

const MCliente = ({ cargarContenido }) => {
  const [clientes, setClientes] = useState(mockClientes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setEditIndex(null);
  };

  const handleSaveCliente = (formData) => {
    if (editIndex !== null) {
      const updatedClientes = [...clientes];
      updatedClientes[editIndex] = { ...formData, id: clientes[editIndex].id };
      setClientes(updatedClientes);
    } else {
      setClientes([...clientes, { ...formData, id: Date.now().toString() }]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    openAddModal();
  };

  const handleDelete = (index) => {
    const updatedClientes = clientes.filter((_, i) => i !== index);
    setClientes(updatedClientes);
  };

  const handleAddClienteClick = () => {
    if (typeof cargarContenido === 'function') {
      cargarContenido('aggClientes');
    } else {
      openAddModal();
    }
  };

  return (
    <div className="cliente-container" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ textAlign: 'right', marginRight: 30 }}>
          <div>Nombre del Negocio</div>
          <div>Categoria del negocio</div>
        </div>
        <div style={{ border: '2px solid #d8b4e2', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3e5f5', marginLeft: 10 }}>
          <span style={{ fontSize: 40 }}>👤</span>
        </div>
      </div>
      <div className="cliente-box" style={{ border: '2px solid #d33fff', borderRadius: 12, background: '#fff', padding: '15px 25px', marginTop: 20 }}>
        <h2 style={{ textAlign: 'center', fontWeight: 700, color: '#6a1b9a', margin: 0, marginBottom: 10, fontSize: 22, letterSpacing: 1 }}>Lista de Clientes</h2>
        <button className="add-cliente-button" onClick={handleAddClienteClick} style={{ float: 'right', marginBottom: 10, background: '#d8b4e2', color: '#6a1b9a', fontWeight: 700, fontSize: 16, border: '2px solid #d33fff', borderRadius: 20, padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, marginRight: 5 }}>＋</span> Agregar Clientes
        </button>
        <table className="cliente-table" style={{ border: '2px solid #d33fff', borderRadius: 10, width: '100%', marginTop: 30 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, index) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button className="edit-button" style={{ fontSize: 28, color: '#3b82f6', background: 'none', border: 'none', marginRight: 8 }} onClick={() => handleEdit(index)}>
                    <span role="img" aria-label="editar">🖊️</span>
                  </button>
                  <button className="delete-button" style={{ fontSize: 28, color: '#6a1b9a', background: 'none', border: 'none' }} onClick={() => handleDelete(index)}>
                    <span role="img" aria-label="eliminar">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
            {Array.from({ length: 6 - clientes.length }).map((_, i) => (
              <tr key={'empty-' + i}>
                <td style={{ height: 40 }}></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <AddClientForm
          onClose={closeAddModal}
          onSave={handleSaveCliente}
          initialData={editIndex !== null ? clientes[editIndex] : null}
          isEdit={editIndex !== null}
        />
      )}
    </div>
  );
};

export default MCliente;