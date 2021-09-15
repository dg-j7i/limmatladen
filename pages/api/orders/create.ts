// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as Realm from 'realm-web'
import { NextApiRequest, NextApiResponse } from 'next'
import mongoRealmApp from '../../../lib/mongodb/realm.mongo'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST' || !req.body) {
    const { session_id, sessionAccess, owner, access, items } = JSON.parse(
      req.body
    )
    const user = await mongoRealmApp.logIn(Realm.Credentials.anonymous())
    const newOrder = await user.functions.createNewOrder(
      session_id,
      sessionAccess,
      owner,
      access,
      items
    )
    res.status(200).json(newOrder)
  } else {
    res.status(405).end()
  }
}

export default handler
