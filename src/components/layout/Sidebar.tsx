import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-full md:w-72 flex-shrink-0">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col sticky top-6">
        <div className="flex items-center gap-4 mb-8">
          <img
            alt="User Avatar"
            className="w-12 h-12 rounded-full ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-slate-800 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXml6Q6FbYMFecladk_WxvALVBn0qpUsaDnhTKGHtSxwTNiFL-CW61b66Y1FtO8Hhgp4yjH71cjePOvjJKqUl46gsGOvxhJ03XL7ArKjvcWdxAtOFgBEDjW1RIuaPEDlyIXwPc54uc5NI2Q3HGXDmAZRbsaRxFZf6QqyXwVoIfiXx5xDy0ANMI2ZYA3a4pJpdGf7lz1O1eGx0tRlKBI9TFWBjbRElBPG4_4N6JSB43v83YfEfuyvVRHQrs4K6XBBghy17zHQ2bbcQ"
          />
          <div className="overflow-hidden">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate uppercase tracking-wider text-orange-600">
              Admin
            </h3>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-700 my-2"></div>

        <nav className="flex-1 mt-4 space-y-2">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
            Menu chính
          </p>

          <Link
            to="/admin"
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
              isActive('/admin')
                ? "bg-slate-800 text-white shadow-md dark:bg-orange-500 hover:scale-[1.02]"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            <span className="material-icons text-xl">admin_panel_settings</span>
            <span className="font-medium text-sm">Quản lý Admin</span>
          </Link>

          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
              isActive('/')
                ? "bg-orange-500 text-white shadow-md shadow-orange-200 dark:shadow-none hover:scale-[1.02]"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            <span className="material-icons text-xl">grid_view</span>
            <span className="font-medium text-sm">Ứng dụng của tôi</span>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors text-sm font-medium px-3"
          >
            <span className="material-icons text-lg">arrow_back</span>
            Quay lại Trang chủ
          </Link>
        </div>
      </div>
    </aside>
  );
}
