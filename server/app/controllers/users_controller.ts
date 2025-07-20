
import { createUserValidator, loginValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import drive from '@adonisjs/drive/services/main'
import sharp from 'sharp'


export default class UsersController {
    public async createUser({request, response}: HttpContext) {
        let avatar: any = null
        let payload: any
    
        try {
            payload = await request.validateUsing(createUserValidator)
            logger.info('Payload validé ✔')
          } catch (error) {
            logger.error('Validation échouée', error as any)
          return response.status(400).send(error)
        }

            const avatarFile = request.file('avatar', {
                size: '5mb',
                extnames: ['jpeg', 'jpg', 'png'],
              })
              if (!avatarFile) {
                return response.badRequest({ error: 'avatar manquant' })
              }
              avatar = avatarFile
              
              const userId = cuid();

              // creation des chemins pour l'avatar 

              const paths = {
                thumbnail: `uploads/users/${userId}/avatar/thumbnail/${cuid()}.${avatarFile.extname}`,
                original:  `uploads/users/${userId}/avatar/original/${cuid()}.${avatarFile.extname}`,
              }

              /* modification des dimensions de l'avatar avec sharp  */
            let thumbnail
              try {
                 thumbnail = sharp(avatarFile.tmpPath!)
          .resize(300, 300) // redimensionner en 300x300
          .toFormat('jpeg')
          .jpeg({ quality: 80 })
          .toBuffer()

       } catch (error) {
        logger.error('Erreur lors du traitement de l\'image', error as any)
        return response.badRequest({ error: 'Impossible de traiter l\'image' })
      }
      


      // Sauvegarder le buffer avec Drive
      const disk = drive.use()
      await disk.put(paths.thumbnail, await thumbnail)
      await avatarFile.moveToDisk(paths.original)
     
        return response.status(201).send({
          user: payload,
          avatar: {
            thumbnailUrl: disk.getUrl(paths.thumbnail),
            originalUrl:  disk.getUrl(paths.original),
          },
        })
    }

    public async login({request, response}: HttpContext) {
        let payload: any
        try {
            payload = await request.validateUsing(loginValidator)
            logger.info("payload is valid")
        } catch (error) {
            logger.error('Validation échouée', error as any)
          return response.status(400).send(error)
        }
        return response.status(200).send(payload)
    }
    public async getAvatar({request}: HttpContext) {
        const { id } = request.params()
            return 'getAvatar'
    }
}