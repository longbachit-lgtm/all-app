import { useApps } from '@/context/AppContext';
import { VibeCard } from '@/components/VibeCard';

export default function UserStore() {
    const { apps } = useApps();

    return (
        <div className="min-h-screen pt-16 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 px-4">
                    <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black border-2 border-black rotate-[-1deg] mb-6">
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-xs text-orange-500">folder_open</span>
                            AI STORE V1.0
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
                        <span className="text-orange-500">Kho</span> ứng dụng AI
                    </h1>

                    <p className="text-lg md:text-xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
                        Tuyển tập các công cụ AI mạnh mẽ nhất để nâng cấp quy trình làm việc của bạn.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {apps.map((app) => (
                        <VibeCard key={app.id} app={app} />
                    ))}
                </div>

                {/* Bottom Button */}
                <div className="mt-20 text-center">
                    <button className="bg-white hover:bg-slate-50 text-black font-black px-12 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all uppercase tracking-widest text-sm flex items-center gap-3 mx-auto">
                        Xem toàn bộ kho ứng dụng
                        <span className="material-icons">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
