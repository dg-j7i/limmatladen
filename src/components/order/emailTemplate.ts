import { IOrder, IOrderItemOption } from './types'

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
          const description = `Banhmi ${item.ingredients[0]}${getOptions(
            item.options
          )}`
          banhmis.push(`${description} \n`)
          break
        }
        case 'Bun': {
          const description = `Bun ${item.ingredients[0]}${getOptions(
            item.options
          )}`
          buns.push(`${description} \n`)
          break
        }
        default:
          break
      }
    })
  )

  const total = banhmis.length + buns.length
  const template = `
Hello hello🙂
Ich will gerne eine Bestellung aufgeben, um diese heute um 12:00 abzuholen:

${sumUpItems(banhmis).map((banhmi) => banhmi)}
${sumUpItems(buns).map((bun) => bun)}
Total: ${total}

Bitte gebt mir kurz eine Bestätigung, ob die Bestellung für heute 12:00 Uhr möglich ist. 
Freue mich, danke und bis später
Joel
`
  return template
}

const getOptions = (options: IOrderItemOption[]) => {
  const isExcluded = (option: IOrderItemOption) =>
    option.isExcluded ? option : false

  const filteredOptions = options.filter((option) => isExcluded(option))

  switch (filteredOptions.length) {
    case 0:
      return ''
    case 1:
      return ` (OHNE ${filteredOptions[0].name})`
    default:
      return ` (OHNE ${filteredOptions
        .map((option) => option.name)
        .join(', OHNE ')})`
  }
}

const sumUpItems = (items: string[]) => {
  const countedItems: { [Key: string]: number } = {}

  items.forEach((item) => {
    countedItems[item] = (countedItems[item] || 0) + 1
  })

  return Object.keys(countedItems).map((key) => `${countedItems[key]}x ${key}`)
}
