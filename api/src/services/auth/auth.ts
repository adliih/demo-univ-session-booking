import { compare } from 'bcrypt'

import { sign } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const login = async (args: {
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

  const token = await sign({ id: user.id, sub: `${user.id}` })

  await db.userToken.create({ data: { token, userId: user.id } })

  return { token, user }
}
