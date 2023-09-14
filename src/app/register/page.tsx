"use client";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { Schema } from "@/schema";
import getStripePromise from "@/stripe";

const page = () => {
  // Form Submitting
  type Data = {
    studentName: string;
    FatherName: string;
    adClass: string;
    email: string;
    amount: number;
  };
  const data: Data = {
    studentName: "",
    FatherName: "",
    adClass: "",
    email: "",
    amount: 500,
  };
  // ? Handeling Formik...
  const form = useRef(null);
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: data,
      validationSchema: Schema,
      onSubmit: async (values: Data, action) => {
        const stripeS =await getStripePromise();
        const response = await fetch("/api/stripe-session/",{
          method:"POST",
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify(values)
        })
        const data = await response.json();
        if (data.session) {
          stripeS?.redirectToCheckout({sessionId:data.session.id});
        }
        action.resetForm();
      },
    });
  return (
    <div className="h-screen w-screen bg-color-page2">
      <div className="text-black container mx-auto h-screen w-screen px-5 pt-[100px] pb-10">
        <div className="flex justify-center items-center gap-10 h-2/3">
          <div></div>
          <div className="w-1/3 capitalize bg-[#ffffff90] rounded-lg border border-slate-500 h-full text-center p-4">
            <h1 className="text-2xl mb-4 underline underline-offset-4 font-semibold">
              enternace exam form
            </h1>
            <form ref={form} onSubmit={handleSubmit}>
              <div>
                <input
                  onChange={handleChange}
                  type="text"
                  name="studentName"
                  value={values.studentName}
                  placeholder="Enter Student's Full Name"
                  className="bg-white capitalize w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-black py-1 px-2 transition-colors duration-200 ease-in-out"
                />
                <input
                  onChange={handleChange}
                  type="text"
                  name="FatherName"
                  value={values.FatherName}
                  placeholder="Enter Student's Father Name"
                  className="bg-white capitalize mt-2 rounded w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-black py-1 px-2 transition-colors duration-200 ease-in-out"
                />
                <div className="flex items-center gap-2">
                  <h1 className="text-xl">Class:</h1>
                  <select
                    name="adClass"
                    onChange={handleChange}
                    value={values.adClass}
                    className="bg-white capitalize mt-2 rounded w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-black py-1 px-2 transition-colors duration-200 ease-in-out"
                  >
                    <option value={"LKG"}>LKG</option>
                    <option value={"UKG"}>UKG</option>
                    <option value={"1st"}>1st</option>
                    <option value={"2nd"}>2nd</option>
                    <option value={"3rd"}>3rd</option>
                    <option value={"4th"}>4th</option>
                    <option value={"5th"}>5th</option>
                    <option value={"6th"}>6th</option>
                    <option value={"7th"}>7th</option>
                    <option value={"8th"}>8th</option>
                    <option value={"9th"}>9th</option>
                    <option value={"10t"}>10th</option>
                    <option value={"11t"}>11th</option>
                    <option value={"12t"}>12th</option>
                  </select>
                </div>
                <input
                  onChange={handleChange}
                  value={values.email}
                  type="email"
                  name="email"
                  placeholder="Enter Your Gmail"
                  className="bg-white mt-2 rounded w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-black py-1 px-2 transition-colors duration-200 ease-in-out"
                />
                <input
                  type="number"
                  name="amount"
                  value={500}
                  readOnly={true}
                  placeholder="Fee For Registration"
                  className="bg-white capitalize mt-2 rounded w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-black py-1 px-2 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="customBtn2 mt-5 p-6">
                <button type="submit" className="text-xl">
                  Register Now
                </button>
                <i></i>
              </div>
            </form>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center items-center gap-10 h-1/3"></div>
      </div>
    </div>
  );
};

export default page;
