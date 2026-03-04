import React from 'react';
import { Link } from 'react-router-dom';
import { AppData } from '@/types';
import { Button } from './ui/Button';

interface AppCardProps {
  app: AppData;
  onDelete: (id: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg dark:hover:bg-slate-800 transition-all duration-300 flex flex-col group overflow-hidden relative">
      <div className="relative h-48 bg-gradient-to-br from-orange-400 to-orange-600 p-4 flex items-center justify-center overflow-hidden">
        {app.isOwned && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1 z-10">
            <span className="material-icons text-[12px]">check_circle</span> Đã sở hữu
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link to={`/edit/${app.id}`}>
            <button className="p-2 bg-white/90 dark:bg-black/50 rounded-full hover:bg-white text-slate-700 hover:text-orange-500 transition-colors">
              <span className="material-icons text-sm">edit</span>
            </button>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (confirm('Bạn có chắc chắn muốn xóa ứng dụng này không?')) {
                onDelete(app.id);
              }
            }}
            className="p-2 bg-white/90 dark:bg-black/50 rounded-full hover:bg-white text-slate-700 hover:text-red-500 transition-colors"
          >
            <span className="material-icons text-sm">delete</span>
          </button>
        </div>

        <img
          alt={app.name}
          className="rounded-lg shadow-lg w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          src={app.thumbnailUrl}
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <Link
            to={`/?category=${encodeURIComponent(app.category)}`}
            className="text-xs font-bold text-orange-500 uppercase tracking-wide hover:underline"
          >
            {app.category}
          </Link>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full flex items-center gap-1">
            <span className="material-icons text-[10px]">schedule</span> {app.licenseType}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
          {app.name}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 flex-1">
          {app.description}
        </p>

        <a href={app.accessLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="secondary" className="w-full justify-between group-hover:bg-slate-100 dark:group-hover:bg-slate-700">
            Truy cập ngay
            <span className="material-icons text-base">chevron_right</span>
          </Button>
        </a>
      </div>
    </div>
  );
}
