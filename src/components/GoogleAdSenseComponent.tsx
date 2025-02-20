'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const GoogleAdSenseComponent = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client="PID"
      data-ad-slot="SLOT_KEY"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
