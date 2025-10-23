import { Module } from '@nestjs/common';
import directoriesConfig from './shared-kernel/secondary-adapters/postgres/directories-config';
import { PostgresConnectionModule } from 'postgres-connection-lib';

@Module({
  imports: [PostgresConnectionModule.register(directoriesConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
