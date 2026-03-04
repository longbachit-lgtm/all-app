import { useEffect, useRef, useState, useCallback, ChangeEvent, DragEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApps } from '@/context/AppContext';
import { AppData, CATEGORIES } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AppForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addApp, updateApp, getApp } = useApps();
  const isEdit = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadZoneRef = useRef<HTMLDivElement>(null);
  const [thumbMode, setThumbMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [pasteFlash, setPasteFlash] = useState(false);

  const MAX_SIZE_MB = 5;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppData>({
    defaultValues: {
      licenseType: 'Lifetime',
      isOwned: true,
      category: 'image-gen',
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      const app = getApp(id);
      if (app) {
        reset(app);
      } else {
        navigate('/');
      }
    }
  }, [id, isEdit, getApp, reset, navigate]);

  const onSubmit = (data: AppData) => {
    if (isEdit) {
      updateApp(data);
    } else {
      addApp({ ...data, id: crypto.randomUUID(), purchaseDate: new Date().toISOString().split('T')[0] });
    }
    navigate('/');
  };

  const processFile = useCallback((file: File) => {
    setUploadError('');
    if (!file.type.startsWith('image/')) {
      setUploadError('File không hợp lệ. Vui lòng chọn ảnh PNG, JPG, GIF hoặc WebP.');
      return;
    }
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      setUploadError(
        `Ảnh quá nặng! Dung lượng: ${fileSizeMB.toFixed(1)}MB — Giới hạn: ${MAX_SIZE_MB}MB. Vui lòng nén ảnh trước khi tải lên.`
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setValue('thumbnailUrl', result, { shouldValidate: true });
      setPasteFlash(true);
      setTimeout(() => setPasteFlash(false), 1200);
    };
    reader.readAsDataURL(file);
  }, [setValue, MAX_SIZE_MB]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // Ctrl+V paste ảnh từ clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            setThumbMode('upload');
            processFile(file);
          }
          break;
        }
      }
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [processFile]);

  const thumbnailUrl = watch('thumbnailUrl');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
        <Link to="/" className="hover:text-orange-500 transition-colors flex items-center gap-1">
          <span className="material-icons text-base">arrow_back</span>
          Back to list
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {isEdit ? 'Edit Application' : 'Add New Application'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Fill in the details to add a new AI tool to your app store.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                  App Name <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register('name', { required: 'App name is required' })}
                  placeholder="e.g. LuxFit AI Studio"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                  License Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('licenseType', { required: 'License type is required' })}
                  className="flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400"
                >
                  <option value="Lifetime">Lifetime</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Free">Free</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Access Link <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-lg">
                    link
                  </span>
                  <Input
                    {...register('accessLink', { required: 'Access link is required' })}
                    className="pl-10"
                    placeholder="https://example.com/app"
                  />
                </div>
                {errors.accessLink && (
                  <p className="text-red-500 text-xs mt-1">{errors.accessLink.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Thumbnail
              </label>

              {/* Tab switcher */}
              <div className="flex gap-1 mb-3 p-1 bg-slate-100 dark:bg-slate-700/50 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setThumbMode('upload')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    thumbMode === 'upload'
                      ? 'bg-white dark:bg-slate-800 text-orange-500 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <span className="material-icons text-sm">upload</span>
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setThumbMode('url')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    thumbMode === 'url'
                      ? 'bg-white dark:bg-slate-800 text-orange-500 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <span className="material-icons text-sm">link</span>
                  Paste URL
                </button>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {thumbMode === 'upload' ? (
                /* Upload zone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative flex flex-col items-center justify-center min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
                    ${pasteFlash
                      ? 'border-green-400 bg-green-50 dark:bg-green-900/10'
                      : isDragging
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-orange-400 hover:bg-orange-50/30 dark:hover:border-orange-500'
                    }`}
                >
                  {thumbnailUrl && (
                    <>
                      <img
                        src={thumbnailUrl}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </>
                  )}

                  <div className="relative z-10 flex flex-col items-center gap-2 p-6 text-center">
                    {thumbnailUrl ? (
                      <>
                        <span className={`material-icons text-4xl transition-colors ${pasteFlash ? 'text-green-400' : 'text-green-500'}`}>check_circle</span>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {pasteFlash ? '✅ Đã dán ảnh!' : 'Ảnh đã được chọn'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Click để thay ảnh khác</p>
                      </>
                    ) : (
                      <>
                        <span className={`material-icons text-5xl transition-colors ${isDragging ? 'text-orange-500' : 'text-slate-300 dark:text-slate-500'}`}>
                          cloud_upload
                        </span>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {isDragging ? 'Thả ảnh vào đây' : 'Click để chọn hoặc kéo thả ảnh'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-500 dark:text-slate-300 shadow-sm">Ctrl</kbd>
                          <span className="text-slate-400 text-xs">+</span>
                          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-500 dark:text-slate-300 shadow-sm">V</kbd>
                          <span className="text-xs text-slate-400">để dán ảnh từ clipboard</span>
                        </div>
                        <p className="text-xs text-slate-400">PNG, JPG, GIF, WebP · Tối đa {MAX_SIZE_MB}MB</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* URL input zone */
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 dark:border-slate-700 border-dashed rounded-xl bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden group hover:border-orange-400 transition-colors">
                  {thumbnailUrl && (
                    <img src={thumbnailUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-20 transition-opacity" />
                  )}
                  <div className="space-y-2 text-center relative z-10 w-full">
                    <span className="material-icons text-5xl text-slate-300 dark:text-slate-500 block">image</span>
                    <Input
                      {...register('thumbnailUrl')}
                      placeholder="https://example.com/image.png"
                      className="text-center bg-white/80 dark:bg-slate-900/80"
                    />
                    <p className="text-xs text-slate-400">Paste a direct image link (PNG, JPG, GIF)</p>
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span className="material-icons text-sm">error</span>
                  {uploadError}
                </p>
              )}

              {thumbnailUrl && (
                <button
                  type="button"
                  onClick={() => { setValue('thumbnailUrl', ''); setUploadError(''); }}
                  className="mt-2 text-xs text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <span className="material-icons text-sm">delete</span>
                  Remove thumbnail
                </button>
              )}

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                Recommended size: 1200x630px for best display.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 resize-none"
              placeholder="Describe the main functions of this AI app..."
            />
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700"></div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <span className="material-icons text-xl">verified_user</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Copyright Status
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Default is Lifetime
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isOwned')}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-500"></div>
                <span className="ms-3 text-sm font-medium text-slate-900 dark:text-slate-300">
                  Activated
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full md:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto flex-1 gap-2">
              <span className="material-icons text-lg">save</span>
              Save Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
