// this will act as a placeholder for our list/source-by-ID APIs

interface Product {
  id: string
  name: string
  company: string
  retail: number
  isAvailable: boolean
}

const mockProducts: Product[] = [
  {
    id: 'SBX-1234',
    name: 'Sneakers 👟',
    company: 'Shoes4All',
    retail: 8999,
    isAvailable: true,
  },
  {
    id: 'LGH-001',
    name: 'Flashlight 🔦',
    company: 'Lumos LLC.',
    retail: 4999,
    isAvailable: true,
  },
  {
    id: '03072023-CRMC',
    name: 'Flower Vase 🌸',
    company: "Florean's Supplies",
    retail: 1900,
    isAvailable: false,
  },
  {
    id: 'XX02032023',
    name: 'Magical Wand 🪄',
    company: 'Ollivanders',
    retail: 52425,
    isAvailable: false,
  },
  {
    id: 'NO-CAP',
    name: 'Winter Hat 🧢',
    company: 'Bygone Ages',
    retail: 5200,
    isAvailable: true,
  },
  {
    id: 'SPRG-LG-24',
    name: 'Reusable coffee mug ☕️',
    company: 'Tweek Bros. Coffeehouse',
    retail: 2899,
    isAvailable: true,
  },
]

const listAllProducts = (): Product[] => mockProducts

const findProductById = (id: string): Product | null => {
  return mockProducts.find(p => p.id === id) || null
}

export {listAllProducts, findProductById}
