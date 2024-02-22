import { Controller, Get, Param, Res, BadRequestException, NotFoundException } from '@nestjs/common'
import { Response } from 'express'

import { PrismaService } from '../prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Uploads')
@Controller('uploads')
export class UploadController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':url')
  async findOne(@Param('url') url: string | undefined, @Res() res: Response) {
    if (!url) {
      throw new BadRequestException('Url was not provided')
    }

    const media = await this.prisma.image.findFirst({
      where: {
        url: `/uploads/${url}`
      }
    })

    if (!media) {
      throw new NotFoundException()
    }

    return res.status(200).contentType(media.mime).end(media.data)
  }
}
