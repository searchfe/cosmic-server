import { Test, TestingModule } from '@nestjs/testing';
import { WebController } from './web.controller';

describe('Web Controller', () => {
  let controller: WebController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebController],
    }).compile();

    controller = module.get<WebController>(WebController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
