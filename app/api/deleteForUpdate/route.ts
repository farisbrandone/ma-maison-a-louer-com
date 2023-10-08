import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
   /*  console.log("my request is :",request) */
   const body = await request.json()
   const requestUrl = new URL(request.url)
const world=body.map((elt:string)=>elt.slice(0, elt.length-1))
  console.log("blublu", world)
  const supabase = createRouteHandlerClient({ cookies })
  
     const { error } = await supabase
  .from('tableDesOffres')
  .delete()
  .in('id', world)  

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/pageForUpdateData?error=Nous n'avons pas pu vous authentifier, réessayez svp`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(`${requestUrl.origin}/pageForUpdateData?message=suppression de donnée réussie`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}