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
  const { searchParams } = new URL(req.url)
  const localisationPays = searchParams.get('localisationPays')
  const params = [];

  for (let entry of searchParams.entries()) {
    params.push(entry);
  }
  console.log(params)
  let keys: string[] = [];
  let values: string[] = [];
  for (const [key, value] of params) {
    keys.push(key);
    values.push(value);
  }
  console.log(localisationPays)
  const lengthKeys = keys.length;

  if (keys[0]==="typeDoffre"){
    return NextResponse.redirect(new URL(`/pageSearch?typeDoffre=${values[0]}`, req.url))
  }
  if (/* keys[0]==="localisationVille" && keys[1]==="localisationPays" && */ keys[2]!=="typeDoffre"){
    return NextResponse.redirect(new URL(`/pageSearch?localisationVille=${values[0]}&localisationPays=${values[1]}`, req.url)) 
  }
   if (keys[2]==="typeDoffre"){
    return NextResponse.redirect(new URL(`/pageSearch?localisationVille=${values[0]}&localisationPays=${values[1]}&typeDoffre=${values[2]}`, req.url))
  }
   
}

/* `/pageSearch?localisationVille=${city}&localisationPays=${pays}` */