import cookieParser from 'cookie-parser';
import express, { Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// cron.schedule('* * * * *', () => {
//     try {
//         AppointmentService.cancelUnpaidAppointments();
//     }
//     catch (err) {
//         console.error(err);
//     }
// });

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Ph health care server.."
    })
});

// app.use('/api/v1',);
// app.use('/api/v1',);
// app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;