import React, { useState } from "react";
import { Link } from "react-scroll";

const Nav = () => {
  const Links = [
    { name: "SERVICE", link: "service", offset: -100 },
    { name: "OFFERS", link: "offers", offset: -90 },
    { name: "MENU", link: "menu", offset: -55 },
    { name: "REVIEWS", link: "say", offset: -150 },
    { name: "CONTACT", link: "footer", offset: 0 },
  ];

  const Socials = [
    {
      icon: "logo-instagram",
      link: "https://instagram.com/artcafe_ksa?igshid=zv6jgtvq08t4",
    },
    { icon: "logo-twitter", link: "https://twitter.com/@Artcafe123456" },
    {
      icon: "logo-tiktok",
      link: "https://www.tiktok.com/@artcafe6?_t=8ZjZrarR8wU&_r=1",
    },
    { icon: "mail", link: "mailto:artcafe-ksa@outlook.com" },
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-lg shadow-zinc-500 w-full fixed top-0 left-0 z-50">
      <div className="flex bg-black py-4 md:px-10 px-7 lg:justify-between">
        <div className="font-bold text-white text-2xl cursor-pointer flex items-center font-Poppins">
          <span className="mr-2">
            <div className="bg-black w-12 h-12 border-2 border-white rounded-full overflow-hidden">
              <img
                src="./art-cafe-logo.jpg"
                className="h-full object-contain "
                alt="art-cafe-logo"
              />
            </div>
          </span>
          <Link
            to="hero"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="hover:text-gray-400 text-xl md:text-2xl scroll-smooth transition-all duration-500"
          >
            The Art Café
          </Link>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl text-white cursor-pointer hover:text-gray-400 hover:scale-150 transition duration-500 absolute md:right-9 top-5 right-5 lg:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <ul
          className={`lg:flex lg:flex-1 lg:justify-center text-white lg:items-center absolute lg:static left-0 lg:z-auto z-[-1] lg:shadow-none shadow-lg shadow-gray-500 bg-black lg:w-auto w-full lg:pb-0 pb-5 lg:pl-0 pl-9 lg:transition  duration-500 ease ${
            open ? "top-20" : "top-[-500px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="lg:px-6 cursor-pointer text-white text-l font-Poppins font-bold lg:my-0 my-4 "
            >
              <Link
                to={link.link}
                spy={true}
                smooth={true}
                offset={link.offset}
                duration={500}
                className="hover:text-gray-400 transition-all duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center md:ml-0 ml-2">
          {Socials.map((social) => (
            <li key={social.icon} className="md:ml-6 ml-2 ">
              <a
                href={social.link}
                target="_blank"
                className="text-white text-l md:text-xl hover:text-gray-400 transition-all duration-300"
              >
                <ion-icon name={social.icon}></ion-icon>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
