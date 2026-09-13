import React, { useState } from 'react';
import { X, QrCode, Sparkles, CheckCircle, Camera, RefreshCw } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { STORES_DATA } from '../../data/storesData';

export const QrScannerModal: React.FC = () => {
  const { isQrScannerOpen, closeQrScanner, addStamp, hasStamp, openStoreDetail } = useMarket();
  const [selectedScanStore, setSelectedScanStore] = useState(STORES_DATA[0].storeId);
  const [scanSuccess, setScanSuccess] = useState(false);

  if (!isQrScannerOpen) return null;

  const handleSimulateScan = (storeId: string) => {
    addStamp(storeId);
    setScanSuccess(true);
    setTimeout(() => {
      setScanSuccess(false);
      closeQrScanner();
      openStoreDetail(storeId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-3xl p-5 shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EFC548] text-[#0C1326] flex items-center justify-center shadow-xs font-bold">
              <Camera size={16} />
            </div>
            <h3 className="font-extrabold text-sm tracking-tight text-white">현장 QR 빠른 인증기</h3>
          </div>
          <button
            onClick={closeQrScanner}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Viewfinder UI */}
        <div className="my-5 relative flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 rounded-2xl border-2 border-slate-700 bg-black flex items-center justify-center overflow-hidden">
            {/* Viewfinder Corners */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#EFC548]" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#EFC548]" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#EFC548]" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#EFC548]" />

            {/* Scanning Laser Beam */}
            {!scanSuccess && (
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#EFC548] to-transparent shadow-[0_0_15px_#EFC548] animate-bounce" />
            )}

            {scanSuccess ? (
              <div className="flex flex-col items-center justify-center text-[#EFC548] animate-in zoom-in-75">
                <CheckCircle size={56} className="mb-2 text-[#EFC548]" />
                <span className="font-bold text-sm">인증 완료!</span>
                <span className="text-[11px] text-slate-400 mt-1">스탬프가 적립되었습니다</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500">
                <QrCode size={64} className="opacity-40 mb-2" />
                <span className="text-xs font-medium">상점의 QR 코드를 비춰주세요</span>
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            실제 매장 입구 및 테이블에 부착된 1960 청량로드 QR 코드를 인식합니다.
          </p>
        </div>

        {/* Demo Simulator Helper */}
        <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800">
          <p className="text-xs font-bold text-[#EFC548] flex items-center gap-1.5 mb-2">
            <Sparkles size={13} className="text-[#EFC548]" />
            <span>데모 모드: 시뮬레이션 인증할 점포 선택</span>
          </p>
          <div className="space-y-2">
            <select
              value={selectedScanStore}
              onChange={(e) => setSelectedScanStore(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#EFC548]"
            >
              {STORES_DATA.map((s) => (
                <option key={s.storeId} value={s.storeId}>
                  [{s.marketName}] {s.name} {hasStamp(s.storeId) ? '(이미 완료)' : ''}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleSimulateScan(selectedScanStore)}
              disabled={scanSuccess}
              className="w-full py-2.5 rounded-xl bg-[#EFC548] hover:bg-[#E5B730] text-[#0C1326] font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <RefreshCw size={14} className={scanSuccess ? 'animate-spin text-[#0C1326]' : 'text-[#0C1326]'} />
              <span>선택 점포 현장 QR 스캔 완료하기</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
