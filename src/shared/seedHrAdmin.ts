import config from '../config';
import { getKnex } from '../config/knex';
import bcrypt from 'bcryptjs';

const knex = getKnex();

export const seedInitialHrUser = async () => {
    try {
        const existing = await knex('hr_users')
            .where({ email: config.hrAdmin })
            .first();

        if (existing) {
            console.log('ℹ️  Initial HR user already exists, skipping seed');
            return;
        }

        console.log('⚡ Seeding initial HR user...');

        const defaultUser = {
            name: 'System Admin',
            email: config.hrAdmin,
            password_hash: await bcrypt.hash(config.hrAdminPassword as string, 12),
        };

        await knex('hr_users').insert(defaultUser);

        console.log('✅ Initial HR user created successfully');
        console.log('   Email   : admin@m360ict.com');
        console.log('   Password: 123456');
    } catch (err) {
        console.error('❌ Failed to seed initial HR user:', err);
    }
};