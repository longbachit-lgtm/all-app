import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApps } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export default function AppDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApp } = useApps();
  const app = getApp(id || '');

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy ứng dụng</h2>
        <Button onClick={() => navigate('/')}>Quay lại Trang chủ</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors"
        >
          <span className="material-icons text-lg">arrow_back</span>
          Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-5/12">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative shadow-inner group">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent pointer-events-none"></div>
              <img
                alt={app.name}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                src={app.thumbnailUrl}
              />
            </div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Link
                to={`/?category=${encodeURIComponent(app.category)}`}
                className="px-3 py-1 rounded-md bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold border border-orange-100 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
              >
                {app.category}
              </Link>
              {app.isOwned && (
                <span className="px-3 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold border border-green-100 dark:border-green-800 flex items-center gap-1">
                  <span className="material-icons text-[14px]">check_circle</span>
                  Đã sở hữu
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
              {app.name}
            </h1>

            <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 space-y-2">
              <p>{app.description}</p>
            </div>

            <div className="mt-auto">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-4 flex flex-wrap gap-y-3 gap-x-8">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons text-[18px]">calendar_today</span>
                  <span>Ngày mua: {app.purchaseDate}</span>
                </div>
                <div className="w-px h-5 bg-slate-200 dark:border-slate-700 hidden sm:block"></div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons text-[18px]">verified_user</span>
                  <span>Bản quyền: {app.licenseType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-700 mx-6 md:mx-8" />

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-slate-100">
              <span className="material-icons text-orange-500">open_in_new</span>
              <h3 className="font-bold text-lg">Truy cập ứng dụng</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Nhấp vào nút bên dưới để mở ứng dụng trong tab mới. Hệ thống sẽ tự động đăng nhập vào tài khoản Premium của bạn.
            </p>
            <a
              href={app.accessLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full py-4 h-auto text-base font-bold uppercase tracking-wide shadow-lg shadow-orange-500/30">
                Truy cập liên kết ứng dụng
                <span className="material-icons ml-2">login</span>
              </Button>
            </a>
          </div>

          <div>
            <div className="h-full border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-800/30">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                Hướng dẫn sử dụng
              </h3>
              <div className="text-sm text-slate-500 dark:text-slate-400 space-y-4">
                <p>
                  Hiện tại không có hướng dẫn chi tiết cho ứng dụng này. Vui lòng liên hệ bộ phận hỗ trợ nếu bạn cần giúp đỡ.
                </p>
                <div className="flex items-center gap-2 text-orange-500 cursor-pointer hover:underline text-xs font-medium">
                  <span className="material-icons text-[16px]">help_outline</span>
                  Liên hệ Hỗ trợ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
