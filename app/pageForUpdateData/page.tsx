import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database';
import { cookies } from 'next/headers'
import PageForUpdateData from '@/components/pageForUpdateData/PageForUpdateData';
import LoadingPage from '@/components/LoadingPage';
import SnackComponent from '@/components/SnackComponent';
export type Stock = {
    typeDoffre: string;
  created_at: string;
  id:string
}
async function  Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
 
  let { data: tableDesOffres, error:stockError } = await supabase
  .from('tableDesOffres')
  .select('created_at,typeDoffre,id')
  .returns<Stock[]>();
  if(tableDesOffres){

      return (
        <>
         <SnackComponent/>
         <PageForUpdateData dataForUpdate={tableDesOffres} />
        </>
        )
}
return(
    <>
    <LoadingPage/>
    </>
)
  }
  
  export default Page;
