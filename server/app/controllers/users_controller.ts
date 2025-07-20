
import { createUserValidator, loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { cuid } from '@adonisjs/core/helpers'


export default class UsersController {
    public async createUser({request, response}: HttpContext) {
        let avatar: any = null
        let payload: any

        try {
            payload = await request.validateUsing(createUserValidator)
            logger.info("payload is valid")

            
            const avatarFile = request.file('avatar', {
                size: '2mb',
                extnames: ['jpeg', 'jpg', 'png'],
              })
              if (!avatarFile) {
                return response.badRequest({ error: 'Image missing' })
              }
              avatar = avatarFile

              const key = `uploads/pistisbanz/${cuid()}.${avatarFile.extname}`
              await avatarFile.moveToDisk(key)

              console.log("avatar", avatarFile.meta.url)

        } catch (error) {
            console.log(error.message)
          return response.status(400).send(error.messages)
        }
     
        return response.status(500).send(payload)
    }
    public async login({request, response}: HttpContext) {
        let payload: any
        try {
            payload = await request.validateUsing(loginValidator)
            logger.info("payload is valid")
        } catch (error) {
            console.log(error.message)
          return response.status(400).send(error.messages)
        }
        return response.status(200).send(payload)
    }
    public async getAvatar({request}: HttpContext) {
        const { id } = request.params()
            return 'getAvatar'
    }
}