import React from "react";

const Footer = () => {
  return (
    <div className="bg-zinc-800 w-full text-white" id="footer">
      <div className="p-10 hidden md:block">
        <div className="grid w-full grid-cols-3 border-b-4">
          <div className=" p-6 gap-4  flex justify-center items-center">
            <div className=" text-2xl bg-gray-400 rounded-full h-12 w-12 flex justify-center items-center">
              <ion-icon name="call"></ion-icon>
            </div>
            <p className="text-sm">+63-565-1111</p>
          </div>
          <div className=" p-6 gap-4  flex justify-center items-center">
            <div className=" text-2xl bg-gray-400 rounded-full h-12 w-12 flex justify-center items-center">
              <ion-icon name="mail"></ion-icon>
            </div>
            <p className="text-sm">artcafe-ksa@outlook.com</p>
          </div>
          <div className=" p-6 gap-4 flex justify-center items-center">
            <div className=" text-2xl bg-gray-400 rounded-full h-12 w-12 flex justify-center items-center">
              <ion-icon name="location"></ion-icon>
            </div>
            <ul className="text-xs leading-relaxed">
              <li className="hover:text-zinc-400 duration-500">
                <a href="">Jeddah Park</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="">Riyadh-U-Walk</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="">Dhahran - Dhahran Mall</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="">Dammam - Nakheel Mall</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="">Al-khobar - Southern Rakah</a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className=" mt-10 h-60 border-2 grid grid-cols-4 justify-center items-center">
          <div className="m-auto">
            <h1 className="font-bold mb-2">About</h1>
            <ul className="font-extralight text-sm">
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Our Story</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Awards</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Our Team</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Career</a>
              </li>
            </ul>
          </div>
          <div className="m-auto">
            <h1 className="font-bold mb-2">Company</h1>
            <ul className="font-extralight text-sm">
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Our Services</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Clients</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Contact</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Press</a>
              </li>
            </ul>
          </div>
          <div className="m-auto">
            <h1 className="font-bold mb-2">Resources</h1>
            <ul className="font-extralight text-sm ">
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Blog</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Newsletter</a>
              </li>
              <li className="hover:text-zinc-400 duration-500">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h1 className="font-bold mb-2">Reserve a Table</h1>
            <div className="relative w-fit">
              <input
                className="py-2 pr-12 pl-4 w-full text-black rounded-full focus:outline-none"
                type="email"
                placeholder="Email"
              />
              <div className="text-white flex cursor-pointer duration-500 justify-center items-center hover:bg-black py-3 px-3 rounded-full text-sm absolute top-[1px] right-[2px] bg-gray-400">
                <ion-icon name="arrow-forward"></ion-icon>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="py-8 md:py-10 bg-zinc-700 w-full text-white flex flex-col gap-2 justify-center items-center">
        <div className="flex gap-4">
          <div className="text-2xl md:text-4xl">
            <ion-icon name="logo-twitter"></ion-icon>
          </div>
          <div className="text-2xl md:text-4xl">
            <ion-icon name="logo-facebook"></ion-icon>
          </div>
          <div className="text-2xl md:text-4xl">
            <ion-icon name="logo-instagram"></ion-icon>
          </div>
          <div className="text-2xl md:text-4xl">
            <ion-icon name="logo-tiktok"></ion-icon>
          </div>
        </div>
        <p className="text-xs font-extralight md:text-sm md:font-light">
          © 2024 The Art Café. All Right Reserve
        </p>
      </div>
    </div>
  );
};

export default Footer;
