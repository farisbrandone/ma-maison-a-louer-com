import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database';
import { cookies } from 'next/headers'
import InsertDataProprietaire from '@/components/inserData/InsertDataProprietaire';

async function  Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
    return (
      <>
      <InsertDataProprietaire session={session} />
      </>
      )
  }
  
  export default Page;
