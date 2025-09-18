
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {apiClient} from "../../../../config/route.config";

interface AnnouncementData {
  sl: number;
  title: string;
  description: string;
  date: string;
  status: number;
}

interface AnnouncementContextType {
  latestAnnouncementDescription: string;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const AnnouncementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latestAnnouncementDescription, setLatestAnnouncementDescription] = useState<string>('');

  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.get('/announcements/getall', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true });
        const latestAnnouncement = response.data[0]; // Assuming the latest announcement is the first one
        setLatestAnnouncementDescription(latestAnnouncement.description);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchLatestAnnouncement();
  }, []);

  return (
    <AnnouncementContext.Provider value={{ latestAnnouncementDescription }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider');
  }
  return context;
};
