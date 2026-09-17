import { STORES_DATA } from '../data/storesData';

/**
 * QR 코드 원본 문자열(URL 또는 식별자)에서 유효한 청량로드 storeId를 추출합니다.
 * 예: 
 * - https://crl.road.kr/?stamp=sb_hanmaeum_yakup -> 'sb_hanmaeum_yakup'
 * - https://crl.road.kr/?qr=sb_kmedicine_center -> 'sb_kmedicine_center'
 * - crl:sb_yeontan_galbi -> 'sb_yeontan_galbi'
 * - sb_starbucks1960 -> 'sb_starbucks1960'
 */
export function extractStoreIdFromQr(qrText: string): string | null {
  if (!qrText || typeof qrText !== 'string') return null;

  const trimmed = qrText.trim();

  // 1. URL 형태인 경우
  try {
    const url = new URL(trimmed);
    const stampParam = url.searchParams.get('stamp') || url.searchParams.get('qr') || url.searchParams.get('id');
    if (stampParam) {
      const matched = STORES_DATA.find(s => s.storeId === stampParam || s.id === stampParam);
      if (matched) return matched.storeId;
    }
  } catch {
    // 일반 텍스트일 수 있음
  }

  // 2. 텍스트 직접 매칭
  // 2-1) 정확히 storeId와 일치
  const directMatch = STORES_DATA.find(s => s.storeId === trimmed || s.id === trimmed);
  if (directMatch) return directMatch.storeId;

  // 2-2) 접두사 crl: 또는 crl_ 제거 후 매칭
  const cleanId = trimmed.replace(/^crl[:_]/i, '');
  const prefixMatch = STORES_DATA.find(s => s.storeId === cleanId || s.id === cleanId);
  if (prefixMatch) return prefixMatch.storeId;

  // 2-3) URL 문자열 안에 storeId가 포함되어 있는지 탐색
  const contained = STORES_DATA.find(s => trimmed.includes(s.storeId));
  if (contained) return contained.storeId;

  return null;
}
