import React, { useState, useEffect } from 'react';
import '../../css/MenuCss/EstiloCompra.css';

const IVA_RATE = 0.15;

const ComprasM = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [date, setDate] = useState('');
    const [provider, setProvider] = useState('');
    const [items, setItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [iva, setIva] = useState(0);
    const [total, setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [success, setSuccess] = useState(false);

    // Al cargar, toma la última venta de localStorage
    useEffect(() => {
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        const lastVenta = ventas.length > 0 ? ventas[ventas.length - 1] : null;
        if (lastVenta) {
            setInvoiceNumber(lastVenta.invoiceNumber || '');
            setDate(lastVenta.date || '');
            setProvider(lastVenta.client || '');
            setItems(lastVenta.products || []);
        }
    }, []);

    // Calcular totales automáticamente
    useEffect(() => {
        const st = items.reduce((acc, item) => acc + (Number(item.cantidad) * Number(item.precio) || 0), 0);
        setSubTotal(st);
        const ivaVal = ((st - discount) > 0 ? (st - discount) * IVA_RATE : 0);
        setIva(ivaVal);
        setTotal(st - discount + ivaVal);
    }, [items, discount]);

    // Editar producto
    const handleItemChange = (idx, field, value) => {
        setItems(items => items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
    };

    // Eliminar producto
    const handleRemoveItem = (idx) => {
        setItems(items => items.filter((_, i) => i !== idx));
    };

    // Guardar compra y simular pago
    const handlePagar = () => {
        if (!provider || items.length === 0 || !paymentMethod) {
            alert('Completa todos los campos y selecciona un método de pago.');
            return;
        }
        setSuccess(true);
        // Limpiar después de un tiempo
        setTimeout(() => {
            setInvoiceNumber('');
            setDate('');
            setProvider('');
            setItems([]);
            setSubTotal(0);
            setDiscount(0);
            setIva(0);
            setTotal(0);
            setPaymentMethod('');
            setSuccess(false);
        }, 2000);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#fff', padding: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 30px 0 30px' }}>
                <div style={{ textAlign: 'right', marginRight: 30 }}>
                    <div style={{ fontWeight: 600, color: '#6a1b9a', fontSize: 16 }}>Nombre del Negocio</div>
                    <div style={{ color: '#6a1b9a', fontSize: 14 }}>Categoría del negocio</div>
                </div>
                <div style={{ background: '#f3e5f5', border: '2px solid #d8b4e2', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }}>
                    <span style={{ fontSize: 40 }}>👤</span>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 30, gap: 20 }} className="compras-main-responsive">
                {/* Panel izquierdo (carrito de compras) */}
                <div className="compras-panel-left" style={{ width: '60%', border: '2px solid #d33fff', borderRadius: 12, background: '#fff', padding: 20, minWidth: 280, maxWidth: 700, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0, letterSpacing: 2, fontFamily: 'monospace' }}>Carrito de Compras</h2>
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                            <input type="text" placeholder="Número de la Factura" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            <input type="text" placeholder="Fecha" value={date} onChange={e => setDate(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <input type="text" placeholder="Nombre del Cliente" value={provider} onChange={e => setProvider(e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 10, fontWeight: 700, color: '#6a1b9a', marginBottom: 6 }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>Cantidad</div>
                            <div style={{ flex: 2, textAlign: 'center' }}>Producto</div>
                            <div style={{ flex: 1, textAlign: 'center' }}>Precio</div>
                            <div style={{ flex: 1, textAlign: 'center' }}>Total</div>
                            <div style={{ width: 30 }}></div>
                        </div>
                        <div style={{ maxHeight: 120, overflowY: 'auto', marginBottom: 10 }}>
                            {items.map((item, index) => (
                                <div key={index} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                                    <input type="number" placeholder="Cantidad" value={item.cantidad} onChange={e => handleItemChange(index, 'cantidad', e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                                    <input type="text" placeholder="Producto" value={item.nombre} onChange={e => handleItemChange(index, 'nombre', e.target.value)} style={{ flex: 2, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                                    <input type="number" placeholder="Precio" value={item.precio} onChange={e => handleItemChange(index, 'precio', e.target.value)} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                                    <input type="number" placeholder="Total" value={Number(item.cantidad) * Number(item.precio) || 0} readOnly style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                                    <button onClick={() => handleRemoveItem(index)} style={{ background: '#ff2d55', color: '#fff', border: 'none', borderRadius: 6, width: 30, height: 30, fontWeight: 700, cursor: 'pointer' }}>×</button>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Sub Total</div>
                                <input type="number" placeholder="" value={subTotal} readOnly style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Descuento</div>
                                <input type="number" placeholder="" value={discount} onChange={e => setDiscount(Number(e.target.value))} style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Iva</div>
                                <input type="number" placeholder="" value={iva.toFixed(2)} readOnly style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: 1, color: '#6a1b9a' }}>Total</div>
                                <input type="number" placeholder="" value={total.toFixed(2)} readOnly style={{ flex: 1, border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff' }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Panel derecho (total y pago) */}
                <div className="compras-panel-right" style={{ width: '38%', border: '2px solid #d33fff', borderRadius: 12, background: '#f8eaff', padding: 20, position: 'relative', minWidth: 280, maxWidth: 500, marginBottom: 20 }}>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: '#6a1b9a', marginBottom: 8 }}>Total a pagar</div>
                        <input type="text" value={`$${total.toFixed(2)}`} readOnly style={{ width: '100%', border: '2px solid #d33fff', borderRadius: 6, padding: 8, background: '#fff', fontWeight: 700, fontSize: 18, color: '#6a1b9a' }} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#6a1b9a', marginBottom: 8 }}>Seleccione el método de pago</div>
                        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ width: '100%', border: '2px solid #d33fff', borderRadius: 8, padding: 10, fontWeight: 700, fontSize: 16, color: '#6a1b9a' }}>
                            <option value="">Selecciona un método</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                        </select>
                    </div>
                    <button style={{ width: '60%', background: '#d33fff', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 20, padding: '10px 0', margin: '30px auto 0 auto', letterSpacing: 1, display: 'block' }} onClick={handlePagar}>PAGAR</button>
                    {success && <div style={{ color: 'green', fontWeight: 700, fontSize: 20, textAlign: 'center', marginTop: 20 }}>Pago con éxito</div>}
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