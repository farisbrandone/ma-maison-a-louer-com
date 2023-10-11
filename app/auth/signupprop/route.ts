import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient({ cookies })
 
  const { error } = await supabase.auth.signUp({
    email,
    password,
     options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callbackprop`,
    }, 
  })

  if (error) {
   
    return NextResponse.redirect(
      `${requestUrl.origin}/authentification_proprietaire/signup?error=Problème rencontrer, réessayez svp`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/authentification_proprietaire/signup?loading=true&message=Un email vous à été envoyer à votre adresse, cliquer sur le lien associer pour accéder à la page`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  )
}
