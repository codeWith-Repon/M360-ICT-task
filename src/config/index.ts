import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,

    dbUrl: process.env.DATABASE_URL,

    hrAdmin: process.env.HR_ADMIN_EMAIL,
    hrAdminPassword: process.env.HR_ADMIN_PASSWORD,

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    bcryptSaltRounds: process.env.SALT_ROUNDS
}