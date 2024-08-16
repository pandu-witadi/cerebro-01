import React from "react";

interface NavbarProps {
    imageSrc: string;
    title: string;
    subtitle: string;
}

const NavBarLayout: React.FC<NavbarProps> = ({imageSrc, title, subtitle}) => {
    return (
        <div className={'navbar bg-button-verba'}>
            <div className="flex-1 ml-1">
                {/* Logo, Title, Subtitle */}
                <a className="flex flex-row items-center gap-5" href={'/'}>
                    <img src={imageSrc} width={40} className="flex" alt={""}/>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-center lg:gap-3">
                        <p className="sm:text-2xl md:text-3xl text-text-verba">{title}</p>
                        <p className="sm:text-sm text-base text-text-alt-verba font-light">
                            {subtitle}
                        </p>
                    </div>
                </a>
            </div>
            <div className="flex-none mr-1">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-button-verba rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default NavBarLayout