import { AppError } from "./src/utils/appError.js";
import globalErrorHandler from "./src/middleware/globalErrorHandler.js";
import authRouter from "./src/routes/authRouter.js";
import developerRouter from "./src/routes/develpoerRoutes.js";
import locationRouter from "./src/routes/locationRouter.js";
import compoundRouter from "./src/routes/compoundRouter.js";
import propertyRouter from "./src/routes/propertyRouter.js";
import TypeRouter from "./src/routes/typeRouter.js";
import subTypeRouter from "./src/routes/subTypeRouter.js";
export const init = (app) => {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  app.use("/api/auth", authRouter);
  app.use("/api/developer", developerRouter);
  app.use("/api/location", locationRouter);
  app.use("/api/compound", compoundRouter);
  app.use("/api/property", propertyRouter);
  app.use("/api/type", TypeRouter);
  app.use("/api/subType", subTypeRouter);
  app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });
  // Error handling middleware
  app.use(globalErrorHandler);
};
