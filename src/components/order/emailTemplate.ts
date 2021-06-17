export const getEmailTemplate = (order): string => {

let banhmis = []
let buns = []

// use findAll()


order.map(item => {
    if (!item) {
        return
    }
    switch (item.food) {
        case 'Banhmi': {
            const description = `1x Banhmi ${item.main}${getOptions(item.options)}`
            banhmis.push(description)
            break;
        }
        case 'Bun': {
            const description = `1x Bun ${item.main}${getOptions(item.options)}`
            buns.push(description)
            break;
        }
        default:
            break;
        }
    })

    const template = `
Hello hello🙂
Ich will gerne eine Bestellung aufgeben, um diese heute um 12:00 abzuholen:

${banhmis.map(banhmi => banhmi)}
${buns.map(bun => bun)}

Bitte gebt mir kurz eine Bestätigung, ob die Bestellung für heute 12:00 Uhr möglich ist. 
Freue mich, danke und bis später
Joel
`
    return template
}

const getOptions = (options) => {
    if (options.length) {
        return ""
    }

    const filteredOptions = Object.keys(options).filter(option => !options[option])
    const opts = filteredOptions.map((option) => `ohne ${option}`)

    if (!opts.length) {
        return ""
    }

    return ` (${opts.join(', ')})`
}
