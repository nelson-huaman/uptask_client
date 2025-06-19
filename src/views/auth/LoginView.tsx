import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import type { UserLoginForm } from "@/types/index";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { autenticateUser } from "@/services/AuthService";
import { toast } from "react-toastify";

function LoginView() {

   const initialValues: UserLoginForm = {
      email: '',
      password: '',
   }

   const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

   const navigate = useNavigate()

   const { mutate } = useMutation({
      mutationFn: autenticateUser,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: () => {
         navigate('/')
      }
   })
   const handleLogin = (formData: UserLoginForm) => mutate(formData)

   return (
      <>
         <h1 className="text-5xl font-black text-white text-center">Iniciar Sesión</h1>
         <p className="text-2xl font-light text-white mt-5 text-center">
            Comienza a planear tus proyectos {''}
            <span className=" text-fuchsia-500 font-bold"> iniciando sesión en este formulario</span>
         </p>
         <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-8 p-10 bg-white mt-10"
            noValidate
         >
            <div className="flex flex-col gap-2">
               <label
                  className="font-normal text-lg"
               >Email</label>

               <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register("email", {
                     required: "El Email es obligatorio",
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                     },
                  })}
               />
               {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
               )}
            </div>

            <div className="flex flex-col gap-2">
               <label
                  className="font-normal text-lg"
               >Password</label>

               <input
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register("password", {
                     required: "El Password es obligatorio",
                  })}
               />
               {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
               )}
            </div>

            <input
               type="submit"
               value='Iniciar Sesión'
               className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
            />
         </form>
         <nav className="mt-5 flex flex-col space-y-4">
            <Link
               to={'/auth/register'}
               className="text-center text-gray-300 font-normal"
            >¿No tienes cuenta? <span className="font-bold">Crea Una</span></Link>
            <Link
               to={'/auth/forgot-password'}
               className="text-center text-gray-300 font-normal"
            >¿Olvidaste tu contraseña? <span className="font-bold">Reestablecer</span></Link>
         </nav>
      </>
   )
}

export default LoginView