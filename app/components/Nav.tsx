"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RoomSelector from "./RoomSelector";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectRoom,
  selectSearch,
  setSearch,
} from "@/lib/features/filter/filterSlice";
import { filterByRoom } from "@/lib/features/blog/blogSlice";
import React from "react";

export const Nav = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const room = useAppSelector(selectRoom);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: "หน้าแรก", href: "/" },
    { name: "ตั้งกระทู้", href: "/add" },
    { name: "คอมมูนิตี้", href: "/community" },
  ];
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar
        className="w-full lg:px-14 px-2 justify-between"
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <Button variant="light" isIconOnly className="text-white">
            <Bars3Icon width={30} height={30} className="flex sm:hidden" />
          </Button> */}

          <Image src={"/logo.png"} width={30} height={30} alt="logo" />
          <p className="font-bold text-inherit">antip</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {navItems.map((item) => (
            <NavbarItem isActive={pathname === item.href}>
              <Link href={item.href}>{item.name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">เข้าสู่ระบบ</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              สมัครสมาชิก
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="z-[100]">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === navItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.href}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className="flex justify-center sticky md:top-2 top-16 z-50 backdrop-blur-sm bg-background/60 w-full">
        <div className="md:w-1/3 w-2/3 max-w-lg absolute">
          <Input
            label="ค้นหา"
            className="text-secondary"
            endContent={
              <Button
                isIconOnly
                className="rounded-full p-1 bg-primary"
                onClick={() =>
                  dispatch(filterByRoom({ room: room, search: search }))
                }
              >
                <MagnifyingGlassIcon width={25} height={25} />
              </Button>
            }
            value={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
          />
        </div>
      </div>

      <div
        className={`pt-3 lg:px-20 px-2 z-50 backdrop-blur-sm bg-background/60 ${
          scrollPosition < 80
            ? "sticky top-[120px]"
            : "sticky md:top-[64px] top-[120px]"
        }`}
      >
        <RoomSelector />
      </div>
    </>
  );
};
