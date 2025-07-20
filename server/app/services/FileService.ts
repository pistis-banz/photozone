import sharp from 'sharp'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'

export type FileOptions = {
  tmpPath: string
  extname: string
  baseFolder: string   // chemin de base (incluant userId ou postId)
  maxSize?: { width: number; height: number }
  resizedSize?: { width: number; height: number }
  quality?: number
}

export default class FileService {
  /**
   * Génère un nom de fichier unique
   */
  private static genFileName(ext: string) {
    return `${cuid()}.${ext}`
  }

  /**
   * Génère les chemins pour thumbnail, resized et original
   */
  public static genPaths(
    baseFolder: string,
    ext: string,
  ): { thumbnail: string; resized: string; original: string } {
    const thumbName   = this.genFileName(ext)
    const resizedName = this.genFileName(ext)
    const origName    = this.genFileName(ext)

    return {
      thumbnail: `${baseFolder}/thumbnail/${thumbName}`,
      resized:   `${baseFolder}/resized/${resizedName}`,
      original:  `${baseFolder}/original/${origName}`,
    }
  }

  /**
   * Redimensionne et sauvegarde une image sur le disque
   */
  public static async processAndSaveImage(
    options: FileOptions,
  ): Promise<{ thumbnailUrl: string; resizedUrl: string; originalUrl: string }> {
    const {
      tmpPath,
      extname,
      baseFolder,
      maxSize = { width: 300, height: 300 },
      resizedSize = { width: 250, height: 250 },
      quality = 80,
    } = options

    // 1. Génération des chemins
    const { thumbnail, resized, original } = this.genPaths(baseFolder, extname)

    const disk = drive.use()

    // 2. Traitement Sharp (thumbnail)
    const thumbBuffer = await sharp(tmpPath)
      .resize(maxSize.width, maxSize.height)
      .jpeg({ quality })
      .toBuffer()
    await disk.put(thumbnail, thumbBuffer)

    // 3. Traitement Sharp (resized)
    const resizedBuffer = await sharp(tmpPath)
      .resize(resizedSize.width, resizedSize.height)
      .jpeg({ quality })
      .toBuffer()
    await disk.put(resized, resizedBuffer)

    // 4. Sauvegarde de l’original
    const originalBuffer = await sharp(tmpPath).toBuffer()
    await disk.put(original, originalBuffer)

    // 5. Retourne les URLs publiques
    return {
      thumbnailUrl: await disk.getUrl(thumbnail),
      resizedUrl:   await disk.getUrl(resized),
      originalUrl:  await disk.getUrl(original),
    }
  }
}
