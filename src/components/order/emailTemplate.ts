import { IOrder } from './types'

export const getEmailTemplate = (orders: IOrder[]): string => {
  const banhmis: string[] = []
  const buns: string[] = []

  // use findAll()
  orders.map((order) =>
    order.items.map((item) => {
      if (!item) {
        return
      }
      switch (item.name) {
        case 'Banhmi': {
          const description = `1x Banhmi ${item.ingredients[0]}${getOptions(
            item.options
          )}`
          banhmis.push(description)
          break
        }
        case 'Bun': {
          const description = `1x Bun ${item.ingredients[0]}${getOptions(
            item.options
          )}`
          buns.push(description)
          break
        }
        default:
          break
      }
    })
  )

  const template = `
Hello hello🙂
Ich will gerne eine Bestellung aufgeben, um diese heute um 12:00 abzuholen:

${banhmis.map((banhmi) => banhmi)}
${buns.map((bun) => bun)}

Bitte gebt mir kurz eine Bestätigung, ob die Bestellung für heute 12:00 Uhr möglich ist. 
Freue mich, danke und bis später
Joel
`
  return template
}

const getOptions = (options: string[]) => {
  if (!options.length) {
    return ''
  }

  if (options.length === 1) {
    return ` (${options[0]})`
  }

  return ` (${options.join(', ')})`
}
