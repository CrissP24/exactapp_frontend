import React, { useState } from 'react';
import '../../css/MenuCss/EstiloCompra.css';

const ComprasM = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [date, setDate] = useState('');
    const [provider, setProvider] = useState('');
    const [items, setItems] = useState([]);
    const [subTotal, setSubTotal] = useState('');
    const [discount, setDiscount] = useState('');
    const [iva, setIva] = useState('');
    const [total, setTotal] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const addItem = () => {
        setItems([...items, { quantity: '', product: '', total: '' }]);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#fff', padding: 0 }}>
            {/* Header avatar y datos */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 30px 0 30px' }}>
                <div style={{ textAlign: 'right', marginRight: 30 }}>
                    <div style={{ fontWeight: 600, color: '#6a1b9a', fontSize: 16 }}>Nombre del Negocio</div>
                    <div style={{ color: '#6a1b9a', fontSize: 14 }}>Categoría del negocio</div>
                </div>
                <div style={{ background: '#f3e5f5', border: '2px solid #d8b4e2', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }}>
                    <span style={{ fontSize: 40 }}>👤</span>
                </div>
            </div>
            {/* Responsive main content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 30,
                    gap: 20,
                }}
                className="compras-main-responsive"
            >
                {/* Panel izquierdo (carrito de compras) */}
                <div
                    className="compras-panel-left"
                    style={{
                        width: '60%',
                        border: '2px solid #d33fff',
                        borderRadius: 12,
                        background: '#fff',
                        padding: 20,
                        minWidth: 280,
                        maxWidth: 700,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <button style={{ background: 'none', border: 'none', fontSize: 28, color: '#6a1b9a', marginRight: 10, cursor: 'pointer' }}>&larr;</button>
                            <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0, letterSpacing: 2, fontFamily: 'monospace' }}>Carrito de Compras</h2>
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                            <input type="text" placeholder="Número de la Factura" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            <input type="text" placeholder="Fecha" value={date} onChange={e => setDate(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <input type="text" placeholder="Nombre del Proveedor" value={provider} onChange={e => setProvider(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            <button style={{ background: '#d33fff', color: '#fff', border: 'none', borderRadius: 8, fontSize: 24, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }} onClick={addItem}>＋</button>
                        </div>
                        <div style={{ display: 'flex', gap: 10, fontWeight: 700, color: '#6a1b9a', marginBottom: 6 }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>Cantidad</div>
                            <div style={{ flex: 2, textAlign: 'center' }}>Producto</div>
                            <div style={{ flex: 1, textAlign: 'center' }}>Total</div>
                        </div>
                        <div style={{ maxHeight: 120, overflowY: 'auto', marginBottom: 10 }}>
                            {items.map((item, index) => (
                                <div key={index} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                                    <input type="number" placeholder="Cantidad" value={item.quantity} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                                    <input type="text" placeholder="Producto" value={item.product} style={{ flex: 2, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                                    <input type="number" placeholder="Total" value={item.total} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Sub Total</div>
                                <input type="number" placeholder="" value={subTotal} onChange={e => setSubTotal(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Descuento</div>
                                <input type="number" placeholder="" value={discount} onChange={e => setDiscount(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Iva</div>
                                <input type="number" placeholder="" value={iva} onChange={e => setIva(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Total</div>
                                <input type="number" placeholder="" value={total} onChange={e => setTotal(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 0, marginTop: 10 }}>
                        <button style={{ flex: 1, background: '#ff2d55', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: '8px 0 0 8px', padding: '10px 0', letterSpacing: 1 }}>EXTRAER XML</button>
                        <button style={{ flex: 1, background: '#6a1b9a', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: '0 8px 8px 0', padding: '10px 0', letterSpacing: 1 }}>FORMA DE PAGO</button>
                    </div>
                </div>
                {/* Panel derecho (total y pago) */}
                <div
                    className="compras-panel-right"
                    style={{
                        width: '38%',
                        border: '2px solid #d33fff',
                        borderRadius: 12,
                        background: '#f8eaff',
                        padding: 20,
                        position: 'relative',
                        minWidth: 280,
                        maxWidth: 500,
                        marginBottom: 20,
                    }}
                >
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: '#6a1b9a', marginBottom: 8 }}>Total a pagar</div>
                        <input type="text" value={`$${(total || '0000000.00')}`} readOnly style={{ width: '100%', border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff', fontWeight: 700, fontSize: 18, color: '#6a1b9a' }} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#6a1b9a', marginBottom: 8 }}>Seleccione el metodo de pago</div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <button style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 8, background: '#fff', color: '#6a1b9a', fontWeight: 700, fontSize: 16, padding: '10px 0', letterSpacing: 1, minWidth: 120 }}>TARJETA $$$$$$</button>
                            <button style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 8, background: '#fff', color: '#6a1b9a', fontWeight: 700, fontSize: 16, padding: '10px 0', letterSpacing: 1, minWidth: 120 }}>EFECTIVO $$$$$$</button>
                            <button style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 8, background: '#fff', color: '#6a1b9a', fontWeight: 700, fontSize: 16, padding: '10px 0', letterSpacing: 1, minWidth: 120 }}>TRANSFERENCIA $$$$$$</button>
                        </div>
                    </div>
                    <button style={{ width: '60%', background: '#d33fff', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 20, padding: '10px 0', margin: '30px auto 0 auto', letterSpacing: 1, display: 'block' }}>Guardar Compra</button>
                </div>
            </div>
            {/* Responsive styles */}
            <style>{`
                @media (max-width: 900px) {
                    .compras-main-responsive {
                        flex-direction: column !important;
                        gap: 0 !important;
                        padding: 10px !important;
                    }
                    .compras-panel-right {
                        width: 100% !important;
                        max-width: 100% !important;
                        margin-bottom: 20px !important;
                        order: 1;
                    }
                    .compras-panel-left {
                        width: 100% !important;
                        max-width: 100% !important;
                        order: 2;
                    }
                    .compras-panel-right input,
                    .compras-panel-left input {
                        font-size: 15px !important;
                    }
                }
                @media (max-width: 600px) {
                    .compras-main-responsive {
                        padding: 2px !important;
                    }
                    .compras-panel-right, .compras-panel-left {
                        padding: 10px !important;
                    }
                }
                @media (max-width: 600px) {
                    .compras-main-responsive {
                        flex-direction: column !important;
                    }
                    .compras-panel-right {
                        margin-bottom: 10px !important;
                    }
                }
                @media (max-width: 600px) {
                    .compras-main-responsive {
                        padding: 0 !important;
                    }
                }
                @media (max-width: 700px) {
                    .compras-main-responsive {
                        flex-direction: column !important;
                        gap: 0 !important;
                    }
                    .compras-panel-right, .compras-panel-left {
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 8px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ComprasM;