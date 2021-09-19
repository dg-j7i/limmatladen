import {
  Checkbox,
  Radio,
  useToasts,
  Text,
  Card,
  Button,
  Spacer,
  Grid,
} from '@geist-ui/react'
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { FoodCategory } from '../foodSelection/foodSelection'
import styles from './ingredients.module.scss'
import { CheckInCircle, AlertCircleFill, Plus } from '@geist-ui/react-icons'
import { useOrder } from '../order/useOrder'
import { IOrderItem, IOrderItemOption } from '../order/types'

interface IIngredientsSelectionProps {
  foodCategory: FoodCategory
  person: string
}

const foodConfig = {
  main: [
    'Rindfleisch mit Zitronengras',
    'Poulet',
    'Pulled Pork Carnitas',
    [2, 4].includes(new Date().getDay()) ? 'Planted' : 'Tofu',
  ],
  options: [
    { name: 'Koriander', isExcluded: false },
    { name: 'Spicy', isExcluded: false },
  ],
}

export const IngredientsSelection: FunctionComponent<IIngredientsSelectionProps> =
  ({ foodCategory, person }) => {
    const [selection, setSelection] = useState<IOrderItem | null>(null)
    const [mainIngredient, setMainIngredient] = useState('')
    const [options, setOptions] = useState<IOrderItemOption[]>([
      ...foodConfig.options,
    ])
    const [, setToast] = useToasts()
    const { createNewOrder } = useOrder()

    const saveOrder = () => {
      setSelection({
        name: foodCategory,
        ingredients: [mainIngredient],
        options,
      })
    }

    const handleMainFood = (value: string | number) => {
      setMainIngredient(String(value))
    }

    const handleOptions = (includedOptions: string[]) => {
      const options: IOrderItemOption[] = foodConfig.options.map((option) => {
        return {
          name: option.name,
          isExcluded: !includedOptions.includes(option.name),
        }
      })
      setOptions(options)
    }

    useEffect(() => {
      if (selection) {
        createNewOrder(
          {
            owner: person,
            access: 'XXXX',
            items: [
              {
                name: foodCategory,
                ingredients: [mainIngredient],
                options,
              },
            ],
          },
          () =>
            setToast({
              text: (
                <Text className={styles.toastWithIcon}>
                  <CheckInCircle color="green" />
                  {'  '}
                  Added To Session
                </Text>
              ),
            }),
          () =>
            setToast({
              text: (
                <Text className={styles.toastWithIcon}>
                  <AlertCircleFill color="red" />
                  {'  '}
                  Something went wrong - try harder.
                </Text>
              ),
            })
        )
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
            <Checkbox.Group
              scale={1}
              value={foodConfig.options.map((option) => option.name)}
              onChange={handleOptions}
            >
              {foodConfig.options.map(({ name }, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      marginBottom: `${
                        index + 1 === foodConfig.options.length ? 0 : '12px'
                      }`,
                    }}
                  >
                    <Checkbox initialChecked={true} value={name}>
                      {name}
                    </Checkbox>
                  </div>
                )
              })}
            </Checkbox.Group>
          </Card>
        </div>
        <Grid.Container justify="flex-end">
          <Grid xs={24} sm={10}>
            <Button
              width="100%"
              type="secondary-light"
              icon={<Plus />}
              className={styles.button}
              onClick={saveOrder}
              disabled={mainIngredient ? false : true}
            >
              Add To Session
            </Button>
          </Grid>
        </Grid.Container>
      </div>
    )
  }
