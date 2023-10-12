

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
 

    return NextResponse.redirect(new URL(`/authentification_proprietaire/signvalidate`, req.url))
  
   
}

/* `/pageSearch?localisationVille=${city}&localisationPays=${pays}` */