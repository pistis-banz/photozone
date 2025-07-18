/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/* user's route */
router
  .group(() => {
    // router.get("/", async (request, response) => {});
    // router.get("/username/:id", usernameVerify);
    // router.get("/email/:id", emailVerify);
    
    router.post("/login", '#controllers/users_controller.login');
    router.post("/register", '#controllers/users_controller.createUser');
    router.post("/avatar/:id", '#controllers/users_controller.getAvatar');
    
    // router.put("/", async (req, res) => {});
    
    // router.delete("/", async (req, res) => {});
  })
  .prefix('/user')
