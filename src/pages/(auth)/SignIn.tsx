import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslate } from '@/hooks/useTranslate'

const FormSchema = z.object({
  username: z.string().min(9, {
    message: 'Username must be at least 9 characters.'
  }),
  password: z.string().min(9, {
    message: 'Password must be at least 9 characters.'
  }),
  remember: z.boolean()
})

const SignIn = () => {
  const { t } = useTranslate('signin')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false
    }
  })
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='py-4 px-6 sm:px-12 lg:px-24 xl:px-32 sm:h-full flex flex-col justify-center text-neutral-4 space-y-6'>
      <h1 className='headline-7 sm:headline-6 lg:headline-5 xl:headline-4 text-black'>{t('title', 'Sign In')}</h1>
      <div className='flex sm:block lg:flex space-x-1 mb-3 sm:mb-6 body-2'>
        <span className='font-normal'>{t('noAccount', 'Don’t have an account yet?')}</span>
        <div>
          <Link to='/signup' className='body-2-semi text-green'>
            {t('signup', 'Sign Up')}
          </Link>
        </div>
      </div>
      <Form {...form}>
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <Input
                className='text-black flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                placeholder={t('usernamePlaceholder', 'Your username or email address')}
                {...field}
              />
              <FormMessage>{form.formState.errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <Input
                className='flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder', 'Password')}
                {...field}
              />
              <button className='absolute right-3 top-[30%] -translate-y-1/2' onClick={togglePasswordVisibility}>
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />
        <div className='flex justify-between sm:block lg:flex items-center mb-6 '>
          <div className='flex items-center lg:mb-0 space-x-2'>
            <Checkbox id='remember' {...form.register('remember')} />
            <label htmlFor='remember' className='body-2'>
              {t('remember', 'Remember me')}
            </label>
          </div>
          <a href='forgot' className='body-2-semi text-black'>
            {t('forgotPassword', 'Forgot password?')}
          </a>
        </div>
        <Button typeof='submit' variant='auth' size='auth' type='submit'>
          {t('signinButton', 'Sign In')}
        </Button>
      </Form>
    </div>
  )
}

export default SignIn
