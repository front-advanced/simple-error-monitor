import { DataSource } from "typeorm";
import { ErrorEvent } from "./entities/ErrorEvent";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "error_monitoring.sqlite",
  entities: [ErrorEvent],
  synchronize: true,
  logging: true,
});

export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    console.log("Database connected");
    return dataSource;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
