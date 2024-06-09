import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook,BsInstagram, BsTwitter, BsDiscord } from 'react-icons/bs'
const FooterComp = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className="flex flex-col justify-between sm:flex-row gap-4">
                <div className="mt-5">
                    <Link
                        to="/"
                        className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
                        >
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Saksham's
                        </span>
                        blog
                    </Link>
                </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                    <Footer.Title title="About"></Footer.Title>
                    <Footer.LinkGroup className='flex flex-col gap-3'>
                        <Footer.Link href=''>Portfolio</Footer.Link>
                        <Footer.Link href=''>Saksham's Blog</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title='Follow us'></Footer.Title>
                    <Footer.LinkGroup className='flex flex-col gap-3'>
                        <Footer.Link href=''>Github</Footer.Link>
                        <Footer.Link href=''>Discord</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title='legal'></Footer.Title>
                    <Footer.LinkGroup className='flex flex-col gap-3'>
                        <Footer.Link href=''>Privacy Policy</Footer.Link>
                        <Footer.Link href=''>Terms &amp; conditions</Footer.Link>
                    </Footer.LinkGroup>
                </div>
            </div>
        </div>
        <Footer.Divider />
        <div className="flex flex-col justify-between sm:flex-row gap-4">
            <Footer.Copyright href='#' by="Saksham's Blog" year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook}/>
                <Footer.Icon href="#" icon={BsInstagram}/>
                <Footer.Icon href="#" icon={BsTwitter}/>
                <Footer.Icon href="#" icon={BsDiscord}/>
            </div>
        </div>
    </div>
    </Footer>
  )
}

export default FooterComp