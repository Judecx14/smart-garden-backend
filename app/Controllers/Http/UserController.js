'use strict'
const User = use('App/Models/User')
const {validate} = use('Validator')

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({response}) {
    const data = await User.all();
    try {
      return response.status(200).send({'Data': data});
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({request, response}) {
    const rules =
      {
        username: 'required|string',
        email: 'required|email|unique:users,email',
        password: 'required'
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {username, email, password} = request.only([
          'username',
          'email',
          'password'
        ])

        await User.create({
          username,
          email,
          password
        })

        return response.status(201).send({message: 'User has been created'})
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.params
   * @param {Response} ctx.response
   */
  async show({params: {id}, response}) {
    try {
      const user = await User.findBy('id', id)
      const res = {
        username: user.username,
        email: user.email,
      }
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({request, response}) {
    try {
      const data = request.only(['username', 'first_name', 'last_name', 'email']);
      const user = request.u
      user.username = data.username;
      user.email = data.email;
      await user.save();
      return response.status(200).json(user);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const user = request.u
      await user.delete();
      return response.status(204).send({message: 'User has been destroyed'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Login using email and password
   *
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async login({request, response, auth}) {
    const {email, password} = request.all()
    const token = await auth.withRefreshToken().attempt(email, password)
    return response.json(token)
  }

  /**
   * RefreshToken
   *
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async refreshT({request, response, auth}) {
    const rt = request.raw()
    const token = await auth.generateForRefreshToken(rt, true)
    return response.json(token)
  }

  async loggedIn({response, auth}) {
    try {
      if (auth.check()) {
        const user = await auth.getUser()
        return {
          id: user.id,
          username: user.username,
          state: true
        }
      }
    } catch (error) {
      return response.json({state: false})
    }
  }

  async logout({request, response, auth}) {
    try {
      const refreshToken = request.raw()
      await auth
        .authenticator('jwt')
        .revokeTokens([refreshToken], true)
      return response.send({message: "Token revoked"})
    } catch (error) {
      return error
    }
  }

  async loginCheck({auth}) {
    try {
      const user = await auth.getUser()
      return !!user;
    } catch (e) {
      return false
    }
  }
}

module.exports = UserController
