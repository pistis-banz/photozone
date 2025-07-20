
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
            logger.info("payload is valid")

            const avatarFile = request.file('avatar', {
                size: '5mb',
                extnames: ['jpeg', 'jpg', 'png'],
              })
              if (!avatarFile) {
                return response.badRequest({ error: 'Image missing' })
              }
              avatar = avatarFile
              
              const userId = cuid();

              // creation des chemins pour l'avatar 

              const thumbnailPath = `uploads/users/${userId}/avatar/thumbnail/${cuid()}.${avatarFile.extname}`
              const avatarPath = `uploads/users/${userId}/avatar/original/${cuid()}.${avatarFile.extname}`

              /* modification des dimensions de l'avatar avec sharp  */
            
              const thumbnail = avatarFile.tmpPath
      ? sharp(avatarFile.tmpPath)
          .resize(300, 300) // redimensionner en 300x300
          .toFormat('jpeg')
          .jpeg({ quality: 80 })
          .toBuffer()
      :  null
      
      if (!thumbnail) {
        return response.badRequest({ error: 'Impossible de traiter l\'image' })
      }
      


      // Sauvegarder le buffer avec Drive
      const disk = drive.use()
      await disk.put(thumbnailPath, await thumbnail)
      await avatarFile.moveToDisk(avatarPath)

        } catch (error) {
            console.log(error)
          return response.status(400).send(error)
        }
     
        return response.status(201).send(payload)
    }

    public async login({request, response}: HttpContext) {
        let payload: any
        try {
            payload = await request.validateUsing(loginValidator)
            logger.info("payload is valid")
        } catch (error) {
            console.log(error)
          return response.status(400).send(error)
        }
        return response.status(200).send(payload)
    }
    public async getAvatar({request}: HttpContext) {
        const { id } = request.params()
            return 'getAvatar'
    }
}