import type { FunctionComponent } from 'react'
import { List } from '../../components/list'
import { Row } from '../../components/row'
import { SectionHeading } from '../../components/section-heading'

interface CashAccountProps {
  portfolioId: string
  iban?: string | null
  bic?: string | null
  allOnboardingStepsCompleted: boolean
}

export const CashAccount: FunctionComponent<CashAccountProps> = ({
  portfolioId,
  iban,
  bic,
  allOnboardingStepsCompleted,
}) => {
  return (
    <>
      <SectionHeading id="cash-account">{'Cash account'}</SectionHeading>
      <List.Root aria-labelledby={'cash-account'}>
        <List.Item>
          <Row.Content>
            <Row.Label>{'IBAN'}</Row.Label>
            <Row.Value>{iban}</Row.Value>
          </Row.Content>
        </List.Item>
        <List.Item>
          <Row.Content>
            <Row.Label>{'BIC'}</Row.Label>
            <Row.Value>{bic}</Row.Value>
          </Row.Content>
        </List.Item>
        {allOnboardingStepsCompleted && (
          <List.Item>
            <Row.LinkContent>
              <a
                href={`/cockpit/cash-allocation?portfolioId=${portfolioId}`}
                target="_blank"
                rel="noreferrer"
              >
                {'Cash Balance Allocation'}
              </a>
            </Row.LinkContent>
          </List.Item>
        )}
      </List.Root>
    </>
  )
}
