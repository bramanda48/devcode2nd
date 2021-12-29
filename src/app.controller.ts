import { Controller, Get, Redirect } from '@nestjs/common';
import { GlobalResponse } from './response';

@Controller()
export class AppController {
	constructor() {}

	@Get()
	async getDocs() {
		return {
            message: "Welcome to API TODO"
        };
	}
}
