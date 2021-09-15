import React, { FunctionComponent, useState } from 'react'
import styles from './foodSelection.module.scss'
import { IngredientsSelection } from '../ingredients/ingredients'
import { Grid, Spacer, Text } from '@geist-ui/react'

export type FoodCategory = 'Bun' | 'Banhmi'

interface IFoodSelectionProps {
  person: string
}

export const FoodSelection: FunctionComponent<IFoodSelectionProps> = ({
  person,
}) => {
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
      <Grid.Container>{getCategoryDescription(foodCategory)}</Grid.Container>
      <Grid.Container gap={2} className={styles.wrapper}>
        <Grid xs={24} sm={12}>
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
              }url('https://limmatladen.ch/site/assets/files/1031/banhmi.300x0.png')`,
            }}
          >
            Banhmi
          </button>
        </Grid>
        <Grid xs={24} sm={12}>
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
              }url('https://limmatladen.ch/site/assets/files/1029/bun.300x0.png')`,
            }}
          >
            Bun
          </button>
        </Grid>
      </Grid.Container>
      <Spacer h={4} />

      <IngredientsSelection foodCategory={foodCategory} person={person} />
    </>
  )
}

const getCategoryDescription = (foodCategory: FoodCategory) => {
  switch (foodCategory) {
    case 'Bun': {
      return (
        <Grid style={{ marginBottom: '8px' }}>
          <Text h2>Reisnudeln</Text>
          <Text>
            garniert mit Pickles, Gurken, Minze, Koriander an einer leichten
            Sojasauce.
          </Text>
        </Grid>
      )
    }
    case 'Banhmi': {
      return (
        <Grid style={{ marginBottom: '8px' }}>
          <Text h2>Baguette</Text>
          <Text>
            garniert mit Pickles, Gurken und Koriander an einer Chili-Mayo
            Sauce.
          </Text>
        </Grid>
      )
    }
    default:
      return null
  }
}
