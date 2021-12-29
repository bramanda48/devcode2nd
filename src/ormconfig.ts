import { ConfigModule } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// Load environment from .env
ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
})

export default <TypeOrmModuleOptions> {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    synchronize: true,
    migrationsRun: false,
    autoLoadEntities: false,
    entities: [
        "dist/**/*.entity.js"
    ],
    migrations: [
        "dist/migration/*.js"
    ],
    cli: {
        "entitiesDir": "src/entities",
        "migrationsDir": "migration"
    },
    charset: "utf8"
}