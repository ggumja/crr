import React from 'react';
import { ExternalLink, ChevronRight, Navigation, MapPin, X } from 'lucide-react';
import { StoreItem } from '../../types/market';
import { useMarket } from '../../context/MarketContext';

interface Props {
  store: StoreItem;
  onClose: () => void;
}

export const StorePreviewCard: React.FC<Props> = ({ store, onClose }) => {
  const { openStoreDetail, openDirections } = useMarket();

  const smallbeeLink = `https://mobile.smallbee.co.kr/${store.storeId}`;

  return (
    <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-200/80 animate-in slide-in-from-bottom duration-200">
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-[#FAF6E6] text-[#7E5D0A] text-[10px] font-bold border border-[#EFC548]/40">
            {store.marketName}
          </span>
          {store.titleBadge && (
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
              {store.titleBadge}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-0.5"
          aria-label="닫기"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-extrabold text-xs text-navy-900 line-clamp-1">
              {store.name}
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
              {store.signatureMenu[0]}
            </p>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 line-clamp-1">
              <MapPin size={11} className="text-[#A97F12] shrink-0" />
              <span>{store.locationGuide}</span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] font-extrabold text-navy-900">
              {store.priceRange}
            </span>
            <button
              onClick={() => openStoreDetail(store)}
              className="text-xs text-[#7E5D0A] font-bold flex items-center hover:underline"
            >
              <span>상세보기</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons: Smallbee External Link + Directions */}
      <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-100">
        <a
          href={smallbeeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-2.5 rounded-xl bg-[#EFC548] hover:bg-[#E5B730] text-[#0C1326] text-[11px] font-black flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all text-center"
        >
          <span>스몰비 상품보기</span>
          <ExternalLink size={12} />
        </a>

        <button
          onClick={() => openDirections(store)}
          className="py-2.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
        >
          <Navigation size={12} className="text-slate-600" />
          <span>골목 길안내</span>
        </button>
      </div>
    </div>
  );
};
