import * as Realm from 'realm-web'
import { NextApiRequest, NextApiResponse } from 'next'
import mongoRealmApp from '../../lib/mongodb/realm.mongo'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const user = await mongoRealmApp.logIn(Realm.Credentials.anonymous())
  const allSessions = await user.functions.getAllSessions()
  res.status(200).json(allSessions)
}

export default handler
