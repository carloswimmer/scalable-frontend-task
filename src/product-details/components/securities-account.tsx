import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import { List } from '../../components/list'
import { Row } from '../../components/row'

const Header2 = styled.h2`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  color: var(--white-60);
  margin-bottom: calc(var(--spacing) * 2);
  margin-top: calc(var(--spacing) * 3);
`

interface SecuritiesAccountProps {
  securitiesAccountNumber?: string | null
  custodianBankBIC?: string | null
}

export const SecuritiesAccount: FunctionComponent<SecuritiesAccountProps> = ({
  securitiesAccountNumber,
  custodianBankBIC,
}) => {
  return (
    <>
      <Header2 id={'Securities Account'}>{'Securities account'}</Header2>
      <List.Root aria-labelledby={'Securities Account'}>
        <List.Item>
          <Row.Content>
            <Row.Label>{'Account number'}</Row.Label>
            <Row.Value>{securitiesAccountNumber}</Row.Value>
          </Row.Content>
        </List.Item>
        <List.Item>
          <Row.Content>
            <Row.Label>{'BIC'}</Row.Label>
            <Row.Value>{custodianBankBIC}</Row.Value>
          </Row.Content>
        </List.Item>
      </List.Root>
    </>
  )
}
