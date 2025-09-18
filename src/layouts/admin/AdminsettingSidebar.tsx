import React from 'react';
import { useRouter } from 'next/router';
import { logo_pic } from '@/src/assets/admin/adminicon';
import { adminsideBarArr, adminsubsideBarArr } from '@/src/utils/admin';

const AdminSettingsBar = ({open,setOpen}:any) => {
  const router = useRouter();
  const role=sessionStorage.getItem('role')
  console.log(role)
  return (
    <aside className={`w-60 py-4 bg-gradient-to-tr from-[#ee7623] to-white text-[#282461] items-center overflow-hidden font-sans rounded-xl shadow-lg flex flex-col `}>
      <div className="w-full flex items-center justify-center">
        <img src={logo_pic.src} alt="Company Logo" className="h-24 w-24" />
      </div>
      <div className="text-base font-semibold">
        <div className="flex flex-col">
          <button className='py-2 px-8 text-[#282461]'onClick={()=>{setOpen(false)}}>
            Back to Home
          </button>
          {
role=="admin" ? 
<>
{adminsideBarArr.map((item) => (
            <span
              key={item.id}
              className="flex items-center group cursor-pointer hover:!transition-all !duration-500 !ease-in-out z-50"
              onClick={() => {
                router.push(`${item.path}`);
              }}
            >
              <div className="gap-5 text-base flex text-nowrap items-start hover:bg-[#D9D9D9] hover:text-[#5A12CF] rounded-full py-2 px-5 transition duration-300 font-semibold">
                <img src={item.img.src} alt="" className='w-10 h-10'/>
                <h2>{item.title}</h2>
              </div>
            </span>
          ))}
</>:<>
{adminsubsideBarArr.map((item) => (
            <span
              key={item.id}
              className="flex items-center group cursor-pointer hover:!transition-all !duration-500 !ease-in-out z-50"
              onClick={() => {
                router.push(`${item.path}`);
              }}
            >
              <div className="gap-5 text-base flex text-nowrap items-start hover:bg-[#D9D9D9] hover:text-[#5A12CF] rounded-full py-2 px-5 transition duration-300 font-semibold">
                <img src={item.img.src} alt="" className="h-10 w-10" />
                <h2>{item.title}</h2>
              </div>
            </span>
          ))}
</>
          }
         
         
        </div>
      </div>
    </aside>
  );
};

export default AdminSettingsBar;
