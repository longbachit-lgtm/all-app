import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function UserLayout() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen">
            <nav className="bg-white dark:bg-slate-900 border-b-4 border-black sticky top-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-orange-500 border-2 border-black p-1.5 transform -rotate-3">
                                <span className="material-icons text-white text-xl">bolt</span>
                            </div>
                            <span className="font-black text-xl tracking-tight uppercase">Vibe Creators</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/" className="text-sm font-bold uppercase hover:text-orange-500 transition-colors">Cửa hàng</Link>
                            <Link to="#" className="text-sm font-bold uppercase hover:text-orange-500 transition-colors text-slate-400">Về Vibe Creators</Link>
                            <Link to="#" className="text-sm font-bold uppercase hover:text-orange-500 transition-colors text-slate-400">AI Playground</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-icons">search</span>
                        </button>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <span className="material-icons">{isDark ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                        <Link to="/admin">
                            <button className="bg-orange-500 text-white font-black px-6 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-600 transition-all flex items-center gap-2">
                                <span className="material-icons text-sm">person</span>
                                LOGIN
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className="py-12 border-t-4 border-black bg-white dark:bg-slate-900 mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">© 2026 VIBE CREATORS. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
}
