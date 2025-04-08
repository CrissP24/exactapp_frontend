import React from 'react';
import styles from '../../css/ch_ventas/VentaForm.module.css';

const VentaForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agregar Nueva Venta</h1>
      
      <div className={styles.section}>
        <div className={styles.inputGroup}>
          <label>Número de factura</label>
          <input 
            type="text" 
            value="00050"
            className={styles.inputField}
            readOnly
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Fecha</label>
          <input
            type="text"
            value="13 - 09 - 24"
            className={styles.inputField}
            readOnly
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Nombre del Cliente</label>
          <input
            type="text"
            className={styles.inputField}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2>Categorías</h2>
        <table className={styles.categoryTable}>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Categoría</th>
              <th>Categoría</th>
              <th>Electronica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Items</td>
              <td>Items</td>
              <td>Items</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2>Productos</h2>
        {/* Aquí iría el contenido de productos */}
      </div>
    </div>
  );
};

export default VentaForm;