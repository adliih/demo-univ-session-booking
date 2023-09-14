import { UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const User: UserRelationResolvers = {
  roles: (_args, { root }) =>
    db.role.findMany({ where: { users: { some: { id: root.id } } } }),
}
