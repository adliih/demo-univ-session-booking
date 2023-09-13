import { compare } from 'bcrypt'
import type { MutationResolvers } from 'types/graphql'

import { sign } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const login: MutationResolvers['login'] = async (args: {
  universityUserId: string
  password: string
}) => {
  const { universityUserId, password } = args

  const user = await db.user.findUnique({
    where: { universityUserId },
    include: { roles: true },
  })
  if (!user) {
    throw new Error('User not registered')
  }

  const valid = await compare(password, user.hashedPassword)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const roles = user.roles.map((role) => role.type)
  const token = await sign({ id: user.id, sub: `${user.id}`, roles })

  await db.userToken.create({ data: { token, userId: user.id } })

  return { token, user }
}
