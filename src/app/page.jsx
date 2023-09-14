"use client";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "../components/Magnetic";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Elastic, Power3, gsap } from "gsap";

// const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Home() {
  const compo = useRef(null); // create a ref for the root level element
  useLayoutEffect(() => {
    // Creating Gsap Context.
    let ctx = gsap.context(() => {
      // Splitting TextContent.
      let clutter = "";
      document
        .querySelector(".splitText")
        ?.textContent?.split(" ")
        .forEach((dets) => {
          clutter += `<span> ${dets} </span>`;
          document.querySelector(".splitText").innerHTML = clutter;
        });
      // Creating Timeline and Animating Elements.
      let t1 = gsap.timeline();
      t1.to(".page1", { css: { visibility: "visible" } })
        .from(".bgIma", { width: "0%", duration: 1.23, ease: Power3.easeOut })
        .to(
          ".splitText>span",
          { css: { visibility: "visible" }, stagger: 0.15 },
          "+=.5"
        )
        .set(
          ".splitText>span",
          { className: "text-c", stagger: 0.3, ease: Power3.easeOut },
          "-=.8"
        )
        .from(
          ".gsapBtn",
          { opacity: 0, x: -200, ease: Power3.easeOut, duration: 0.8 },
          "-=.2"
        )
        .from(
          ".text_style",
          {
            opacity: 0,
            x: 600,
            scale: 0,
            ease: Power3.easeOut,
            duration: 1.2,
          },
          "-=.5"
        )
        .from(
          "#shape",
          { y: 200, scale: 0, ease: Power3.easeOut, duration: 0.6 },
          "-=.5"
        )
        .from(
          ".boy",
          { y: 200, scale: 0, ease: Power3.easeOut, duration: 0.8 },
          "-=.4"
        )
        .from(".bus", { opacity: 0, ease: Power3.easeOut }, "-=.4");
    }, compo);
    return () => ctx.revert(); // Animation Cleanup.
  }, []);
  return (
    <>
      <main ref={compo}>
        {/* Background Image */}
        <div className="page1 notVisible">
          <Image
            width={1000}
            height={1000}
            className="w-full h-full absolute top-0 left-0 bgIma"
            src={"/bg.jpg"}
            alt="bg"
          />
          <div className="container mx-auto relative z-40 px-5 py-[100px] flex items-start justify-start min-h-screen">
            <div className="absolute top-[50%] left-[50%] custum2 z-50 text-7xl text-white font-semibold">
              <h1 className="text_style">Learn. Lead. Succeed.</h1>
            </div>
            <div className="px-5 py-8">
              <h1 className="splitText capitalize text-5xl font-bold my-10 w-[45vw]">
                the best learning place for your child.
              </h1>
              {/* Animated Hover Button */}
              <div className="gsapBtn">
                <Link className="customBtn p-5" href={"/register"}>
                  <button className="text-xl">Register Now</button>
                  <i></i>
                </Link>
              </div>
            </div>
            {/* Bus Kid ShapeImage and creating magnetic effect in bus image. */}
            <Magnetic>
              <Image
                width={340}
                height={340}
                src={"/bus.png"}
                className={`absolute top-[50%] left-[50%] opacity-60 custum2 bus z-50`}
                alt="bus"
              />
            </Magnetic>
            <Image
              width={340}
              height={340}
              src={"/solid.png"}
              id="shape"
              className="absolute bottom-2 right-20 opacity-90 z-40"
              alt="hexagon_shape"
            />
            <Image
              width={340}
              height={340}
              src={"/kid.png"}
              className="absolute boy bottom-16 right-20 z-50"
              alt="boy"
            />
          </div>
        </div>
      </main>
    </>
  );
}
