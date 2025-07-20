
import FileService from '#services/FileService'
import { createUserValidator, loginValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
    public async createUser({request, response}: HttpContext) {

        let payload: any
    
        try {
            payload = await request.validateUsing(createUserValidator)
            logger.info('Payload validé')
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

              const userId = cuid();
              let urls
        
              try {
                const baseFolder = `uploads/users/${userId}/posts/${cuid()}`
                  urls = await FileService.processAndSaveImage({
                  tmpPath:   avatarFile.tmpPath!,
                  extname:   avatarFile.extname!,
                  baseFolder,
                  maxSize:   { width: 600, height: 400 }, // à adapter
                  quality:   85,
                }) } catch (error) {
                  return response.badRequest({ error: 'Erreur lors du traitement de l’image' })
                }
          console.log(urls.thumbnailUrl)
        return response.status(201).send({
          user: payload,
          avatar: {
            thumbnailUrl: urls.thumbnailUrl,
            originalUrl:  urls.originalUrl,
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