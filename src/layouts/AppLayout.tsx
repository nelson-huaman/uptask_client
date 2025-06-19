import { Link, Navigate, Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "@/hooks/useAuth"

function AppLayout() {

   const { data, isError, isLoading } = useAuth()
   if (isLoading) return 'Cargando...'
   if (isError) {
      return <Navigate to={'/auth/login'} />
   }

   if (data) return (
      <>
         <header className="bg-gray-800 p-4">
            <div className="max-w-screen-2xl mx-auto flex gap-2 justify-between items-center">
               <div className="w-40">
                  <Link to={'/'}>
                     <Logo />
                  </Link>
               </div>
               <NavMenu name={data.name} />
            </div>
         </header>
         <section className="max-w-screen-2xl mx-auto p-5 mt-5">
            <Outlet />
         </section>
         <footer className="py5">
            <p className="text-center">
               Todo los derechos reservados &copy; {new Date().getFullYear()} - UpTask
            </p>
         </footer>
         <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
         />
      </>
   )
}

export default AppLayout