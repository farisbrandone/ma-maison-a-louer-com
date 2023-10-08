import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic'

export async function   GET(request:  NextRequest) {
   /*  console.log("my request is :",request) */
  /*  const body = await request.json() */
  console.log("blablabla");
   const requestUrl = new URL(request.url)
   const body=requestUrl.searchParams.get("id")
const world=body
  console.log("blublu", world)
  const supabase = createRouteHandlerClient({ cookies })
  let { data: tableDesOffres, error } = await supabase
  .from('tableDesOffres')
  .select('*') 
  .eq('id', world)
   
  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/pageForUpdateData?error=Nous n'avons pas pu vous authentifier, réessayez svp`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }
  if (tableDesOffres){
   console.log(tableDesOffres)
      return NextResponse.json(tableDesOffres[0], {
        // a 200 status is required to send from a POST to a GET route
        status: 200,
      })
  }

}