import sizeOf from 'buffer-image-size'
import sharp from 'sharp'
import fileUpload from 'express-fileupload'
import { injectable } from 'inversify'

import { replaceSpacesWithUnderscores } from './utils.js'

@injectable()
export class ImageService {
  async prepare(image: fileUpload.UploadedFile) {
    const imageDimensions = sizeOf(image.data)

    const compressedImage = await sharp(image.data).toBuffer()
    const imageNameWithoutExtension = image.name.split('.').slice(0, -1).join('')
    const processedImageNameWithoutExtension =
      replaceSpacesWithUnderscores(imageNameWithoutExtension)
    const imageExtension = image.name.split('.').pop()

    const photo = {
      name: image.name,
      alternativeText: '',
      caption: '',
      width: imageDimensions.width,
      height: imageDimensions.height,
      hash: image.md5,
      ext: imageExtension ?? '',
      mime: image.mimetype,
      size: image.size / 1000,
      url: `/uploads/${processedImageNameWithoutExtension}_${image.md5}.${imageExtension}`,
      provider: 'database',
      data: compressedImage
    }

    return photo
  }
}
