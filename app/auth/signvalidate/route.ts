import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const supabase = createRouteHandlerClient({ cookies })
  console.log("request.origin")
  console.log("email is :", email)
  const {data, error } = await supabase.auth.resetPasswordForEmail(
    email,
     {
        redirectTo: `${requestUrl.origin}/auth/callbackvalidate`,
      },  

  )

  if (error) {
    console.log(requestUrl.origin)
    return NextResponse.redirect(
      `${requestUrl.origin}/authentification_user/signvalidate?error=Problème rencontrer, réessayez svp`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

 /*  return NextResponse.redirect(
    `${requestUrl.origin}/authentification_user/userupdate?loading=true&message=Mettez à jour vos données utilisateur`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  ) */
}
