import LogoImage from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { HeaderContainer } from "../styles/components/header";
import { Cart } from "./Cart";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={LogoImage} alt="" />
      </Link>

      <Cart />
    </HeaderContainer>
  );
}
