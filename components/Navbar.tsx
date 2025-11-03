'use client';

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation"; // ✅ added this import

interface NavItemProps {
  children: React.ReactNode;
  index: number;
  menuItem?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, index, menuItem = false, onClick }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    const underline = underlineRef.current;
    if (!item || !underline) return;

    const handleMouseEnter = () =>
      gsap.to(underline, { width: "100%", duration: 0.3, ease: "power2.out", backgroundColor: "#E50914" }); 

    const handleMouseLeave = () =>
      gsap.to(underline, { width: "0%", duration: 0.3, ease: "power2.in" });

    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      item.removeEventListener("mouseenter", handleMouseEnter);
      item.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`nav-item-wrapper relative overflow-hidden cursor-pointer ${
        isEven ? "even-item" : "odd-item"
      } mb-6 md:mb-0`}
    >
      <h1
        className={`transition-colors duration-300 text-lg md:text-[1.2vw] ${
          menuItem ? "text-primary" : "text-light hover:text-accent"
        }`}
      >
        {children}
      </h1>
      <div
        ref={underlineRef}
        className={`underline absolute bottom-0 ${
          isEven ? "left-0" : "right-0"
        } w-0 h-0.5 ${menuItem ? "bg-primary" : "bg-light"} transition-all duration-300 ease-out`}
      ></div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter(); // ✅ router hook for navigation

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const menuElement = menuRef.current;
    const hamburgerElement = hamburgerRef.current;
    if (!menuElement || !hamburgerElement) return;

    if (isMenuOpen) {
      gsap.to(menuElement, { height: "100%", duration: 0.3, ease: "power2.inOut" });
      gsap.to(hamburgerElement, { color: "#E50914", duration: 0.4 }); 
    } else {
      gsap.to(menuElement, { height: "0%", duration: 0.3, ease: "power2.out" });
      gsap.to(hamburgerElement, { color: "#F5F5F5", duration: 0.4 }); 
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ updated: now it just goes back to the previous page
  const scrollToSection = () => {
    router.back();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-300 ease-in-out z-50
        ${visible ? "translate-y-0" : "-translate-y-full"}
        ${prevScrollPos > 0 ? "bg-secondary/70 backdrop-blur-sm" : "bg-transparent"}`}
      >
        <div className="w-full h-[60px] flex items-center justify-between px-4 md:px-14">
          <div className="logo flex items-end relative">
            <h1
              className="text-accent text-2xl md:text-3xl cursor-pointer font-bold"
              onClick={scrollToSection}
            >
              RECfolk
            </h1>
            <span className="lg:text-2xl text-[16px] text-[#ff0000] ml-1">
              ©
            </span>
          </div>

          <div className="hidden md:flex nav-text text-light items-center justify-between gap-8 font-medium text-[1.2vw]">
            <NavItem index={0} onClick={scrollToSection}>Home</NavItem>
            <NavItem index={1} onClick={scrollToSection}>Portfolio</NavItem>
            <NavItem index={2} onClick={scrollToSection}>Studio</NavItem>
            <NavItem index={3} onClick={scrollToSection}>Labs</NavItem>
            <NavItem index={4} onClick={scrollToSection}>Contact</NavItem>
          </div>

          <button
            ref={hamburgerRef}
            className="md:hidden text-light text-2xl focus:outline-none z-50 transition-colors duration-300"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden fixed top-0 left-0 w-full bg-light overflow-hidden transition-all duration-300 ease-in-out z-40"
        style={{ height: "0%" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <NavItem index={0} menuItem onClick={scrollToSection}>Home</NavItem>
          <NavItem index={1} menuItem onClick={scrollToSection}>Portfolio</NavItem>
          <NavItem index={2} menuItem onClick={scrollToSection}>Studio</NavItem>
          <NavItem index={3} menuItem onClick={scrollToSection}>Labs</NavItem>
          <NavItem index={4} menuItem onClick={scrollToSection}>Contact</NavItem>
        </div>
      </div>
    </>
  );
};

export default Navbar;
