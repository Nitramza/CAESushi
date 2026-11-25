export type MenuCategory =
  | "Rollos naturales"
  | "Rollos empanizados"
  | "Rollos horneados"
  | "Entradas"
  | "Arroces"
  | "Bebidas";

export interface MenuItem {
  name: string;
  category: MenuCategory;
  price: string;
  inside?: string;
  outside?: string;
  topping?: string;
  description?: string;
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
      opens: "13:00",
      closes: "22:00",
    },
    {
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "13:00",
      closes: "22:00",
    },
  ],
  instagramUrl: "https://www.instagram.com/cae_sushi/",
  facebookUrl: "https://www.facebook.com/caesushi/",
  whatsappNumber: "522217285379",
  whatsappMessage: "¡Hola CAE Sushi! 🍣 Se me antojó un rollo y quiero pedir la promoción del día. ¿Qué tienen disponible ahorita?",
  phone: "+52 221 728 5379",
  phoneDisplay: "221 728 5379",
  logo: "/images/cae-logo-transparent.png",
  heroImage: "/images/fondo-platillos.webp",
  promotionImage: "/images/rocca-clean.jpg",
  aboutImage: "/images/restaurante.jpg",
  address: "5 de Mayo 4c, Centro, San Andrés Cholula, Puebla, C.P. 72810",
  addressParts: {
    streetAddress: "5 de Mayo 4c, Centro",
    addressLocality: "San Andrés Cholula",
    addressRegion: "Puebla",
    postalCode: "72810",
    addressCountry: "MX",
  },
  menuCategories: [
    "Todos",
    "Rollos naturales",
    "Rollos empanizados",
    "Rollos horneados",
    "Entradas",
    "Arroces",
    "Bebidas",
  ] as const,
  menuItems: [
    { name: "Dragón", category: "Rollos naturales", price: "$229", inside: "Camarones tempura", outside: "Salmón y aguacate", topping: "Spicy kanikama y atún", image: "/images/salmoncito.jpg", imageAlt: "Rollo Dragón de referencia", tag: "Natural" },
    { name: "Rocca", category: "Rollos naturales", price: "$219", inside: "Surimi y camarón", topping: "Camarones bañados en salsa especial, tampico, aguacate y kanikama", image: "/images/rocca-clean.jpg", imageAlt: "Rollo Rocca de referencia" },
    { name: "Kanny", category: "Rollos naturales", price: "$209", inside: "Camarón empanizado", topping: "Spicy de kanikama frito y camarones empanizados en salsa de sriracha", image: "/images/monster.jpg", imageAlt: "Rollo Kanny de referencia" },
    { name: "Mechudo", category: "Rollos naturales", price: "$209", inside: "Camarón y surimi", topping: "Camarón, ajonjolí, salsa de anguila y spicy kanikama", image: "/images/rocca.jpg", imageAlt: "Rollo Mechudo de referencia" },
    { name: "Secret", category: "Rollos naturales", price: "$209", inside: "Surimi y camarón", topping: "Queso crema, kanikama, aguacate, chile serrano y furikake", image: "/images/sushi-seleccion.jpg", imageAlt: "Rollo Secret de referencia" },
    { name: "Salmón c", category: "Rollos naturales", price: "$209", inside: "Surimi y camarón", topping: "Forrado en salmón, salsa de anguila, ajonjolín, cebollín y masago", image: "/images/salmoncito.jpg", imageAlt: "Rollo Salmón C de referencia" },
    { name: "Guamuchilito", category: "Rollos naturales", price: "$209", inside: "Camarón y surimi", topping: "Camarón, tampico, aguacate, salsa de anguila, ajonjolí y cebollín", description: "*Pídelo empanizado.", image: "/images/guamuchilito.jpg", imageAlt: "Rollo Guamuchilito de referencia", tag: "Pídelo empanizado" },
    { name: "777", category: "Rollos naturales", price: "$189", inside: "Surimi empanizado", topping: "Camarón, tampico, aguacate, kanikama, salsa de anguila y cebollín", image: "/images/rollo-closeup.jpg", imageAlt: "Rollo 777 de referencia" },
    { name: "Ebi", category: "Rollos naturales", price: "$159", inside: "Camarón y surimi", topping: "Tampico, aguacate, ajonjolí y salsa de anguila", image: "/images/rocca-clean.jpg", imageAlt: "Rollo Ebi de referencia" },
    { name: "Avocado", category: "Rollos naturales", price: "$139", inside: "Surimi, res o pollo", outside: "Aguacate y ajonjolí", image: "/images/guamuchilito.jpg", imageAlt: "Rollo Avocado de referencia" },
    { name: "California", category: "Rollos naturales", price: "$99", inside: "Surimi", outside: "Ajonjolí", image: "/images/sushi-seleccion.jpg", imageAlt: "Rollo California de referencia", tag: "Clásico" },

    { name: "Monster (doble)", category: "Rollos empanizados", price: "$279", inside: "Surimi, camarón, res y pollo", outside: "Tampico y aguacate", topping: "Queso gratinado, chipotle y tocino", image: "/images/monster.jpg", imageAlt: "Rollo Monster doble de referencia", tag: "Doble" },
    { name: "Aguachile", category: "Rollos empanizados", price: "$229", inside: "Surimi y camarón", topping: "Aguachile de camarón", image: "/images/aguachile.jpg", imageAlt: "Rollo Aguachile de referencia" },
    { name: "Culiacán", category: "Rollos empanizados", price: "$219", inside: "Camarón", outside: "Camarón", topping: "Camarón, tampico y kanikama", image: "/images/rocca.jpg", imageAlt: "Rollo Culiacán de referencia" },
    { name: "Flaka", category: "Rollos empanizados", price: "$209", inside: "Res y pollo", outside: "Gratinado de gouda, chipotle y tocino", image: "/images/rollo-gratinado.jpg", imageAlt: "Rollo Flaka de referencia" },
    { name: "Tokio", category: "Rollos empanizados", price: "$199", inside: "Camarón y surimi", topping: "Spicy de camarón empanizado, aguacate, salsa de anguila, mechas de kanikama y ajonjolí", image: "/images/monster.jpg", imageAlt: "Rollo Tokio de referencia" },
    { name: "Green Crunch", category: "Rollos empanizados", price: "$199", inside: "Camarón", topping: "Spicy de camarón, tampico, aderezo de cilantro y ajonjolí", image: "/images/guamuchilito.jpg", imageAlt: "Rollo Green Crunch de referencia" },
    { name: "Machi", category: "Rollos empanizados", price: "$199", inside: "Res y surimi", outside: "Gratinado de gouda y chile serrano", topping: "Tampico, aguacate y salsa de anguila", image: "/images/bomba.jpg", imageAlt: "Rollo Machi de referencia" },
    { name: "Picosito", category: "Rollos empanizados", price: "$189", inside: "Res, tocino y chile toreado", outside: "Gratinado de queso gouda y chile serrano", topping: "Guacamole y ajonjolí", image: "/images/rollo-gratinado.jpg", imageAlt: "Rollo Picosito de referencia", tag: "Picosito" },
    { name: "Bacon", category: "Rollos empanizados", price: "$159", inside: "Camarón, res o pollo y tocino", outside: "Gratinado de gouda y queso crema", image: "/images/bomba.jpg", imageAlt: "Rollo Bacon de referencia" },
    { name: "Mar y Tierra", category: "Rollos empanizados", price: "$149", inside: "Camarón y res", image: "/images/monster.jpg", imageAlt: "Rollo Mar y Tierra de referencia" },
    { name: "Tres Quesos", category: "Rollos empanizados", price: "$149", inside: "Res y pollo con queso americano", topping: "Queso crema y gouda", image: "/images/rollo-gratinado.jpg", imageAlt: "Rollo Tres Quesos de referencia" },

    { name: "Campechano", category: "Rollos horneados", price: "$279", inside: "Camarón", topping: "Trozos de kanikama, salmón y camarón bañados en aderezo especial, salsa de anguila, camarones empanizados y ajonjolí", image: "/images/salmoncito.jpg", imageAlt: "Rollo Campechano de referencia", tag: "Horneado" },
    { name: "Salmoncito Especial", category: "Rollos horneados", price: "$239", inside: "Camarón y surimi", outside: "Salmón", topping: "Gratinado especial de camarón, mechas de kanikama fritas y aderezo especial", image: "/images/salmoncito.jpg", imageAlt: "Salmoncito Especial de referencia" },
    { name: "Acá y Allá", category: "Rollos horneados", price: "$239", inside: "Res, pollo y tocino", outside: "Empanizado", topping: "Queso crema, gouda, chile serrano, res, pollo y tocino", image: "/images/monster.jpg", imageAlt: "Rollo Acá y Allá de referencia" },
    { name: "To-Te", category: "Rollos horneados", price: "$239", inside: "Camarón y surimi", outside: "Empanizado", topping: "Tampico, aderezo especial, cebollín, salsa de anguila, ajonjolí, aguacate y camarón", image: "/images/rollo-gratinado.jpg", imageAlt: "Rollo To-Te de referencia" },
    { name: "Pizza en las Glorias", category: "Rollos horneados", price: "$239", inside: "Camarón", topping: "Camarón, aderezo de cilantro, queso crema, gouda, chile serrano, salsa de anguila y ajonjolí", image: "/images/rollo-gratinado.jpg", imageAlt: "Rollo Pizza en las Glorias de referencia" },

    { name: "Chiles Rellenos", category: "Entradas", price: "$169", description: "2 piezas rellenas de queso crema y tampico, gratinadas con queso gouda y tocino. A elegir: res, pollo o camarón.", image: "/images/bomba.jpg", imageAlt: "Chiles rellenos de referencia" },
    { name: "Aguachile", category: "Entradas", price: "$159", description: "Camarón o atún curtido en limón, pepino, cebolla morada y chile chiltepín, acompañado de salsas negras.", image: "/images/aguachile.jpg", imageAlt: "Aguachile de referencia", tag: "Fresco" },
    { name: "Tostada de Atún", category: "Entradas", price: "$159", description: "Cubos de atún fresco acompañados de pepino, aguacate, cebollín y aceite de ajonjolí.", image: "/images/sushi-seleccion.jpg", imageAlt: "Tostada de atún de referencia" },
    { name: "Rocca", category: "Entradas", price: "$159", description: "Camarones roca acompañados de una cama de arroz, zanahoria y ajonjolí.", image: "/images/rocca-clean.jpg", imageAlt: "Camarones Rocca de referencia" },
    { name: "Rollo Camarón", category: "Entradas", price: "$149", description: "3 piezas de rollito de harina relleno de queso crema y camarones.", image: "/images/spring-rolls-clean.jpg", imageAlt: "Rollo camarón de referencia" },
    { name: "Brochetas", category: "Entradas", price: "$149", description: "Cubos de queso gouda o camarones empanizados con salsa de anguila y ajonjolí.", image: "/images/bomba.jpg", imageAlt: "Brochetas de referencia" },
    { name: "Spring Roll", category: "Entradas", price: "$139", description: "4 rollos primavera fritos rellenos de vegetales.", image: "/images/spring-rolls-clean.jpg", imageAlt: "Spring roll de referencia" },

    { name: "Yakimeshi Orange", category: "Arroces", price: "$189", description: "Arroz frito con verduras, aguacate, queso crema, chicharrón de salmón bañado en salsa de naranja y topping de tampico.", image: "/images/rocca.jpg", imageAlt: "Yakimeshi Orange de referencia", tag: "Especial" },
    { name: "Gohan C", category: "Arroces", price: "$169", description: "Tazón de arroz blanco con res, pollo, camarones empanizados, aguacate, queso crema y topping de tampico.", image: "/images/sushi-seleccion.jpg", imageAlt: "Gohan C de referencia" },
    { name: "Yakimeshi C", category: "Arroces", price: "$169", description: "Arroz frito con verduras, res, pollo, camarones, aguacate, queso crema y topping de tampico.", image: "/images/rocca.jpg", imageAlt: "Yakimeshi C de referencia" },

    { name: "Caguama", category: "Bebidas", price: "$89", image: "/images/bebidas.jpg", imageAlt: "Caguama de referencia" },
    { name: "Rivadavia", category: "Bebidas", price: "$79", image: "/images/bebidas.jpg", imageAlt: "Rivadavia de referencia" },
    { name: "Té helado de jazmín", category: "Bebidas", price: "$49", image: "/images/bebidas-detalle.jpg", imageAlt: "Té helado de jazmín de referencia" },
    { name: "Calpis", category: "Bebidas", price: "$49", image: "/images/bebidas-detalle.jpg", imageAlt: "Calpis de referencia" },
    { name: "Naranjada", category: "Bebidas", price: "$49", description: "Fresa o limón.", image: "/images/bebidas.jpg", imageAlt: "Naranjada de referencia" },
    { name: "Refrescos", category: "Bebidas", price: "$39", image: "/images/bebidas-detalle.jpg", imageAlt: "Refrescos de referencia" },
    { name: "Té Arizona", category: "Bebidas", price: "$39", image: "/images/bebidas-detalle.jpg", imageAlt: "Té Arizona de referencia" },
  ] satisfies MenuItem[],
  promotion: {
    label: "Promo de noviembre",
    title: "2 rollos naturales",
    offer: "$250",
    description: "Dos rollos naturales para compartir.",
    footnote: "*Promoción válida en días y rollos seleccionados.",
  },
  menuNote: "Imágenes de referencia. La presentación puede variar; confirma disponibilidad, ingredientes y precios al ordenar.",
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