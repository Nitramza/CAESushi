"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Minus, Plus, X } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { getWhatsAppUrl, siteData, withBasePath } from "@/data/siteData";

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

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof siteData.menuCategories)[number]>(
    "Todos",
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [orderOpen, setOrderOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<(typeof siteData.menuItems)[number] | null>(null);
  const [previewDirection, setPreviewDirection] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
    },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 },
    },
  };
  const visibleCategories = siteData.menuCategories.filter(
    (category) => category !== "Todos" && (activeCategory === "Todos" || category === activeCategory),
  );

  function getItemId(item: (typeof siteData.menuItems)[number]) {
    return `${item.category}-${item.name}`;
  }

  const selectedItems = siteData.menuItems.filter((item) => quantities[getItemId(item)] > 0);
  const orderCount = selectedItems.reduce((total, item) => total + quantities[getItemId(item)], 0);
  const getUnitPrice = (item: (typeof siteData.menuItems)[number]) =>
    Number(item.price.replace(/[^0-9]/g, ""));
  const orderTotal = selectedItems.reduce(
    (total, item) => total + getUnitPrice(item) * quantities[getItemId(item)],
    0,
  );
  useEffect(() => {
    if (selectedItems.length === 0) return;

    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Tu selección se perderá si actualizas o sales de la página.";
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [selectedItems.length]);

  const orderMessage = selectedItems.length
    ? [
        "Hola, CAE. Quiero pedir para recoger:",
        "",
        ...selectedItems.map((item) => {
          const quantity = quantities[getItemId(item)];
          const subtotal = getUnitPrice(item) * quantity;
          return `• ${quantity} × ${item.name} (${item.price} c/u) — $${subtotal}`;
        }),
        "",
        `Total estimado: $${orderTotal} MXN`,
        "¿Me confirman el total y a qué hora puedo pasar?",
      ].join("\n")
    : "";

  function toggleItem(item: (typeof siteData.menuItems)[number]) {
    const itemId = getItemId(item);
    setQuantities((current) => {
      const next = { ...current };
      if (next[itemId]) delete next[itemId];
      else next[itemId] = 1;
      return next;
    });
  }

  function changeQuantity(item: (typeof siteData.menuItems)[number], amount: number) {
    const itemId = getItemId(item);
    if (orderOpen && amount < 0 && selectedItems.length === 1 && quantities[itemId] === 1) {
      setOrderOpen(false);
    }
    setQuantities((current) => {
      const nextQuantity = Math.max(0, Math.min(20, (current[itemId] || 0) + amount));
      const next = { ...current };
      if (nextQuantity === 0) delete next[itemId];
      else next[itemId] = nextQuantity;
      return next;
    });
  }

  function getItemSummary(item: (typeof siteData.menuItems)[number]) {
    return item.description || item.topping || [item.inside, item.outside].filter(Boolean).join(" · ");
  }

  const previewItems = siteData.menuItems.filter(
    (item) => activeCategory === "Todos" || item.category === activeCategory,
  );
  const previewIndex = previewItem
    ? previewItems.findIndex((item) => getItemId(item) === getItemId(previewItem))
    : -1;

  function movePreview(direction: number) {
    if (!previewItem || previewItems.length < 2) return;
    const nextIndex = (previewIndex + direction + previewItems.length) % previewItems.length;
    setPreviewDirection(direction);
    setPreviewItem(previewItems[nextIndex]);
  }

  function setSpotlight(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const style = event.currentTarget.style as CSSStyleDeclaration & {
      [key: `--${string}`]: string;
    };
    style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section className="menu-section section-space" id="menu">
      <div className="container">
        <div className="section-heading menu-heading">
          <div>
            <p className="eyebrow"><span /> Precios en MXN</p>
            <h2>Menú</h2>
          </div>
          <p className="section-intro">
            Elige una categoría o recorre la carta completa de CAE Sushi.
          </p>
        </div>

        <div className="menu-browser">
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
                {activeCategory === category && <span className="tab-indicator" />}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="menu-groups"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key={activeCategory}
          >
            {visibleCategories.map((category) => {
              const items = siteData.menuItems.filter((item) => item.category === category);
              return (
                <motion.section className="menu-group" key={category} variants={cardVariants}>
                  <div className="menu-group-heading">
                    <h3>{category}</h3>
                    <span>{items.length} productos</span>
                  </div>
                  <div className="menu-grid">
                    {items.map((item) => {
                      const itemId = getItemId(item);
                      const quantity = quantities[itemId] || 0;
                      const isSelected = quantity > 0;
                      return (
                      <motion.article
                        key={itemId}
                        className={isSelected ? "menu-card selected" : "menu-card"}
                        variants={cardVariants}
                        whileHover={reduceMotion ? undefined : { y: -3 }}
                        onMouseMove={setSpotlight}
                        style={{ "--card-image": `url("${withBasePath(item.image)}")` } as CSSProperties}
                      >
                        <label className="menu-select" title={`Seleccionar ${item.name}`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleItem(item)}
                            aria-label={`Agregar ${item.name} al pedido`}
                          />
                          <span aria-hidden="true" />
                        </label>
                        <button
                          className="menu-image"
                          type="button"
                          onClick={() => {
                            setPreviewDirection(0);
                            setPreviewItem(item);
                          }}
                          aria-label={`Ver detalles de ${item.name}`}
                          style={{ "--card-image": `url("${withBasePath(item.image)}")` } as CSSProperties}
                        />
                        <div className="menu-card-copy">
                          <div className="menu-card-title-row">
                            <h4>{item.name}</h4>
                          </div>
                          <p className="menu-summary">{getItemSummary(item)}</p>
                          <div className="menu-card-meta">
                            {isSelected ? (
                              <span className="menu-selected-copy">{quantity} en tu pedido</span>
                            ) : item.tag ? <span className="menu-tag">{item.tag}</span> : <span />}
                            <span className="menu-price">{item.price}</span>
                          </div>
                        </div>
                      </motion.article>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}
          </motion.div>
        </AnimatePresence>
        <div className="menu-bottom-row">
          <p className="data-note">{siteData.menuNote}</p>
        </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedItems.length > 0 && !previewItem && !orderOpen && (
          <motion.button
            className="order-fab button button-primary"
            type="button"
            onClick={() => setOrderOpen(true)}
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
          >
            <SiWhatsapp size={19} aria-hidden="true" />
            <span>Revisar pedido</span>
            <span className="order-count" aria-label={`${orderCount} productos seleccionados`}>
              {orderCount}
            </span>
          </motion.button>
        )}
        {previewItem && (
          <motion.div
            className="product-preview-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPreviewItem(null);
            }}
          >
            <motion.div
              className="product-preview"
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-preview-title"
              onKeyDown={(event) => {
                if (event.key === "Escape") setPreviewItem(null);
              }}
              tabIndex={-1}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                className="product-preview-close"
                type="button"
                onClick={() => setPreviewItem(null)}
                aria-label="Cerrar vista del producto"
              >
                <X size={21} aria-hidden="true" />
              </button>
              <button
                className="product-preview-nav product-preview-nav-previous"
                type="button"
                onClick={() => movePreview(-1)}
                aria-label="Ver producto anterior"
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button
                className="product-preview-nav product-preview-nav-next"
                type="button"
                onClick={() => movePreview(1)}
                aria-label="Ver producto siguiente"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
              <span className="product-preview-position" aria-live="polite">
                {previewIndex + 1} / {previewItems.length}
              </span>
              {selectedItems.length > 0 && (
                <button
                  className="preview-order-fab"
                  type="button"
                  onClick={() => {
                    setPreviewItem(null);
                    setOrderOpen(true);
                  }}
                  aria-label={`Revisar pedido con ${orderCount} productos`}
                >
                  <SiWhatsapp size={21} aria-hidden="true" />
                  <span>{orderCount}</span>
                </button>
              )}
              <AnimatePresence mode="wait" custom={previewDirection}>
                <motion.div
                  className="product-preview-slide"
                  key={getItemId(previewItem)}
                  custom={previewDirection}
                  variants={{
                    enter: (direction: number) => ({ opacity: 0, x: direction === 0 ? 0 : direction * 72 }),
                    center: { opacity: 1, x: 0 },
                    exit: (direction: number) => ({ opacity: 0, x: direction === 0 ? 0 : direction * -72 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 28 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) movePreview(1);
                    else if (info.offset.x > 60) movePreview(-1);
                  }}
                >
                  <div className="product-preview-stage">
                    <div
                      className="product-preview-image"
                      role="img"
                      aria-label={previewItem.imageAlt}
                      style={{ "--preview-image": `url("${withBasePath(previewItem.image)}")` } as CSSProperties}
                    />
                  </div>
                  <div className="product-preview-copy">
                    <span className="product-preview-category">{previewItem.category}</span>
                    <div className="product-preview-title-row">
                      <h2 id="product-preview-title">{previewItem.name}</h2>
                      <strong>{previewItem.price}</strong>
                    </div>
                    {previewItem.description && <p className="product-preview-description">{previewItem.description}</p>}
                    <div className="product-preview-details">
                      {previewItem.inside && <p><strong>Por dentro</strong><span>{previewItem.inside}</span></p>}
                      {previewItem.outside && <p><strong>Por fuera</strong><span>{previewItem.outside}</span></p>}
                      {previewItem.topping && <p><strong>Topping / terminado</strong><span>{previewItem.topping}</span></p>}
                    </div>
                    {previewItem.tag && <span className="product-preview-tag">{previewItem.tag}</span>}
                    <div className="product-preview-order">
                      {quantities[getItemId(previewItem)] > 0 ? (
                        <>
                          <span>Cantidad en tu pedido</span>
                          <div className="quantity-control quantity-control-large">
                            <button
                              type="button"
                              onClick={() => changeQuantity(previewItem, -1)}
                              aria-label={`Quitar uno de ${previewItem.name}`}
                            >
                              <Minus size={17} aria-hidden="true" />
                            </button>
                            <span aria-live="polite">{quantities[getItemId(previewItem)]}</span>
                            <button
                              type="button"
                              onClick={() => changeQuantity(previewItem, 1)}
                              aria-label={`Agregar uno más de ${previewItem.name}`}
                            >
                              <Plus size={17} aria-hidden="true" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <button className="button button-primary" type="button" onClick={() => toggleItem(previewItem)}>
                          Agregar a mi pedido
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
        {orderOpen && selectedItems.length > 0 && (
          <motion.div
            className="order-modal-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOrderOpen(false);
            }}
          >
            <motion.div
              className="order-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-modal-title"
              onKeyDown={(event) => {
                if (event.key === "Escape") setOrderOpen(false);
              }}
              tabIndex={-1}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="order-modal-heading">
                <div>
                  <span>Pedido para recoger</span>
                  <h2 id="order-modal-title">Revisa tu pedido</h2>
                </div>
                <button type="button" onClick={() => setOrderOpen(false)} aria-label="Cerrar resumen del pedido">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <div className="order-lines">
                {selectedItems.map((item) => {
                  const itemId = getItemId(item);
                  const quantity = quantities[itemId];
                  return (
                    <div className="order-line" key={itemId}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.price} c/u</span>
                      </div>
                      <div className="order-line-controls">
                        <div className="quantity-control">
                          <button type="button" onClick={() => changeQuantity(item, -1)} aria-label={`Quitar uno de ${item.name}`}>
                            <Minus size={14} aria-hidden="true" />
                          </button>
                          <span>{quantity}</span>
                          <button type="button" onClick={() => changeQuantity(item, 1)} aria-label={`Agregar uno más de ${item.name}`}>
                            <Plus size={14} aria-hidden="true" />
                          </button>
                        </div>
                        <strong>${getUnitPrice(item) * quantity}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="order-total">
                <span>Total estimado</span>
                <strong>${orderTotal} MXN</strong>
              </div>
              <p className="order-note">El restaurante confirmará disponibilidad y total final.</p>
              <a
                className="button button-primary order-confirm"
                href={getWhatsAppUrl(orderMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp size={19} aria-hidden="true" />
                Confirmar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PromotionSection() {
  return (
    <section className="promotion-section section-space" id="promocion">
      <div className="container">
        <div className="promotion-panel">
          <div
            className="promotion-art"
            aria-hidden="true"
            style={{ "--promotion-image": `url("${withBasePath(siteData.promotionImage)}")` } as CSSProperties}
          >
            <div className="promotion-photo" />
          </div>
          <div className="promotion-copy">
            <p className="eyebrow eyebrow-light"><span /> {siteData.promotion.label}</p>
            <h2>{siteData.promotion.title}</h2>
            <strong className="promotion-offer">{siteData.promotion.offer}</strong>
            <p>{siteData.promotion.description}</p>
            <span className="promotion-footnote">{siteData.promotion.footnote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteData.address)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.address)}`;

  return (
    <section className="location-section section-space" id="ubicacion">
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
            Cómo llegar
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
    </section>
  );
}

export function SiteExperience() {
  return (
    <main className="site-content">
        <section
          className="hero-section"
          id="inicio"
          style={{ "--hero-background": `url("${withBasePath(siteData.heroImage)}")` } as CSSProperties}
        >
          <a className="hero-logo" href="#inicio" aria-label="CAE Sushi, inicio">
            <Image
              src={withBasePath(siteData.logo)}
              alt="CAE Sushi"
              width={2100}
              height={1200}
              priority
            />
          </a>
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Sushi estilo culichi · Cholula</p>
              <h1>Rollos de Sushi<br /><em>que sí llenan</em></h1>
              <div className="hero-actions">
                <a className="button button-primary" href="#menu">Ver menú</a>
                <a
                  className="button button-whatsapp"
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp size={18} aria-hidden="true" />
                  Pedir para recoger
                </a>
              </div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>Un antojo, muchas formas de disfrutarlo</span>
            <span className="hero-bottom-rule" />
            <span>San Andrés Cholula, Pue.</span>
          </div>
        </section>

        <MenuSection />
        <PromotionSection />
        <LocationSection />
        <SlideFooter showSocials />
      </main>
  );
}