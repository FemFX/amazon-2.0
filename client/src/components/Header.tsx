import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Search from "./Search";
import { AiOutlineHeart } from "react-icons/ai";
import HeaderProfile from "./HeaderProfile";
import HeaderCart from "./cart/HeaderCart";
// import HeaderCart from "./cart/HeaderCart";

export interface IHeaderProps {}
const Header: FC<IHeaderProps> = ({}) => {
  return (
    <header
      className="bg-secondary w-full p-6 grid"
      style={{
        gridTemplateColumns: "1fr 3fr 1.2fr",
      }}
    >
      <Link href="/">
        {/* <Image priority width={180} height={37} src="/images/logo.svg" alt="Amazon" /> */}
        <h1 className="font-bold text-white text-xl">Amazon</h1>
      </Link>
      <Search />
      <div className="flex items-center justify-end gap-10">
        <Link href="/favorites" className="text-white">
          <AiOutlineHeart size={28} />
        </Link>
        <HeaderCart />
        <HeaderProfile />
      </div>
    </header>
  );
};
export default Header;
