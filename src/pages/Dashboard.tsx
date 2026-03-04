import { Link, useSearchParams } from 'react-router-dom';
import { useApps } from '@/context/AppContext';
import { AppCard } from '@/components/AppCard';
import { Button } from '@/components/ui/Button';
import { CATEGORIES } from '@/types';
import { cn } from '@/lib/utils';

export default function Dashboard({ isAdmin = false }: { isAdmin?: boolean }) {
  const { apps, deleteApp, isLoading } = useApps();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const filteredApps = currentCategory
    ? apps.filter((app) => app.category === currentCategory)
    : apps;

  const handleCategoryClick = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {isAdmin ? 'Quản lý ứng dụng (Admin)' : 'Cửa hàng ứng dụng của tôi'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {isAdmin ? 'Thêm, sửa hoặc xóa các ứng dụng trong hệ thống.' : 'Quản lý và truy cập các công cụ AI bạn sở hữu.'}
          </p>
        </div>
        {isAdmin && (
          <Link to="/admin/add">
            <Button className="gap-2">
              <span className="material-icons">add</span>
              Thêm ứng dụng mới
            </Button>
          </Link>
        )}
      </header>

      <div className="flex flex-wrap gap-2 pb-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            !currentCategory
              ? "bg-orange-500 text-white shadow-md shadow-orange-200"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700"
          )}
        >
          Tất cả
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryClick(cat.label)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              currentCategory === cat.label
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} onDelete={deleteApp} isAdmin={isAdmin} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <span className="material-icons text-6xl mb-4 opacity-20">search_off</span>
          <p className="text-lg font-medium">Không tìm thấy ứng dụng nào trong danh mục này.</p>
          <Button variant="ghost" onClick={() => handleCategoryClick(null)} className="mt-2">
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  );
}
