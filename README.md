# Logger Module
Loki Activity Logger
  
### Installation
  
**Yarn**

```bash
yarn add @tokensuite/logger
```

**NPM**
```bash
npm install @tokensuite/logger --save
```
### Getting Started
Let's register the LokiLogger in `app.module.ts` The module imports globally.
Don't forget to change `LOGGER_HOST` and `LOGGER_AUTH`  
  
```typescript

import { Module } from  '@nestjs/common'
import { LokiLogger } from  '@tokensuite/logger';

@Module({
	imports: [
		LokiLogger.register(LOGGER_HOST, LOGGER_AUTH),
	],
})

export  class  AppModule {}

```

And use in your service

```typescript
import { Injectable } from  '@nestjs/common';
import { LoggerService } from  '@tokensuite/logger';
import { LogJobs } from  '@tokensuite/logger/dist/lib/logger.types';
  
@Injectable()
export  class  Service {
	constructor(
	private  readonly  loggerService: LoggerService,
	) {}
  
	async  process(): Promise<void> {
		// Log the message
		this.loggerService.write({
			message:  'Ride is starting: %rideId',
			data: {
				rideId:  'rideId'
			},
			labels: {
				job:  LogJobs.RIDE,
			},
		});
	}
}
```

That's it!