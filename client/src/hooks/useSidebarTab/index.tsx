import { type Dispatch, type SetStateAction, useState, useEffect } from 'react';
import TabsEnum from '@src/types/enums/tabs-enum';
import { useNavigate } from 'react-router-dom';

interface SidebarHookType {
  currentTab: TabsEnum;
  setCurrentTab: Dispatch<SetStateAction<TabsEnum>>;
}

const useSidebarTab = (): SidebarHookType => {
  const [currentTab, setCurrentTab] = useState<TabsEnum>(TabsEnum.YOUR_TICKETS);
  const navigate = useNavigate();

  useEffect(() => {
    switch (currentTab) {
      case TabsEnum.ALL_TICKETS:
        navigate('/all-tickets');
        break;
      case TabsEnum.MANAGE_USERS:
        navigate('/user-management');
        break;
      default:
        navigate('/your-tickets');
    }
  }, [currentTab]);
  return {
    currentTab,
    setCurrentTab,
  };
};

export default useSidebarTab;
