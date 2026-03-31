"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
const ALLOWED_COLORS = ['Piros', 'Kék', 'Zöld', 'Sárga', 'Fekete'];
async function main() {
    console.log('🧹 Adatbázis tisztítása...');
    await prisma.product.deleteMany();
    console.log('⏳ 15 db véletlenszerű termék generálása...');
    const productsData = Array.from({ length: 15 }).map(() => ({
        name: faker_1.fakerHU.commerce.productName(),
        price: faker_1.fakerHU.number.int({ min: 5000, max: 500000 }),
        stock: faker_1.fakerHU.number.int({ min: 0, max: 50 }),
        color: faker_1.fakerHU.helpers.arrayElement(ALLOWED_COLORS),
        rating: faker_1.fakerHU.number.int({ min: 0, max: 10 }),
        releaseYear: faker_1.fakerHU.number.int({ min: 2018, max: 2024 }),
        published: faker_1.fakerHU.datatype.boolean(),
    }));
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
//# sourceMappingURL=seed.js.map