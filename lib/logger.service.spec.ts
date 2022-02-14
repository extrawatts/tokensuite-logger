import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LoggerService } from './logger.service';
import { LogContext, LogJobs } from './logger.types';

describe('LoggerService', () => {
  const imei = 'imei';
  const log = jest.fn();
  let service: LoggerService;

  beforeAll(() => {
    // Mock Logger
    Logger.prototype.log = log;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log,
          },
        },
        LoggerService,
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);

    log.mockClear();
  });

  it('should be defined', () => {
    const context: LogContext = {
      message: 'Test: %imei',
      labels: {
        job: LogJobs.VEHICLE,
      },
      data: { imei },
    };

    service.write(context);

    const callData = log.mock.calls.at(0);

    expect(callData[0]).toBe('info');
    expect(callData[1]).toBe('Test: imei');
    expect(callData[2]).toMatchObject({ labels: context.labels });
  });
});
