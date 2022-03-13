import * as React from 'react'

type ContainerKeys = 'A' | 'B' | 'C' | 'D'

interface Card {
  containerKey: ContainerKeys
  title: string
}

const testCards: Card[] = [
  { containerKey: 'A', title: 'Card 1' },
  { containerKey: 'B', title: 'Card 2' },
  { containerKey: 'C', title: 'Card 3' },
  { containerKey: 'D', title: 'Card 4' },
  { containerKey: 'A', title: 'Card 5' },
  { containerKey: 'A', title: 'Card 6' },
  { containerKey: 'A', title: 'Card 7' },
  { containerKey: 'B', title: 'Card 8' },
  { containerKey: 'D', title: 'Card 9' },
  { containerKey: 'D', title: 'Card 10' },
]

const filterCardsForContainer = (key: Card['containerKey']) => (card: Card) =>
  card.containerKey === key

const mapCards = ({ containerKey, title }, i) => (
  <Card key={`${containerKey}-${title}-${i}`} title={title} />
)

export const WithoutXState: React.VFC = () => {
  const [
    activeContainer,
    setActiveContainer,
  ] = React.useState<ContainerKeys | null>(null)
  const [isAdding, setIsAdding] = React.useState(false)

  const [cards, setCards] = React.useState<Card[]>(testCards)

  const { ACards, BCards, CCards, DCards } = React.useMemo(
    () => ({
      ACards: cards.filter(filterCardsForContainer('A')),
      BCards: cards.filter(filterCardsForContainer('B')),
      CCards: cards.filter(filterCardsForContainer('C')),
      DCards: cards.filter(filterCardsForContainer('D')),
    }),
    [cards]
  )

  const containerCallbacks = React.useMemo(
    () => ({
      onContainerEnter: (key: ContainerKeys) => {
        if (!isAdding) setActiveContainer(key)
      },
      onContainerExit: () => {
        if (!isAdding) setActiveContainer(null)
      },
    }),
    [isAdding, setActiveContainer]
  )

  const handlePlaceholderSubmit = (newCard: Card): void => {
    setCards([...cards, newCard])
    setIsAdding(false)
  }

  const AdderComponentForContainer = (
    containerKey: ContainerKeys
  ): null | JSX.Element => {
    const isActiveContainer = activeContainer === containerKey
    if (!isActiveContainer) return null

    if (!isAdding) {
      return <button onClick={() => setIsAdding(true)}>Add</button>
    }

    return (
      <PlaceholderForm
        containerKey={containerKey}
        onCardSubmit={handlePlaceholderSubmit}
      />
    )
  }

  return (
    <div>
      <Container {...containerCallbacks} containerKey="A">
        {ACards.map(mapCards)}
        {AdderComponentForContainer('A')}
      </Container>
      <Container {...containerCallbacks} containerKey="B">
        {BCards.map(mapCards)}
        {AdderComponentForContainer('B')}
      </Container>
      <Container {...containerCallbacks} containerKey="C">
        {CCards.map(mapCards)}
        {AdderComponentForContainer('C')}
      </Container>
      <Container {...containerCallbacks} containerKey="D">
        {DCards.map(mapCards)}
        {AdderComponentForContainer('D')}
      </Container>
    </div>
  )
}

interface ContainerProps {
  containerKey: ContainerKeys
  onContainerEnter: (key: ContainerKeys) => void
  onContainerExit: () => void
}

const Container: React.FC<ContainerProps> = ({
  containerKey,
  children,
  onContainerEnter,
  onContainerExit,
}) => {
  return (
    <div
      onMouseEnter={() => onContainerEnter(containerKey)}
      onMouseLeave={() => onContainerExit()}
    >
      <h1>Container {containerKey}</h1>
      <div>{children}</div>
    </div>
  )
}

interface PlaceholderProps {
  containerKey: ContainerKeys
  onCardSubmit: (newCard: Card) => void
}

const PlaceholderForm: React.VFC<PlaceholderProps> = ({
  containerKey,
  onCardSubmit,
}) => {
  const formRef = React.useRef(null)
  const handleFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    onCardSubmit({ containerKey, title: event.target[0].value })
    formRef.current.reset()
  }
  return (
    <form onSubmit={handleFormSubmit} ref={formRef}>
      <input autoFocus={true} name="placeholder" />
    </form>
  )
}

interface CardProps {
  title: string
}

const Card: React.VFC<CardProps> = ({ title }) => <div>{title}</div>
