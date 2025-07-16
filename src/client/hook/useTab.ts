import type { ReactNode } from 'react';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useURLParams } from '@/client/hook/useURLParams';

type TabItem = {
  content: ReactNode;
  label: string;
  value: string;
};

function useTab(tabs: TabItem[]) {
  const { setParams } = useURLParams();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState(initialTab || tabs[0].value);

  const handleChangeTab = useCallback(
    (value: string) => {
      setParams({ tab: value });
      setCurrentTab(value);
    },
    [setParams]
  );

  useEffect(() => {
    if (initialTab) {
      setCurrentTab(initialTab);
    }
  }, [initialTab]);

  return { tab: currentTab, handleChangeTab };
}

export { useTab };
