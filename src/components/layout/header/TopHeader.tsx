"use client";

import React, { useState } from 'react'
import { SiJordan } from "react-icons/si";
import { BiSolidChevronRight } from "react-icons/bi";
import { IoStar } from "react-icons/io5";
import Link from 'next/link'

const helpSub = {
    title: "Help",
    subs: [
        {
            title: "Order status", link: "/"
        },
        {
            title: "Delivery", link: "/"
        },
        {
            title: "Returns", link: "/"
        },
        {
            title: "Payment Options", link: "/"
        },
        {
            title: "Contact Us", link: "/"
        },
        {
            title: "Promotions & discounts", link: "/"
        },
        {
            title: "Products Advice", link: "/"
        },
        {
            title: "Send a feedback", link: "/"
        },
    ]
}

function TopHeader() {
    return (
        <div className='bg-[#F1F1F1] p-1' >
            <div className='flex justify-between items-center px-15'>
                <div className='flex gap-6 items-center'>
                    <div>
                        <SiJordan size={15} />
                    </div>
                    <div className='flex gap-[3px] items-center'>
                        <IoStar size={10} className='-mr-2 -mt-[2px]' />
                        <BiSolidChevronRight size={25} />

                    </div>
                </div>
                <div className='flex gap-3 items-center '>
                    <TopHeaderLink href='/' name="findStore">Find a store</TopHeaderLink>
                    <p>|</p>
                    <TopHeaderLink href='/' name="help">Help</TopHeaderLink>
                    <p>|</p>
                    <TopHeaderLink href='/' name="joinUs">Join Us</TopHeaderLink>
                    <p>|</p>
                    <TopHeaderLink href='/' name="signIn">Sign In</TopHeaderLink>
                </div>
            </div>
        </div>
    )
}

export default TopHeader



const TopHeaderLink = ({ children, href, name }: { children: React.ReactNode, href: string, name: string }) => {
    const [mounseInside, setMounseInside] = useState(false)
    const handleMouseEnter = () => {
        if (name === "help") {
            setMounseInside(true)
        }
    }
    const handleMouseLeave = () => {
        if (name === "help" && mounseInside) {
            setMounseInside(false)
        }
    }


    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
        >
            <Link
                href={href}
                className="text-[13px] font-semibold hover:text-gray-500 transition-colors"
            >
                {children}
            </Link>

            <div
                className={`!w-[250px] absolute top-[26px] right-[10px] h-fit bg-white z-10 p-5 rounded-lg shadow-md
      transition-all duration-200 transform origin-top-right
      ${mounseInside && name === "help" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
                <p className="text-lg pb-[20px] text-black font-semibold">{helpSub.title}</p>
                <div>
                    {helpSub.subs.map((sub) => (
                        <p key={sub.title} className="pb-[5px]">
                            <Link
                                href={sub.link}
                                className="text-sm font-semibold hover:text-black text-gray-500 transition-colors"
                            >
                                {sub.title}
                            </Link>
                        </p>
                    ))}
                </div>
            </div>
        </div>

    )
}
