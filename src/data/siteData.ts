export type MenuCategory = "Rollos" | "Entradas" | "Especialidades" | "Bebidas";

export interface MenuItem {
  name: string;
  category: MenuCategory;
  description: string;
  image: string;
  imageAlt: string;
  tag?: string;
}

export const siteData = {
  name: "CAE Sushi",
  description:
    "Sushi estilo culichi preparado al momento en San Andrés Cholula, Puebla. Conoce la carta de CAE Sushi y pide la promoción del día por WhatsApp.",
  servesCuisine: "Japanese, Sushi",
  priceRange: "$$",
  geo: {
    latitude: 19.0510597,
    longitude: -98.2992744,
  },
  openingHoursSpecification: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
      opens: "14:00",
      closes: "22:00",
    },
    {
      dayOfWeek: ["Sunday"],
      opens: "13:00",
      closes: "19:00",
    },
  ],
  instagramUrl: "https://www.instagram.com/cae_sushi/",
  facebookUrl: "https://www.facebook.com/caesushi/",
  whatsappNumber: "522222540764",
  whatsappMessage: "¡Hola CAE Sushi! 🍣 Se me antojó un rollo y quiero pedir la promoción del día. ¿Qué tienen disponible ahorita?",
  phone: "+52 222 254 0764",
  logo: "/images/cae-logo-transparent.png",
  heroImage: "/images/rollo-closeup.jpg",
  promotionImage: "/images/rollo-gratinado.jpg",
  address: "Av. 5 de Mayo 4c, Centro San Andrés Cholula, 72810 San Andrés Cholula, Pue., Mexico",
  addressParts: {
    streetAddress: "Av. 5 de Mayo 4c, Centro",
    addressLocality: "San Andrés Cholula",
    addressRegion: "Puebla",
    postalCode: "72810",
    addressCountry: "MX",
  },
  menuCategories: ["Todos", "Rollos", "Entradas", "Especialidades", "Bebidas"] as const,
  menuItems: [
    {
      name: "Rocca",
      category: "Rollos",
      description: "Camarón, un toque picosito y una buena bañada de salsa cremosa. 12 piezas para compartir.",
      image: "/images/rocca-clean.jpg",
      imageAlt: "Rollo Rocca de camarón con salsa cremosa",
      tag: "12 piezas",
    },
    {
      name: "Rollo empanizado Monster",
      category: "Rollos",
      description: "Empanizado y bañado en salsa; un rollo grande que no se esconde debajo de la cama.",
      image: "/images/monster.jpg",
      imageAlt: "Rollo Monster empanizado con salsa",
      tag: "De la casa",
    },
    {
      name: "Salmoncito especial",
      category: "Rollos",
      description: "Lo meten al horno, lo gratinan y lo bañan en salsa. Salmoncito especial, hecho con cariño.",
      image: "/images/salmoncito.jpg",
      imageAlt: "Salmoncito especial gratinado y bañado en salsa",
    },
    {
      name: "Guamuchilito",
      category: "Rollos",
      description: "Porque el antojo empieza con los ojos, pero se queda por el sabor.",
      image: "/images/guamuchilito.jpg",
      imageAlt: "Rollo Guamuchilito de CAE Sushi",
    },
    {
      name: "Spring rolls",
      category: "Entradas",
      description: "Doraditos y crujientes, ideales para compartir junto con tus rollos favoritos.",
      image: "/images/spring-rolls-clean.jpg",
      imageAlt: "Spring rolls dorados servidos con arroz",
    },
    {
      name: "Rollitos de camarón",
      category: "Entradas",
      description: "Rollitos de camarón servidos con arroz y salsa para acompañar.",
      image: "/images/spring-rolls-clean.jpg",
      imageAlt: "Rollitos de camarón de CAE Sushi",
    },
    {
      name: "Aguachile",
      category: "Especialidades",
      description: "Fresco, picosito y con ese golpe cítrico que hace que una pieza nunca sea suficiente.",
      image: "/images/aguachile.jpg",
      imageAlt: "Aguachile fresco de CAE Sushi",
      tag: "Picosito",
    },
    {
      name: "Bomba mar y tierra",
      category: "Especialidades",
      description: "Doradita por fuera, bien servida por dentro.",
      image: "/images/bomba.jpg",
      imageAlt: "Bomba mar y tierra dorada y servida con salsa",
    },
    {
      name: "Bebidas frescas",
      category: "Bebidas",
      description: "Mojito, fresa limón, Calpis y té de jazmín para acompañar tu sushi.",
      image: "/images/bebidas.jpg",
      imageAlt: "Mojito, fresa limón, Calpis y té de jazmín de CAE Sushi",
    },
  ] satisfies MenuItem[],
  promotion: {
    label: "Promoción del día",
    title: "Hoy se antoja compartir.",
    description: "Escríbenos para conocer la promoción vigente y armar tu pedido.",
  },
  menuNote: "Descripciones tomadas de publicaciones de CAE Sushi. Confirma disponibilidad e ingredientes al ordenar.",
  googleReviews: {
    rating: "4.6",
    count: 99,
    url: "https://www.google.com/maps/search/?api=1&query=Sushi+CAE+Av.+5+de+Mayo+4C+San+Andr%C3%A9s+Cholula",
    excerpts: [
      {
        quote: "deliciosooo, excelente servicio todo muy limpio!! 100% culichi. Si pueden pídanse un chile relleno no se van a arrepentir.",
        date: "Hace un mes",
      },
      {
        quote: "Excelente servicio, fui con mi familia y muy rica la comida.",
        date: "Hace 2 meses",
      },
      {
        quote: "La verdad es que muchas veces los lugares que recomiendan en algunas cuentas de Tik Tok no resultan ser buenos, pero este lugar sí es muy, pero muy rico. Nunca probé sushi sinaloense; viví en Tijuana y allá hay muchos, pero jamás los probé, pero puedo decir que este es muy, pero muy rico...",
        date: "Hace un mes",
      },
    ],
  },
} as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://cae-sushi.pages.dev"
).replace(/\/+$/, "");

export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path}`;
}

export function getWhatsAppUrl(message: string = siteData.whatsappMessage) {
  const phone = siteData.whatsappNumber.replace(/\D/g, "");
  const baseUrl = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}