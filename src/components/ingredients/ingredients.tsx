import {
  Checkbox,
  Radio,
  useClipboard,
  useToasts,
  Text,
  Card,
  Button,
  Spacer,
} from '@geist-ui/react'
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { FoodCategory } from '../foodSelection/foodSelection'
import { IOrderItem, useOrderContext } from '../order/orderContext'
import styles from './ingredients.module.scss'
import { CheckInCircle } from '@geist-ui/react-icons'

interface IIngredientsSelectionProps {
  foodCategory: FoodCategory
}

const foodConfig = {
  main: [
    'Rindfleisch mit Zitronengras',
    'Poulet',
    'Pulled Pork Carnitas',
    [2, 4].includes(new Date().getDay()) ? 'Planted' : 'Tofu',
  ],
  options: ['Koriander', 'Spicy'],
}

export const IngredientsSelection: FunctionComponent<IIngredientsSelectionProps> =
  ({ foodCategory }) => {
    const [selection, setSelection] = useState<IOrderItem | null>(null)
    const [mainIngredient, setMainIngredient] = useState('')
    const [options, setOptions] = useState<string[]>(foodConfig.options)
    const { addOrderItem } = useOrderContext()
    const [, setToast] = useToasts()
    const { copy } = useClipboard()

    const saveOrder = () => {
      setSelection({
        food: foodCategory,
        main: mainIngredient,
        options,
      })
      setToast({
        text: (
          <Text className={styles.toastWithIcon}>
            <CheckInCircle color="green" />
            {'  '}
            Added to order
          </Text>
        ),
      })
    }

    const handleMainFood = (value: string | number) => {
      setMainIngredient(String(value))
    }

    const handleOptions = (value: string[]) => {
      setOptions(value)
    }

    const handleClipboard = () => {
      copy(
        JSON.stringify({
          food: foodCategory,
          main: mainIngredient,
          options,
        })
      )
      setToast({ text: 'Order copied.' })
    }

    useEffect(() => {
      if (selection) {
        addOrderItem(selection)
      }
    }, [selection])

    return (
      <div className={styles.container}>
        <div className="space-y-10">
          <Text h3>Hauptzutat</Text>
          <Spacer w={8} />
          <Card shadow style={{ marginBottom: '72px' }}>
            <Radio.Group value={mainIngredient} onChange={handleMainFood}>
              {foodConfig.main.map((mainItem: string, index: number) => {
                return (
                  <Fragment key={`${mainItem}:${index}`}>
                    <Spacer h={0.5} />
                    <Radio key={mainItem} value={mainItem}>
                      {mainItem}
                      {mainItem === 'Tofu' && (
                        <Radio.Description>
                          On weekdays starting with the letter &quot;D&quot; we
                          offer planted chicken.
                        </Radio.Description>
                      )}
                    </Radio>
                  </Fragment>
                )
              })}
            </Radio.Group>
          </Card>
          <Text h3>Zusätzliches</Text>
          <Spacer h={1} />
          <Card shadow style={{ marginBottom: '16px' }}>
            <Checkbox.Group scale={1} value={options} onChange={handleOptions}>
              {foodConfig.options.map((option: string, index) => {
                return (
                  <div
                    key={option}
                    style={{
                      marginBottom: `${
                        index + 1 === foodConfig.options.length ? 0 : '12px'
                      }`,
                    }}
                  >
                    <Checkbox initialChecked={true} value={option}>
                      {option}
                    </Checkbox>
                  </div>
                )
              })}
            </Checkbox.Group>
          </Card>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            type="abort"
            className={styles.button}
            onClick={saveOrder}
            disabled={mainIngredient ? false : true}
          >
            Add To Order
          </Button>
          <Button
            type="secondary-light"
            className={styles.button}
            onClick={handleClipboard}
            disabled={mainIngredient ? false : true}
          >
            Copy to Clipboard
          </Button>
        </div>
      </div>
    )
  }
