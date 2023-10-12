import { Injectable } from '@nestjs/common'
import sizeOf from 'buffer-image-size'
import sharp from 'sharp'
import crypto from 'node:crypto'
import { UtilsService } from '../utils/utils.service'

@Injectable()
export class ImageService {
  constructor(private readonly utils: UtilsService) {}
  async prepare(image: Express.Multer.File) {
    const imageDimensions = sizeOf(image.buffer)

    const compressedImage = await sharp(image.buffer).toBuffer()
    const imageNameWithoutExtension = image.originalname.split('.').slice(0, -1).join('')
    const processedImageNameWithoutExtension = this.utils.replaceSpacesWithUnderscores(imageNameWithoutExtension)
    const imageExtension = image.originalname.split('.').pop()

    const hash = crypto.createHash('md5')

    const photo = {
      name: image.originalname,
      alternativeText: '',
      caption: '',
      width: imageDimensions.width,
      height: imageDimensions.height,
      hash: hash.digest('hex'),
      ext: imageExtension ?? '',
      mime: image.mimetype,
      size: image.size / 1000,
      url: `/uploads/${processedImageNameWithoutExtension}_${hash.digest('hex')}.${imageExtension}`,
      provider: 'database',
      data: compressedImage
    }

    return photo
  }
}
