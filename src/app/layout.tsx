"use client";
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navbar from './components/Navbar'
import { gsap,Power3 } from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { Loading } from './components/Loading';

const roboto = Roboto({
  weight: ['300','400','500','700','900'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'School Registration',
  description: 'Registration is now on your hands',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const compo = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context((self:any)=>{
      let tl = gsap.timeline();
      tl.to(".loading",{css:{display:"none"},duration:0})
      .to(".body",{css:{display:"initial"},duration:0,ease:Power3.easeOut});
    },compo);
    return ()=> ctx.revert();
  }, [])
  return (
    <html lang="en">
      <body ref={compo} className={roboto.className}>
        <div className='loading'>
          <Loading/>
        </div>
        <div className='body hidden'>
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  )
}
