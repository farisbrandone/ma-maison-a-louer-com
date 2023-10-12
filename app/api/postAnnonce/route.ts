/* import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
   
   const body = await request.json()
   
   let keys=""
   let values=""
   for (const [key, value] of Object.entries(body)) {
     keys=keys+ " " +`${key}`
     values=values+ " " + `${value}`
  }
   const requestUrl = new URL(request.url)
 console.log(keys, values)
   const supabase = createRouteHandlerClient({ cookies })
  
     const {data, error } = await supabase
  .from('tableDesOffres')
  .select("*")
  .eq( keys, values)  

   if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}?error=Une erreur est survenue pendant la recherche, réessayez svp`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  } 
 if (data.length===0){

     return NextResponse.redirect(`${requestUrl.origin}?data=0`, {
       // a 301 status is required to redirect from a POST to a GET route
       status: 301,
     })
 }

  return NextResponse.json(data, {
       status: 200,
     })


} */

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
 

    return NextResponse.redirect(new URL(`/authentification_proprietaire`, req.url))
  
   
}

/* `/pageSearch?localisationVille=${city}&localisationPays=${pays}` */