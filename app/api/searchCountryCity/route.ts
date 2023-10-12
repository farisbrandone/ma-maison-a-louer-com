
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