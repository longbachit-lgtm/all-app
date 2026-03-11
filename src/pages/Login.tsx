import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(username, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="material-icons text-white text-3xl">lock</span>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Đăng Nhập</h1>
            <p className="text-slate-500">Vui lòng nhập thông tin để truy cập quản trị</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                Tên đăng nhập
              </label>
              <div className="relative group">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                Mật khẩu
              </label>
              <div className="relative group">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  vpn_key
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-shake">
                <span className="material-icons text-red-500 text-sm">error</span>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <span>Đăng Nhập</span>
                  <span className="material-icons text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400">
              © 2024 Admin Panel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
