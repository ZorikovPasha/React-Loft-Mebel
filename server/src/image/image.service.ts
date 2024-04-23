import { Injectable } from '@nestjs/common'
import sizeOf from 'buffer-image-size'
import sharp from 'sharp'
import crypto from 'node:crypto'
import slugify from 'slugify'
import { getPlaiceholder } from 'plaiceholder'

@Injectable()
export class ImageService {
  constructor() {}
  async prepare(image: Express.Multer.File) {
    const imageDimensions = sizeOf(image.buffer)

    const compressedImage = await sharp(image.buffer).toBuffer()
    const imageNameWithoutExtension = image.originalname.split('.').slice(0, -1).join('')
    const processedImageNameWithoutExtension = slugify(imageNameWithoutExtension, { replacement: '_' }) // this.utils.replaceSpacesWithUnderscores()
    const imageExtension = image.originalname.split('.').pop()

    const { base64 } = await getPlaiceholder(compressedImage)

    const hash = crypto.createHash('md5')
    const digest = hash.digest('hex')

    const photo = {
      name: image.originalname,
      alternativeText: '',
      caption: '',
      width: imageDimensions.width,
      height: imageDimensions.height,
      hash: digest,
      ext: imageExtension ?? '',
      mime: image.mimetype,
      size: image.size / 1024,
      url: `/uploads/${processedImageNameWithoutExtension}_${digest}.${imageExtension}`,
      provider: 'database',
      data: compressedImage,
      blurredBase64: base64
    }
    return photo
  }
}
