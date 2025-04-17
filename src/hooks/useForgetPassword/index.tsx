import { forgotPasswordDto } from '@/utils/zod/forgetPassword'

export function useForgetPassword() {
  async function generateToken(email: string) {
    const req = await fetch('/api/generateToken/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    const res = await req.json()
    console.log(res)
    return res
  }

  async function validateToken(data: forgotPasswordDto) {
    const req = await fetch('/api/validateToken/', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const res = await req.json()
    console.log(res)
    return res
  }

  async function resetPassword() {}

  return {
    generateToken,
    validateToken,
    resetPassword,
  }
}
