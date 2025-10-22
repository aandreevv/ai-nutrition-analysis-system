import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlingFromMicroserviceService } from './error-handling-from-microservice.service';

@Module({})
export class MicroserviceConnectionModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: MicroserviceConnectionModule,
      exports: [ClientsModule, ErrorHandlingFromMicroserviceService],
      providers: [ErrorHandlingFromMicroserviceService],
      imports: [
        ClientsModule.registerAsync([
          {
            name: serviceName,
              useFactory: (configService: ConfigService) => {
                const rmqUri = configService.get<string>('RMQ_URI');
                const queueName = configService.get<string>(`RMQ_${serviceName}_QUEUE`);

                if (!rmqUri) throw new Error('RMQ_URI is not defined in the configuration.');
                if (!queueName) throw new Error(`RMQ_${serviceName}_QUEUE is not defined in the configuration.`);

                return {
                    transport: Transport.RMQ,
                    options: { urls: [rmqUri], queue: queueName },
                };
              },
            inject: [ConfigService],
          },
        ]),
      ],
    };
  }
}
