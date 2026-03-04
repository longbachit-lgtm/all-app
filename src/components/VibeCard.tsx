import React, { useState } from 'react';
import { AppData } from '@/types';

interface VibeCardProps {
    app: AppData;
}

export const VibeCard: React.FC<VibeCardProps> = ({ app }) => {
    const [showPreview, setShowPreview] = useState(false);
    const isPremium = app.licenseType !== 'Free';

    return (
        <>
            <div className="vibe-card group flex flex-col relative h-full">
                {/* Badge */}
                <div className={`vibe-badge ${!isPremium ? 'bg-green-500' : 'bg-blue-600'}`}>
                    {isPremium ? 'Premium' : 'Free'}
                </div>

                {/* Image Area */}
                <div
                    className="p-4 bg-[#f1f3f5] dark:bg-slate-800 border-b-2 border-black relative overflow-hidden aspect-video flex items-center justify-center cursor-zoom-in"
                    onClick={() => setShowPreview(true)}
                >
                    <img
                        src={app.thumbnailUrl}
                        alt={app.name}
                        className="w-full h-full object-cover border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="material-icons text-white text-3xl">visibility</span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase text-orange-600 tracking-widest">
                            {app.category}
                        </span>
                        <div className="flex items-center gap-0.5 text-yellow-500">
                            <span className="material-icons text-xs">star</span>
                            <span className="material-icons text-xs">star</span>
                            <span className="material-icons text-xs">star</span>
                            <span className="material-icons text-xs">star</span>
                            <span className="material-icons text-xs">star</span>
                            <span className="text-[10px] font-black text-black dark:text-white ml-1">5</span>
                        </div>
                    </div>

                    <h3 className="font-black text-sm uppercase tracking-tight mb-2 line-clamp-1">
                        {app.name}
                    </h3>

                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 flex-1 leading-relaxed">
                        {app.description}
                    </p>

                    <a
                        href={app.accessLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vibe-button w-full uppercase"
                    >
                        Truy cập ngay
                        <span className="material-icons text-lg">lock</span>
                    </a>
                </div>
            </div>

            {/* Image Preview Modal */}
            {showPreview && (
                <div
                    className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200"
                    onClick={() => setShowPreview(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors z-[110]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPreview(false);
                        }}
                    >
                        <span className="material-icons text-4xl">close</span>
                    </button>

                    <div
                        className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={app.thumbnailUrl}
                            alt={app.name}
                            className="max-w-full max-h-[85vh] object-contain border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]"
                        />
                        <div className="absolute -bottom-16 left-0 right-0 text-center">
                            <h2 className="text-white font-black text-2xl uppercase tracking-tighter">{app.name}</h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
