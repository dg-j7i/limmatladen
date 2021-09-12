// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as Realm from 'realm-web'
import { NextApiRequest, NextApiResponse } from 'next'
import mongoRealmApp from '../../../lib/mongodb/realm.mongo'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST' || !req.body) {
    const { sessionId, accessCode } = JSON.parse(req.body)
    const user = await mongoRealmApp.logIn(Realm.Credentials.anonymous())
    const session = await user.functions.getOneSession(sessionId, accessCode)
    res.status(200).json(session)
  } else {
    res.status(405).end()
  }
}

export default handler
