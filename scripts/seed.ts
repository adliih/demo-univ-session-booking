import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import { hashSync } from 'bcrypt'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    //
    const userData: Prisma.UserCreateArgs['data'][] = [
      {
        universityUserId: 'student-a',
        hashedPassword: hashSync('student-a', 10),
        roles: ['student'],
      },
      {
        universityUserId: 'student-b',
        hashedPassword: hashSync('student-b', 10),
        roles: ['student'],
      },
      {
        universityUserId: 'dean-a',
        hashedPassword: hashSync('dean-a', 10),
        roles: ['dean'],
      },
      {
        universityUserId: 'dean-b',
        hashedPassword: hashSync('dean-b', 10),
        roles: ['dean'],
      },
    ]
    await Promise.all(userData.map((data) => db.user.create({ data })))

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (const user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
