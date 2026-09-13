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

  const smallbeeLink = store.smallbeeUrl || `https://mobile.smallbee.co.kr/${store.storeId}`;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200/90 animate-in slide-in-from-bottom duration-200">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-[#FAF6E6] text-[#7E5D0A] text-xs font-bold border border-[#EFC548]/40">
            {store.marketName}
          </span>
          {store.titleBadge && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
              {store.titleBadge}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 -mr-1"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex gap-3.5">
        {/* Fixed-dimension Thumbnail (prevents image blowout) */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Container with min-w-0 to prevent flex overflow */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h4 className="font-black text-base text-navy-900 truncate">
              {store.name}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 truncate mt-0.5 font-medium">
              {store.signatureMenu[0]}
            </p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 truncate">
              <MapPin size={13} className="text-[#A97F12] shrink-0" />
              <span className="truncate">{store.locationGuide}</span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
            <span className="text-xs sm:text-sm font-black text-navy-900">
              {store.priceRange}
            </span>
            <button
              onClick={() => openStoreDetail(store)}
              className="text-xs sm:text-sm text-[#7E5D0A] font-black flex items-center gap-0.5 hover:underline"
            >
              <span>상세보기</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons: Smallbee External Link + Directions */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-slate-100">
        <a
          href={smallbeeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-3 rounded-2xl bg-[#EFC548] hover:bg-[#E5B730] text-[#0C1326] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-center"
        >
          <span>O2O 주문하기</span>
          <ExternalLink size={14} />
        </a>

        <button
          onClick={() => openDirections(store)}
          className="py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Navigation size={14} className="text-slate-600" />
          <span>골목 길안내</span>
        </button>
      </div>
    </div>
  );
};
