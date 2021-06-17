import React, { FunctionComponent, useState } from 'react'
import styles from './foodSelection.module.scss'
import { IngredientsSelection } from '../ingredients/ingredients'
import { Col, Row, Text } from '@geist-ui/react'

export type FoodCategory = 'Bun' | 'Banhmi'

export const FoodSelection: FunctionComponent = () => {
  const [foodCategory, setFoodCategory] = useState<FoodCategory>('Banhmi')

  const selectFood = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    foodCategory: FoodCategory
  ) => {
    event.preventDefault()
    setFoodCategory(foodCategory)
  }

  return (
    <>
      <Col>{getCategoryDescription(foodCategory)}</Col>
      <div className={styles.wrapper}>
        <Row style={{ marginBottom: '72px' }} justify="space-between">
          <button
            className={`${styles.button} ${
              foodCategory === 'Banhmi' ? styles.selected : ''
            }`}
            onClick={(event) => selectFood(event, 'Banhmi')}
            style={{
              backgroundImage: `${
                foodCategory === 'Bun'
                  ? 'linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .5)), '
                  : ''
              }url('https://www.limmatladen.ch/site/assets/files/1031/banhmi.300x0.png')`,
            }}
          >
            Banhmi
          </button>

          <button
            className={`${styles.button} ${
              foodCategory === 'Bun' ? styles.selected : ''
            }`}
            onClick={(event) => selectFood(event, 'Bun')}
            style={{
              backgroundImage: `${
                foodCategory === 'Banhmi'
                  ? 'linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .5)), '
                  : ''
              }url('https://www.limmatladen.ch/site/assets/files/1029/bun.300x0.png')`,
            }}
          >
            Bun
          </button>
        </Row>
      </div>

      <IngredientsSelection foodCategory={foodCategory} />
    </>
  )
}

const getCategoryDescription = (foodCategory: FoodCategory) => {
  switch (foodCategory) {
    case 'Bun': {
      return (
        <Col style={{ marginBottom: '8px' }}>
          <Text h2>Reisnudeln</Text>
          <Text>
            garniert mit Pickles, Gurken, Minze, Koriander an einer leichten
            Sojasauce.
          </Text>
        </Col>
      )
    }
    case 'Banhmi': {
      return (
        <Col style={{ marginBottom: '8px' }}>
          <Text h2>Baquette</Text>
          <Text>
            garniert mit Pickles, Gurken und Koriander an einer Chili-Mayo
            Sauce.
          </Text>
        </Col>
      )
    }
    default:
      return null
  }
}
