"use client";

import { useEffect, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Menu,
  Star,
  X,
} from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { getWhatsAppUrl, siteData, withBasePath } from "@/data/siteData";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nuestra carta", href: "#menu" },
  { label: "Promoción", href: "#promocion" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "¿Dónde le CAEs?", href: "#ubicacion" },
];

function BrandMark() {
  return (
    <a className="brand" href="#inicio" aria-label="CAE Sushi, inicio">
      <Image
        className="brand-logo"
        src={withBasePath(siteData.logo)}
        alt="CAE Sushi"
        width={2100}
        height={1200}
        priority
      />
    </a>
  );
}

function SlideFooter({ showSocials = false }: { showSocials?: boolean }) {
  return (
    <footer className={showSocials ? "slide-footer slide-footer-social" : "slide-footer"}>
      {showSocials && (
        <div className="social-links">
          <span>Nuestras redes sociales</span>
          <a href={siteData.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="CAE Sushi en Facebook">
            <SiFacebook size={18} aria-hidden="true" />
          </a>
          <a href={siteData.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="CAE Sushi en Instagram">
            <SiInstagram size={19} aria-hidden="true" />
          </a>
        </div>
      )}
      <span className="footer-copy">© 2026 CAE Sushi</span>
    </footer>
  );
}

function SiteHeader({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href.slice(1));
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
      <div className="header-inner container">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href.slice(1) ? "active" : undefined}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              onClick={(event) => navigate(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="header-order"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiWhatsapp size={19} aria-hidden="true" />
          <span>¡CAEle por WhatsApp!</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navegación móvil"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                className={activeSection === item.href.slice(1) ? "active" : undefined}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                onClick={(event) => navigate(event, item.href)}
              >
                {item.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
            <a
              className="mobile-order"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiWhatsapp size={19} aria-hidden="true" />
              ¡CAEle por WhatsApp!
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
    <AnimatePresence>
      {!menuOpen && (
        <motion.a
          className="mobile-order-fab"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir por WhatsApp"
          title="Pedir por WhatsApp"
          tabIndex={0}
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          <SiWhatsapp size={25} aria-hidden="true" />
        </motion.a>
      )}
      </AnimatePresence>
    </>
  );
}

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof siteData.menuCategories)[number]>(
    "Todos",
  );
  const [isMounted, setIsMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => setIsMounted(true), []);
  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
    },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 },
    },
  };
  const visibleItems =
    activeCategory === "Todos"
      ? siteData.menuItems
      : siteData.menuItems.filter((item) => item.category === activeCategory);

  function setSpotlight(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const style = event.currentTarget.style as CSSStyleDeclaration & {
      [key: `--${string}`]: string;
    };
    style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section className="menu-section section-space story-slide" id="menu">
      <div className="container">
        <div className="section-heading menu-heading">
          <div>
            <p className="eyebrow"><span /> Fresco, hecho al momento</p>
            <h2>Una carta para<br /><em>comer a lo culichi.</em></h2>
          </div>
          <p className="section-intro">
            Rollos bien servidos, sabores intensos y el sazón culichi de CAE, preparados al momento para hacerle caso al antojo.
          </p>
        </div>

        <div className="menu-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Filtrar menú por categoría">
            {siteData.menuCategories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "category-tab active" : "category-tab"}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                {activeCategory === category && (
                  <motion.span
                    className="tab-indicator"
                    layoutId="tab-indicator"
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="menu-grid"
            variants={listVariants}
            initial="hidden"
            whileInView={isMounted ? "visible" : undefined}
            viewport={{ once: true, amount: 0.12 }}
            exit="hidden"
            key={activeCategory}
          >
            {visibleItems.map((item, index) => (
              <motion.article
                key={item.name}
                className={`menu-card${index === 0 && activeCategory === "Todos" ? " menu-card-featured" : ""}`}
                variants={cardVariants}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                onMouseMove={setSpotlight}
                style={{ "--card-image": `url("${withBasePath(item.image)}")` } as CSSProperties}
              >
                <div className="menu-image" role="img" aria-label={item.imageAlt}>
                  {item.tag && <span className="menu-tag">{item.tag}</span>}
                  <span className="menu-image-index">0{index + 1}</span>
                </div>
                <div className="menu-card-copy">
                  <div className="menu-card-title-row">
                    <div>
                      <span className="menu-category-label">{item.category}</span>
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
        <p className="data-note">{siteData.menuNote}</p>
      </div>
      <SlideFooter />
    </section>
  );
}

function PromotionSection() {
  return (
    <section className="promotion-section section-space story-slide" id="promocion">
      <div className="container">
        <div className="promotion-panel">
          <div
            className="promotion-art"
            aria-hidden="true"
            style={{ "--promotion-image": `url("${withBasePath(siteData.promotionImage)}")` } as CSSProperties}
          >
            <div className="promotion-photo" />
            <span className="promotion-stamp">CAE<br />SUSHI</span>
          </div>
          <div className="promotion-copy">
            <p className="eyebrow eyebrow-light"><span /> {siteData.promotion.label}</p>
            <h2>{siteData.promotion.title}</h2>
            <p>{siteData.promotion.description}</p>
            <span className="promotion-footnote">La promoción vigente se confirma directamente con el restaurante.</span>
          </div>
        </div>
      </div>
      <SlideFooter />
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="reviews-section section-space story-slide" id="opiniones">
      <div className="container">
        <div className="reviews-heading">
          <div>
            <p className="eyebrow"><span /> Lo que cuentan en Google</p>
            <h2>Buen sushi.<br /><em>Buena compañía.</em></h2>
          </div>
          <a className="google-rating" href={siteData.googleReviews.url} target="_blank" rel="noopener noreferrer">
            <span className="rating-score">{siteData.googleReviews.rating}</span>
            <span className="rating-detail">
              <span className="rating-stars" aria-label={`${siteData.googleReviews.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" aria-hidden="true" />)}
              </span>
              <span>Google · {siteData.googleReviews.count} opiniones</span>
            </span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="review-grid">
          {siteData.googleReviews.excerpts.map((review) => (
            <article className="review-card" key={review.author}>
              <div className="review-stars" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill="currentColor" aria-hidden="true" />)}
              </div>
              <blockquote>“{review.quote}”</blockquote>
              <div className="review-author">
                <strong>{review.author}</strong>
                <span>{review.date} · Google</span>
              </div>
            </article>
          ))}
        </div>
        <a className="text-link all-reviews-link" href={siteData.googleReviews.url} target="_blank" rel="noopener noreferrer">
          Leer opiniones en Google <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <SlideFooter />
    </section>
  );
}

function LocationSection() {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteData.address)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.address)}`;

  return (
    <section className="location-section section-space story-slide" id="ubicacion">
      <div className="container location-layout">
        <div className="location-copy">
          <p className="eyebrow"><span /> ¿Dónde le CAEs?</p>
          <h2>Un toque del norte<br /><em>en Cholula.</em></h2>
          <p className="location-intro">El sazón del norte encontró su lugar en Cholula. Pasa por tu pedido o escríbenos antes de venir.</p>
          <div className="address-block">
            <span className="address-icon"><MapPin size={19} aria-hidden="true" /></span>
            <div>
              <span className="address-label">CAE Sushi · Cholula</span>
              <address>{siteData.address}</address>
            </div>
          </div>
          <a className="button button-primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            Cómo llegar <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="map-frame">
          <iframe
            title="Ubicación de CAE Sushi en San Andrés Cholula"
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a className="map-caption" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <span><MapPin size={16} aria-hidden="true" /> San Andrés Cholula, Puebla</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <SlideFooter showSocials />
    </section>
  );
}

export function SiteExperience() {
  const [activeSection, setActiveSection] = useState("inicio");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const deck = document.querySelector<HTMLElement>(".story-deck");
    if (!deck) return;

    const slides = Array.from(deck.querySelectorAll<HTMLElement>(".story-slide"));
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const deckCenter = deck.getBoundingClientRect().left + deck.clientWidth / 2;
        const activeSlide = slides.reduce((closest, slide) => {
          const closestDistance = Math.abs(
            closest.getBoundingClientRect().left + closest.clientWidth / 2 - deckCenter,
          );
          const slideDistance = Math.abs(
            slide.getBoundingClientRect().left + slide.clientWidth / 2 - deckCenter,
          );
          return slideDistance < closestDistance ? slide : closest;
        });
        setActiveSection(activeSlide.id);
      });
    };

    deck.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();
    return () => {
      deck.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      cancelAnimationFrame(frame);
    };
  }, []);

  function handleDeckKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if ((event.target as HTMLElement).closest("a, button, input, textarea, select")) return;

    const slides = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(".story-slide"));
    const currentIndex = slides.findIndex((slide) => slide.id === activeSection);
    const nextIndex = currentIndex + (event.key === "ArrowRight" ? 1 : -1);
    if (!slides[nextIndex]) return;

    event.preventDefault();
    event.currentTarget.scrollTo({
      left: event.currentTarget.scrollLeft + event.currentTarget.clientWidth * (nextIndex - currentIndex),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function navigateToSection(sectionId: string) {
    const deck = document.querySelector<HTMLElement>(".story-deck");
    const section = document.getElementById(sectionId);
    if (!deck || !section) return;

    setActiveSection(sectionId);
    history.replaceState(null, "", `#${sectionId}`);
    const offset = section.getBoundingClientRect().left - deck.getBoundingClientRect().left;
    deck.scrollTo({
      left: deck.scrollLeft + offset,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <>
      <SiteHeader activeSection={activeSection} onNavigate={navigateToSection} />
      <main
        className="story-deck"
        tabIndex={0}
        aria-label="Secciones del sitio. Usa las flechas izquierda y derecha para cambiar de sección."
        onKeyDown={handleDeckKeyDown}
      >
        <section className="hero-section story-slide" id="inicio">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Sushi estilo culichi · Cholula</p>
              <h1>¿Antojo de sushi?<br /><em>¡CAEle por el tuyo!</em></h1>
              <p className="hero-description">Sushi preparado al momento, con el sazón culichi y el toque de CAE para que cada antojo valga la vuelta.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#menu">Explorar la carta <ArrowDown size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="hero-visual">
              <div
                className="hero-photo"
                role="img"
                aria-label="Sushi fresco preparado para compartir"
                style={{ "--hero-image": `url("${withBasePath(siteData.heroImage)}")` } as CSSProperties}
              />
              <div className="hero-photo-caption">
                <span>Crujiente por fuera, brutal por dentro.</span>
                <span>CAE / 01</span>
              </div>
              <div className="hero-side-note">FRESCO<br />& HECHO<br />AL MOMENTO</div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>Un antojo, muchas formas de disfrutarlo</span>
            <span className="hero-bottom-rule" />
            <span>San Andrés Cholula, Pue.</span>
          </div>
          <SlideFooter />
        </section>

        <MenuSection />
        <PromotionSection />
        <ReviewsSection />
        <LocationSection />
      </main>
    </>
  );
}