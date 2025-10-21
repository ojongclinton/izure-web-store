"use client";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiNike } from "react-icons/si";
import { subHeaderTopLinks } from "./constants";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBagDash } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { Dialog, Transition } from "@headlessui/react";


function SubTopHeader() {
    return (
        <motion.div
            className="bg-white px-15 shadow-sm"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex justify-between items-center">
                <motion.div
                    initial={{ rotate: -15, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <SiNike size={60} />
                </motion.div>

                <motion.div
                    className="flex gap-6 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {subHeaderTopLinks.map((singleTopLink, index) => (
                        <TopLinkComponent key={index} singleTopLink={singleTopLink} />
                    ))}
                </motion.div>

                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <SubTopSearch />
                    <IconButton>
                        <IoMdHeartEmpty size={25} />
                    </IconButton>
                    <IconButton>
                        <BsBagDash size={25} />
                    </IconButton>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default SubTopHeader;

const IconButton = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        whileHover={{ scale: 1.2, backgroundColor: "#e5e7eb" }}
        className="p-2 rounded-full cursor-pointer"
    >
        {children}
    </motion.div>
);

const TopLinkComponent = ({ singleTopLink }: { singleTopLink: any }) => {
    const [mouseEntered, setMouseEntered] = useState(false);
    return (
        <div
            onMouseEnter={() => setMouseEntered(true)}
            onMouseLeave={() => setMouseEntered(false)}
        >
            <motion.p
                className="text-[15px] font-semibold cursor-pointer font-[family-name:var(--font-oswald)] tracking-wide"
                whileHover={{ color: "#000", scale: 1.05 }}
            >
                {singleTopLink.title}
            </motion.p>

            <AnimatePresence>
                {mouseEntered && (
                    <LargeSubMenuComponent sublinks={singleTopLink.subLinks} />
                )}
            </AnimatePresence>
        </div>
    );
};

const LargeSubMenuComponent = ({ sublinks }: { sublinks: any }) => {
    return (
        <motion.div
            className="h-fit min-w-screen absolute left-0 top-[90px] px-10 py-5 bg-white z-50 shadow-lg "
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
        >
            <div className="max-w-[800px] mx-auto " >
                <div className="grid grid-cols-4 gap-5">
                    {sublinks.map((sub: any, index: number) => (
                        <div key={index}>
                            <div className="mb-4">
                                <Link
                                    href={sub.topLink}
                                    className="text-[15px] font-semibold cursor-pointer font-[family-name:var(--font-oswald)] tracking-wide"
                                >
                                    {sub.topName}
                                </Link>
                            </div>
                            <div>
                                {sub.subLinks.map((subLink, i: number) => (

                                    <Link
                                        key={i}
                                        href={subLink.link}
                                        className="block text-[15px] cursor-pointer mb-2 text-gray-500 hover:text-black font-[family-name:var(--font-barlow-condensed)] tracking-wide"
                                    >
                                        {subLink.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const SubTopSearch = () => {
    const [searchModalOpen, setSearchModalOpen] = useState(true);
    return (
        <div>
            <SearchModal searchModalOpen={searchModalOpen} setSearchModalOpen={setSearchModalOpen} />
            <motion.div
                onClick={() => setSearchModalOpen(true)}
                className="flex gap-2 items-center bg-gray-100 rounded-full group hover:bg-gray-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
            >
                <motion.p
                    className="rounded-full p-1 group-hover:bg-gray-300"
                    whileHover={{ rotate: 15 }}
                >
                    <CiSearch size={25} />
                </motion.p>
                <p className="pr-20 font-semibold text-gray-600 font-[family-name:var(--font-barlow-condensed)] tracking-wide">Search</p>
            </motion.div>
        </div>
    );
};


function SearchModal({ searchModalOpen, setSearchModalOpen }: { searchModalOpen: boolean, setSearchModalOpen: (open: boolean) => void }) {

    return (
        <>
            <Transition appear show={searchModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setSearchModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 ">
                        <div className="flex w-full text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full transform overflow-hidden bg-white p-6 w-full shadow-xl transition-all">
                                    <div>
                                        <div className="flex justify-between items-top h-[300px]">
                                            <div>
                                                <SiNike size={60} />
                                            </div>
                                            <div className="w-[700px]">

                                                <div className="flex items-center gap-2 bg-gray-100 rounded-full ">
                                                    <CiSearch size={35} className="" />
                                                    <input className="w-full p-2 outline-none" />
                                                </div>
                                                <div className="text-left p-3 mt-6">
                                                    <p className="font-semibold">Popular Search Terms</p>
                                                    <div className="flex gap-2 mt-5 flex-wrap " >
                                                        <p className="cursor-pointer bg-gray-50  p-1 px-3 mr-2 border border-gray-200 rounded-full">hoodies</p>
                                                        <p className="cursor-pointer bg-gray-50  p-1 px-3 mr-2 border border-gray-200 rounded-full">sweatpants</p>
                                                        <p className="cursor-pointer bg-gray-50  p-1 px-3 mr-2 border border-gray-200 rounded-full">jordan</p>
                                                        <p className="cursor-pointer bg-gray-50  p-1 px-3 mr-2 border border-gray-200 rounded-full">air max</p>
                                                        <p className="cursor-pointer bg-gray-50  p-1 px-3 mr-2 border border-gray-200 rounded-full">jordan 4</p>
                                                        <p className="cursor-pointer bg-gray-50  p-1 px-3 mr-2 border border-gray-200 rounded-full">air forces</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p onClick={() => setSearchModalOpen(false)} className="font-semibold cursor-pointer">Cancel</p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
