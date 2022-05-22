import * as React from 'react'
import { CSSObject } from '@emotion/react'
import { XIcon } from '@primer/octicons-react'

const boxSizing: CSSObject = {
  boxSizing: 'border-box',
  '*': { boxSizing: 'border-box' },
}

type DeleteComponent = React.FC<{
  onClick: () => void
  width: number
}>

const Delete: DeleteComponent = ({ onClick, width }) => {
  const styles: CSSObject = {
    width,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    padding: 0,
    margin: 0,
  }

  return (
    <button css={styles} onClick={onClick}>
      <XIcon fill="currentColor" />
    </button>
  )
}

type TextComponent = React.FC<{ children: string }>
const Text: TextComponent = ({ children }) => {
  const styles: CSSObject = {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  }
  return <span css={styles}>{children}</span>
}

type TokenSubcomponents = {
  Delete: DeleteComponent
  Text: TextComponent
}

type TokenComponent = React.FC<{ gutter: number }> & TokenSubcomponents

export const Token: TokenComponent = ({ children, gutter }) => {
  const layout: CSSObject = {
    ...boxSizing,
    display: 'inline-flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: `${gutter}px`,
    paddingInlineStart: `${gutter}px`,
    paddingInlineEnd: `${gutter}px`,
    height: 36,
  }

  const color: CSSObject = {
    backgroundColor: 'slategrey',
    borderRadius: 3,
    color: 'white',
  }

  return <span css={[layout, color]}>{children}</span>
}

Token.Delete = Delete
Token.Text = Text
