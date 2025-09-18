// src/components/Adminheader.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { user_pic } from '@/src/assets/admin/adminicon';
import { fetchAdminProfile, logout } from '@/src/redux/actions/authActions';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import { useAnnouncement } from '@/src/components/admin/announcement/AnnouncementContext';
import { apiBaseURL } from '@/config/route.config';


const Adminheader: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { admin } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const { latestAnnouncementDescription } = useAnnouncement();


  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logout());
    router.push('/'); // Redirect to login page after logout
  };


  return (
    <header className="w-full">
      <section className="flex items-center justify-end p-4 bg-gradient-to-r sticky from-white to-[#ee7623] shadow-md transition duration-500 ease-in-out ">
        {latestAnnouncementDescription && (
          <div className="flex items-center overflow-hidden flex-grow mr-4">
            <div className="flex animate-marquee">
              <p className="text-sm text-gray-600 bg-blue-100 p-2 rounded-md whitespace-nowrap">
                {latestAnnouncementDescription}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center">
          <NotificationsNoneIcon className="mx-2 text-gray-600 hover:text-blue-500 transition duration-300" />
          {admin && (
            <div className="mx-8 rounded-full flex justify-between items-center gap-1 p-1 border border-blue-900" >
              <img src={ `${apiBaseURL}/photo/${admin.user_photo}`|| `${user_pic.src}` } alt="User Avatar" className="h-12 w-auto rounded-full"/>
              <span className='items-center justify-center'>
                <p className="font-semibold text-sm text-center text-black">{`Welcome, ${admin.username}`}</p>
              </span>
            </div>
          )}
          <span className='group flex items-center gap-2' onClick={handleLogout}>
            <LogoutIcon />
            <p className='hidden uppercase cursor-pointer group-hover:block'>logout</p>
          </span>
        </div>
      </section>
    </header>
  );
};

export default Adminheader;
