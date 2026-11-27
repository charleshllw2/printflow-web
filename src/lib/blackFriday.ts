import { useSyncExternalStore } from 'react';

// Midnight on Dec 1 in Chattanooga (Eastern Standard Time).
export const BLACK_FRIDAY_END = Date.parse('2026-12-01T05:00:00Z');
const BLACK_FRIDAY_START = Date.parse('2026-11-27T05:00:00Z');

const isLive = () => {
  const now = Date.now();
  return now >= BLACK_FRIDAY_START && now < BLACK_FRIDAY_END;
};

const subscribe = (refresh: () => void) => {
  const now = Date.now();
  const delay = (now < BLACK_FRIDAY_START ? BLACK_FRIDAY_START : BLACK_FRIDAY_END) - now;
  const timer = delay > 0 ? window.setTimeout(refresh, delay) : undefined;
  return () => {
    if (timer !== undefined) window.clearTimeout(timer);
  };
};

// Prerendered markup is neutral, so a cached page can't advertise an expired offer.
export const useBlackFridayOffer = () => useSyncExternalStore(subscribe, isLive, () => false);
