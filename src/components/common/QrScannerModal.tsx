import React, { useState, useEffect, useRef } from 'react';
import { X, QrCode, CheckCircle, Camera, Image as ImageIcon } from 'lucide-react';
import jsQR from 'jsqr';
import { useMarket } from '../../context/MarketContext';
import { STORES_DATA } from '../../data/storesData';
import { extractStoreIdFromQr } from '../../utils/qrHelper';

export const QrScannerModal: React.FC = () => {
  const { isQrScannerOpen, closeQrScanner, addStamp, hasStamp, openStoreDetail } = useMarket();

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scannedStore, setScannedStore] = useState<typeof STORES_DATA[0] | null>(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [isAlreadyStamped, setIsAlreadyStamped] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 스캔 성공 처리 (카메라 자동 인식 또는 이미지/테스트 인식)
  const handleDetectedCode = (rawQrData: string) => {
    if (scanSuccess) return;

    const matchedStoreId = extractStoreIdFromQr(rawQrData);
    if (!matchedStoreId) {
      return;
    }

    const store = STORES_DATA.find(s => s.storeId === matchedStoreId);
    if (!store) return;

    const already = hasStamp(matchedStoreId);
    setIsAlreadyStamped(already);
    setScannedStore(store);
    setScanSuccess(true);

    // 진동 피드백 (모바일 지원 시)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    // 자동으로 스탬프 적립!
    addStamp(matchedStoreId);

    // 1.5초 후 모달 닫기 및 해당 매장 상세 보기
    setTimeout(() => {
      setScanSuccess(false);
      closeQrScanner();
      openStoreDetail(store);
    }, 1500);
  };

  // 실시간 비디오 프레임 스캔 루프
  const scanVideoFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || scanSuccess) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data) {
          handleDetectedCode(code.data);
          return; // 성공 시 루프 중단
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
  };

  // 카메라 스트림 시작/종료 관리
  useEffect(() => {
    if (!isQrScannerOpen) {
      // 모달 닫힐 때 카메라 스트림 정리
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setScanSuccess(false);
      setScannedStore(null);
      setCameraError(null);
      return;
    }

    let isMounted = true;

    const startCamera = async () => {
      try {
        setCameraError(null);
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setCameraError('이 브라우저는 카메라 실시간 스캔을 지원하지 않습니다.');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' }, // 후면 카메라 우선
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });

        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true'); // iOS 전체화면 방지
          videoRef.current.play();
          animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
        }
      } catch (err: any) {
        console.warn('Camera access issue:', err);
        setCameraError('카메라 접근 권한이 없거나 지원되지 않는 기기입니다. QR 사진 업로드 또는 테스트 인증을 이용해주세요.');
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isQrScannerOpen]);

  // QR 사진 파일 업로드 스캔 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            handleDetectedCode(code.data);
          } else {
            alert('사진에서 QR 코드를 인식하지 못했습니다. 더 선명한 QR 사진을 선택해주세요.');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (!isQrScannerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-3xl p-5 shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* 숨김 캔버스 (비디오 프레임 분석용) */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EFC548] text-[#0C1326] flex items-center justify-center shadow-xs font-bold">
              <Camera size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight text-white">현장 QR 자동 스캐너</h3>
              <p className="text-[10px] text-slate-400">카메라를 QR 코드에 비추면 자동 인증됩니다</p>
            </div>
          </div>
          <button
            onClick={closeQrScanner}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Camera Viewfinder UI */}
        <div className="my-4 relative flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 rounded-3xl border-2 border-slate-700 bg-black flex items-center justify-center overflow-hidden shadow-inner">
            
            {/* Live Camera Video */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${cameraError ? 'hidden' : 'block'}`}
            />

            {/* Viewfinder Corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-[#EFC548] rounded-tl-lg z-10" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-[#EFC548] rounded-tr-lg z-10" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-[#EFC548] rounded-bl-lg z-10" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-[#EFC548] rounded-br-lg z-10" />

            {/* Scanning Laser Beam Effect */}
            {!scanSuccess && !cameraError && (
              <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#EFC548] to-transparent shadow-[0_0_15px_#EFC548] animate-pulse z-10 pointer-events-none" />
            )}

            {/* Scan Success Overlay */}
            {scanSuccess && scannedStore && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center text-[#EFC548] z-20 animate-in zoom-in-75 p-4 text-center">
                <CheckCircle size={54} className="mb-2 text-[#EFC548]" />
                <span className="font-black text-base text-white">{scannedStore.name}</span>
                <span className="text-xs text-[#FEF08A] font-extrabold mt-1">
                  {isAlreadyStamped ? '이미 스탬프가 적립된 스팟입니다' : '🎉 현장 QR 스캔 자동 인증 완료!'}
                </span>
                <span className="text-[11px] text-slate-300 mt-1">스탬프 여권에 자동 반영되었습니다</span>
              </div>
            )}

            {/* Camera Error / Fallback message */}
            {cameraError && !scanSuccess && (
              <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400 z-10">
                <QrCode size={48} className="opacity-40 mb-2 text-[#EFC548]" />
                <span className="text-xs font-bold text-slate-300">카메라 연결 대기</span>
                <span className="text-[11px] text-slate-400 mt-1">{cameraError}</span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 mt-2.5 text-center font-medium">
            각 위치에 부착된 <strong>청량로드 QR 코드</strong>를 비추면 즉시 스탬프가 찍힙니다.
          </p>
        </div>

        {/* Action Options: File Upload & 현장 QR 테스트 시뮬레이션 */}
        <div className="space-y-2 pt-1 border-t border-slate-800">
          <div className="flex gap-2">
            {/* QR 이미지 업로드 */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ImageIcon size={14} />
              <span>QR 사진 선택</span>
            </button>
          </div>

          {/* 개발/체험용: 현장 QR 스캔 시뮬레이터 */}
          <div className="bg-slate-950/70 rounded-2xl p-2.5 border border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5 px-0.5">
              <span>현장 QR 스캔 테스트 (8대 거점)</span>
              <span className="text-[#EFC548]">QR 비추기</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {STORES_DATA.slice(0, 4).map((s) => (
                <button
                  key={s.storeId}
                  onClick={() => handleDetectedCode(`crl:${s.storeId}`)}
                  className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left text-[11px] font-medium text-slate-200 truncate flex items-center justify-between transition-colors"
                >
                  <span className="truncate">{s.name}</span>
                  {hasStamp(s.storeId) && <span className="text-[#EFC548] text-[9px] font-black shrink-0 ml-1">완료</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QrScannerModal;
