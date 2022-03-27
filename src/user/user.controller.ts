import {
    Controller,
    Get,
    Post,
    Param,
    Put,
    Delete,
    Body,
} from '@nestjs/common';
import { UserService } from './user.service';


@Controller('member0')
export class UserController {
    constructor(private service: UserService) {}

    @Post()
    create(@Body() _createCatDto: any) {
        // this.service.create(createCatDto);
        return 'This action adds a new member';
    }

    // http://localhost:300/member/123
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} member`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() _updateCatDto: any) {
        return `This action updates a #${id} member`;
    }

    // HttpHeaders['Method'] = DELETE
    // http://localhost:300/member/123
    @Delete(':id')
    remove(@Param('id') id: string) {
        // this.service.remove(id);
        return `This action removes a #${id} member`;
    }
}
