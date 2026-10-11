import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type SiteSettings } from './api';

const SiteContext = createContext<SiteSettings | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteSettings | null>(null);
  useEffect(() => {
    api.site().then(setSite).catch(() => setSite(null));
  }, []);
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteSettings | null {
  return useContext(SiteContext);
}

/** Convenience: non-null site for inner components once the provider has data. */
export function useSiteReady(): SiteSettings {
  const site = useSite();
  if (!site) throw new Error('Site settings not loaded yet');
  return site;
}
