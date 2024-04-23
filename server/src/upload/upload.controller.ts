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

  // @Put()
  // async generateBlur() {
  //   const pics = await this.prisma.image.findMany()
  //   for (const pic of pics) {
  //     const { base64 } = await getPlaiceholder(pic.data)
  //     console.log('base64', base64)
  //     await this.prisma.image.update({
  //       where: {
  //         id: pic.id
  //       },
  //       data: {
  //         blurredBase64: base64
  //       }
  //     })
  //   }

  //   return { success: true }
  // }
}
