import React from "react";
import { FaRegUser } from "react-icons/fa";
import {useRouter} from "next/navigation";

interface NavbarProps {
    imageSrc: string;
    title: string;
    subtitle: string;
}

const NavBarLayout: React.FC<NavbarProps> = ({imageSrc, title, subtitle}) => {
    const router = useRouter();
    const logout = () => {
        console.log('delete user cache');
        console.log('set the default user to guest');
        console.log('redirect to default guest page')
        router.push('/');
    }

    return (
        <div className={'navbar shadow bg-base-300'}>
            <div className="flex-1 ml-1">
                {/* Logo, Title, Subtitle */}
                <a className="flex flex-row items-center gap-5" href={'/'}>
                    <img src={imageSrc} width={40} className="flex" alt={""}/>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-center lg:gap-3">
                        <p className="sm:text-2xl md:text-3xl">{title}</p>
                        <p className="sm:text-sm text-base font-light">
                            {subtitle}
                        </p>
                    </div>
                </a>
            </div>
            <div className="flex-none mr-1">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button"  className="avatar w-10 online placeholder">
                        <div className="bg-neutral text-neutral-content w-16 rounded-full">
                            <FaRegUser />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-base-200">
                        {/*<li><a>Workspace</a></li>*/}
                        <li><a href={'/settings'}>Settings</a></li>
                        <li><a onClick={() => logout()}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default NavBarLayout