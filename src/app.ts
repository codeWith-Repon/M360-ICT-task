import cookieParser from 'cookie-parser';
import cors from 'cors';
import httpStatus from 'http-status';
import type { Application, NextFunction, Request, Response } from 'express';
import express from 'express';


const app: Application = express();
app.use(cookieParser());


app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "M360 ICT API Running..."
    })
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;