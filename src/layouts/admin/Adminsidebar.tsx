import React from 'react';
import { useRouter } from 'next/router';
import { logo_pic} from '@/src/assets/admin/adminicon';
import { sideBarArr } from '@/src/utils/admin';

export default function Adminsidebar({ open, setOpen }: any) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <aside className={`w-60 py-4 bg-gradient-to-tr from-[#ee7623] to-white text-[#282461] items-center font-sans rounded-xl shadow-lg flex flex-col overflow-hidden`}
    style={{ height: '100vh' }}>
      <div className="w-full flex items-center justify-center">
        <img src={logo_pic.src} alt="Company Logo" className="h-24 w-24" />
      </div>
      <div className="text-base font-semibold flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#ee7623] scrollbar-track-[#282461] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <div className="flex flex-col">
          {sideBarArr.map((item) => (
            <span
              key={item.id}
              className={`flex items-center group cursor-pointer hover:transition-all hover:duration-500 hover:ease-in-out z-50 ${currentPath === item.path ? 'bg-[#ee7623] text-[#5A12CF]' : 'hover:bg-[#ee7623] hover:text-[#5A12CF]'}`}
              onClick={() => {
                router.push(`${item.path}`);
              }}
            >
              <div className="gap-5 text-base flex text-nowrap items-start hover:bg-[#ee7623] hover:text-[#282461] rounded-full py-2 px-5 transition duration-300 font-semibold">
                <img src={item.img.src} alt="" className='w-10 h-10' />
                <h2>{item.title}</h2>
              </div>
            </span>
          ))}
          <button className="py-2 px-8 text-[#282461]" onClick={() => { setOpen(true)}}>
            Admin Setting
          </button>
        </div>
      </div>
    </aside>
  );
}
