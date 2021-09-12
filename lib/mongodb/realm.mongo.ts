import * as Realm from 'realm-web'

let app: Realm.App<globalThis.Realm.DefaultFunctionsFactory, any>

if (process.env.REALM_APP_ID) {
  app = new Realm.App({ id: process.env.REALM_APP_ID })
} else {
  throw new Error('Missing REALM_APP_ID')
}

export default app
