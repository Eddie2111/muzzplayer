import React from 'react';

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';

import { useAuth } from '../contexts/Auth-Context';

export default function Navigation() {
  const { loggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
  'login',
  'signup',
  ];
  console.log(loggedIn)

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            MUZZPLAYER
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            MUZZPLAYER
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {loggedIn ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            
          </NavbarItem>
          <NavbarItem>
            <UserDropdown />
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="warning" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

function UserDropdown(){

  const {toggleLogout} = useAuth();
  function LogOut(): void{
    toggleLogout()
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          className="w-6 h-6 text-tiny"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Settings</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={LogOut}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
