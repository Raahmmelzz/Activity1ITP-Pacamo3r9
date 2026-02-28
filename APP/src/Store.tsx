import React, { useEffect, useState } from 'react';
import type { Product } from './types';
import { productAPI } from './api';
import ManageProducts from './ManageProducts';

const Store: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isManageMode, setIsManageMode] = useState(false);

    const loadProducts = async () => {
        try {
            const res = await productAPI.getProducts();
            setProducts(res.data);
        } catch (err) {
            console.error("Error loading products:", err);
        }
    };

    useEffect(() => { loadProducts(); }, []);

    return (
        <div className="min-h-screen w-full bg-white flex justify-center overflow-x-hidden">
            <div className="w-full max-w-[1200px] px-5 flex flex-col items-center">
                
                {/* Navigation */}
                <nav className="w-full flex justify-between items-center py-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-slate-800">Pacamo's STORE</h1>
                    <button 
                        onClick={() => setIsManageMode(!isManageMode)}
                        className="px-6 py-2 rounded-full border-2 border-slate-800 font-bold hover:bg-slate-800 hover:text-white transition-all"
                    >
                        {isManageMode ? "View Shop" : "Admin Dashboard"}
                    </button>
                </nav>

                {!isManageMode && (
                    <header className="w-full text-center py-16 mt-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                        <h2 className="text-4xl font-bold text-slate-900 mb-3">Pacamo's Goods and Foods</h2>
                        <p className="text-lg text-slate-600">Quality products at a single click.</p>
                    </header>
                )}

                <main className="w-full py-12 flex justify-center">
                    {isManageMode ? (
                        <div className="w-full">
                            <ManageProducts products={products} refresh={loadProducts} />
                        </div>
                    ) : (
                        /* GRID: Forced to 3 columns on desktop, rows flow horizontally */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                            {products.map(p => (
                                <div key={p.productid} className="w-full max-w-[350px] bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col items-center">
                                    <div className="h-44 w-full bg-slate-50 rounded-xl flex items-center justify-center text-6xl mb-5">
                                        📦
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">{p.productname}</h3>
                                        <p className="text-2xl font-black text-green-600 mb-5">${p.price}</p>
                                        <button className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Store;