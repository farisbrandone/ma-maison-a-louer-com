import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database';
import { cookies } from 'next/headers'
import ToUpdatePage from '@/components/pageForUpdateData/ToUpdatePage';
import SnackComponent from '@/components/SnackComponent';

async function  Page() {
    
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
    return (
      <>
      <SnackComponent/>
      <ToUpdatePage session={session} />
      </>
      )
  }
  
  export default Page;

 
