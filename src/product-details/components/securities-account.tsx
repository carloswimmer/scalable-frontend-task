import type { FunctionComponent } from 'react'
import { List } from '../../components/list'
import { Row } from '../../components/row'
import { SectionHeading } from '../../components/section-heading'

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
      <SectionHeading id={'Securities Account'}>
        {'Securities account'}
      </SectionHeading>
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
