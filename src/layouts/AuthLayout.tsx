import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function AuthLayout() {
   return (
      <>
         <div className="bg-gray-800 min-h-screen">
            <div className="py-10 lg:py-20 mx-auto w-[450px]">
               <div className="mx-auto w-64">
                  <Logo />
               </div>
               <div className="mt-5">
                  <Outlet />
               </div>
            </div>
         </div>
         <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
         />
      </>
   )
}

export default AuthLayout