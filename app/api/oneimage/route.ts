
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(req.url)
  const value = searchParams.get('value')
  

 

    return NextResponse.redirect(new URL(`/oneImagePage?value=${value}`, req.url))
  
   
}

/* `/pageSearch?localisationVille=${city}&localisationPays=${pays}` */