import { Story } from '@storybook/react'
import { Token } from './Token'

export default {
  component: Token,
  title: 'ComponentComposition/Token',
}

export const Basic: Story = () => {
  return (
    <div>
      <div>
        <Token gutter={8}>
          <Token.Text>Some Token</Token.Text>
          <Token.Delete
            onClick={() => console.log('Deleting Token')}
            width={20}
          />
        </Token>
      </div>
      <div>
        <Token gutter={8}>
          <Token.Delete
            onClick={() => console.log('Deleting Token')}
            width={20}
          />
          <Token.Text>Some Token</Token.Text>
        </Token>
      </div>
    </div>
  )
}
