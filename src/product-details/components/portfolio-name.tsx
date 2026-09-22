import type React from 'react'
import { List } from '../../components/list'
import { Row } from '../../components/row'
import { PortfolioNameValue } from './portfolio-name-value'

interface PortfolioNameProps {
  name: string
  onSave: (name: string) => Promise<string | undefined> | string | undefined
}

export const PortfolioName: React.FunctionComponent<PortfolioNameProps> = ({
  name,
  onSave,
}) => {
  return (
    <List.Root>
      <List.Item>
        <Row.Content>
          <Row.Label>Portfolio name</Row.Label>
          <Row.Value>
            <PortfolioNameValue initialState={name} onSave={onSave} />
          </Row.Value>
        </Row.Content>
      </List.Item>
    </List.Root>
  )
}
