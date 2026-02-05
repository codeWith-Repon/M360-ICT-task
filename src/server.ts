import { Server } from 'http';
import app from './app';
import config from './config';


async function bootstrap() {
    let server: Server;

    try {

        server = app.listen(config.port, () => {
            console.log(`🚀 Server is running on http://localhost:${config.port}`);
        });

        // Function to gracefully shut down the server
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    console.log('✅ Server closed gracefully.');
                    process.exit(0)
                });
            } else {
                process.exit(1);
            }
        };

        // Handle unhandled promise rejections
        const unexpectedErrorHandler = (error: unknown) => {
            console.error('❌ Unexpected Error:', error);
            exitHandler();
        };

        // Unhandled synchronous errors
        process.on('uncaughtException', unexpectedErrorHandler);
        // Unhandled promise rejections
        process.on('unhandledRejection', unexpectedErrorHandler);

        process.on('SIGTERM', () => {
            console.log('⚠️  SIGTERM received');
            exitHandler();
        });
        process.on('SIGINT', () => {
            console.log('⚠️  SIGINT received (Ctrl+C)');
            exitHandler();
        });


    } catch (error) {
        console.error('❌ Error during server startup:', error);
        process.exit(1);
    }
}

bootstrap();