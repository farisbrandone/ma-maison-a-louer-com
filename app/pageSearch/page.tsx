/* import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
 export const dynamic = 'force-dynamic' 
const Home= ()=> {
  const searchParams = useSearchParams()
  const loadingParams = searchParams.get('loading')
  const  [email, setEmail] = useState("kouetessa123@yopmail.com")
  const [password, setPassword] = useState("ba26021992")
  const [name, setName] = useState("kouetessa")
  const [loading, setLoading] = useState(false)

  const submit=()=>{
    setLoading(true)
  }

  useEffect(() => {
  
   if (loadingParams){
    setLoading(false)
   }
    
  }, [loading, loadingParams])

  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Supabase Auth + Storage</h1>
        <p className="">
          Experience our Auth and Storage through a simple profile management example. Create a user
          profile and upload an avatar image. Fast, simple, secure.
        </p>
      </div>
      <div style={{ width:"400px", height:"400px", }} className="flex, flex-col gap-1 p-2">
      <form  onSubmit={submit} method='post' action="/auth/signout" >
        <div className="w-full bg-gray-200 flex flex-col gap-1">
        <label htmlFor="email">Enter your email</label>
        <input name='email' value={email} type="email" id='eamil' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="w-full bg-gray-300 flex flex-col gap-1">
          <label htmlFor="password">Enter password</label>
          <input id='password' name='password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="w-full bg-gray-300 flex flex-col gap-1">
          <label htmlFor="name">Enter your name</label>
          <input id='name' name='name' type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <button formAction="/auth/signup">{loading?"laoding...":"Sign in"}</button>
      </form>
         
    </div>
    </div>
  )
}

export default Home */



import * as React from 'react';
import  {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
  Pagination,
  InfoIcon,
  Image,
  PaginationControlled,
  Header,
}from "../../components/muiExportComponent/MuiForpage";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database';
import { cookies } from 'next/headers'
import SnackComponent from '@/components/SnackComponent';
import Bodypage2 from '@/components/body/BodyComponent2';




export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
 
  return (
    <>
    
    <Bodypage2 session={session}  />
    </>
 
  );
}




