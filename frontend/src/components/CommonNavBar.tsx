import { ReactElement } from "react";
import NextLink from "next/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { RiHome3Fill } from "react-icons/ri";

interface CommonNavBarProps {
  title?: string;
  actionComponents?: ReactElement[]
}

export const CommonNavBar = ({ title, actionComponents = [] }: CommonNavBarProps) => {

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/user">
            <p className="hidden sm:flex font-bold text-inherit">Share Account Book</p>
            <RiHome3Fill size={30} className="flex sm:hidden" />
          </NextLink>
        </NavbarBrand>
        <NavbarItem className="gap-4">
          {title}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="basis-1/5 sm:basis-full"
        justify="end"
      >
        {actionComponents?.map((actionComp, index) =>
          <NavbarItem key={index} className="flex gap-2">
            {actionComp}
          </NavbarItem>
        )}
      </NavbarContent>

    </NextUINavbar>
  )
}