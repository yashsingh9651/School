"use client";
import { gsap, Power3 } from 'gsap';
import Link from 'next/link';
import React, { useLayoutEffect, useRef } from 'react';

const Navbar = () => {
  const comp = useRef(null);   // create a ref for the root level element;
  useLayoutEffect(() => {
    // Creating Context...
    let ctx = gsap.context(():void=>{
      // Setting the gsap timeline and default value.
      let t1 = gsap.timeline({defaults:{duration:.8},delay:.2});
      t1.to('.nav',{css:{visibility:"visible"}}).from(".link1",{y:-140,opacity:0,x:20,ease:Power3.easeOut}).from('.link2',{y:-140,opacity:0,x:20,ease:Power3.easeOut,stagger:.3});
    },comp);
    return ()=>ctx.revert(); // Animation Cleanup. 
  }, [])
    const schoolName = "XYZ School";
  return (
    <div className='fixed w-screen z-50 bg-transparent' ref={comp}>
      <nav className='flex nav notVisible justify-between container mx-auto items-center w-full px-6 h-[80px]'>
          <Link className='link1 text-4xl font-semibold text-c' href={"/"}>{schoolName}</Link>
          <div className="flex gap-4 capitalize text-3xl font-semibold">
            <Link className='link2' href={"/login"}><h1 className='hover:scale-110 duration-150 text-c'>login</h1></Link>
            <Link className='link2' href={"/courses"}><div className='hover:scale-110 duration-150 text-c'>courses</div></Link>
            <Link className='link2' href={"/about"}><div className='hover:scale-110 duration-150 text-c'>about</div></Link>
          </div>
        </nav>
    </div>
  )
}

export default Navbar;