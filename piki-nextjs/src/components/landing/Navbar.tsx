'use client'

import { useEffect, useState, useRef } from 'react'

const NAV_SECTIONS = ['system', 'services', 'metrics', 'pricing', 'faq']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navLinksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Active section detection
      let current = ''
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) {
          current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMenuOpen(false)
    }
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          PIKI<span className="logo-dot">.</span>
        </a>
        <div ref={navLinksRef} className={`nav-links${menuOpen ? ' active' : ''}`}>
          <a href="#system" className={activeSection === 'system' ? 'nav-active' : ''} onClick={(e) => handleNavClick(e, '#system')}>시스템</a>
          <a href="#services" className={activeSection === 'services' ? 'nav-active' : ''} onClick={(e) => handleNavClick(e, '#services')}>서비스</a>
          <a href="#metrics" className={activeSection === 'metrics' ? 'nav-active' : ''} onClick={(e) => handleNavClick(e, '#metrics')}>데이터</a>
          <a href="#pricing" className={activeSection === 'pricing' ? 'nav-active' : ''} onClick={(e) => handleNavClick(e, '#pricing')}>가격</a>
          <a href="#faq" className={activeSection === 'faq' ? 'nav-active' : ''} onClick={(e) => handleNavClick(e, '#faq')}>FAQ</a>
        </div>
        <a href="#contact" className="nav-cta" onClick={(e) => handleNavClick(e, '#contact')}>무료 진단받기</a>
        <button
          className={`mobile-menu-btn${menuOpen ? ' active' : ''}`}
          aria-label="메뉴"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}
