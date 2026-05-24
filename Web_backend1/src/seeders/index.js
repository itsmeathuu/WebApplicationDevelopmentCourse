import productSeeder from './product.js';
import soldProductSeeder from './sold-product.js';
import userSeeder from './user.js';
import productImageSeeder from './product-image.js';

const seeders = [productSeeder, soldProductSeeder, userSeeder, productImageSeeder];

const up = async () => {
    for (const seeder of seeders)
        await seeder.up();
};

const down = async () => {
    for (const seeder of seeders)
        await seeder.down();
};

const update = async () => {
    await down();
    await up();
};

export default { up, down, update }