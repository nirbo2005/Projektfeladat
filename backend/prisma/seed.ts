/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { fakerHU as faker } from '@faker-js/faker'; // Magyar lokalizáció használata

const prisma = new PrismaClient();

// A frontenddel egyező, megengedett színek listája
const ALLOWED_COLORS = ['Piros', 'Kék', 'Zöld', 'Sárga', 'Fekete'];

async function main() {
  console.log('🧹 Adatbázis tisztítása...');
  await prisma.product.deleteMany(); // Tiszta lap

  console.log('⏳ 15 db véletlenszerű termék generálása...');

  // 15 db termék adatainak legenerálása
  const productsData = Array.from({ length: 15 }).map(() => ({
    // Valósághű terméknév (pl. "Incredible Steel Hat")
    name: faker.commerce.productName(), 
    // Véletlenszerű ár 5.000 és 500.000 Ft között
    price: faker.number.int({ min: 5000, max: 500000 }), 
    // Raktárkészlet 0 és 50 között
    stock: faker.number.int({ min: 0, max: 50 }), 
    // Véletlenszerűen kiválaszt egyet az 5 megengedett színből
    color: faker.helpers.arrayElement(ALLOWED_COLORS), 
    // Értékelés 0 és 10 között
    rating: faker.number.int({ min: 0, max: 10 }), 
    // Kiadás éve az elmúlt pár évből
    releaseYear: faker.number.int({ min: 2018, max: 2024 }), 
    // 50% eséllyel true vagy false
    published: faker.datatype.boolean(), 
  }));

  // Az összes termék beszúrása egyszerre (sokkal gyorsabb, mint a ciklus)
  await prisma.product.createMany({
    data: productsData,
  });

  console.log('✅ Adatbázis sikeresen feltöltve 15 db tesztadattal!');
}

main()
  .catch((e) => {
    console.error('❌ Hiba történt a seedelés során:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
