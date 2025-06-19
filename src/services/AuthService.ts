import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { userSchema, type CheckPasswordForm, type ConfirmToken, type ForgotPasswordForm, type NewGeneratePasswordForm, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm } from "../types";


export async function createAcount(formData: UserRegistrationForm) {
   try {
      const url = '/auth/create-account'
      const { data } = await api.post<string>(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function confirmAcount(formData: ConfirmToken) {
   try {
      const url = '/auth/confirm-account'
      const { data } = await api.post<string>(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
   try {
      const url = '/auth/request-code'
      const { data } = await api.post<string>(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function autenticateUser(formData: UserLoginForm) {
   try {
      const url = '/auth/login'
      const { data } = await api.post<string>(url, formData)
      localStorage.setItem('AUTH_TOKEN', data)
      console.log(data);
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
   try {
      const url = '/auth/forgot-password'
      const { data } = await api.post<string>(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function validateToken(formData: ConfirmToken) {
   try {
      const url = '/auth/validate-token'
      const { data } = await api.post<string>(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function updatePasswordWithToken({ formData, token }: { formData: NewGeneratePasswordForm, token: ConfirmToken['token'] }) {
   try {
      const url = `/auth/update-token/${token}`
      const { data } = await api.post<string>(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getUser() {
   try {
      const { data } = await api.get('/auth/user')
      const response = userSchema.safeParse(data)
      if (response.success) {
         return response.data
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function checkPassword(formData: CheckPasswordForm) {
   try {
      const url = '/auth/check-password'
      const { data } = await api.post<string>(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}