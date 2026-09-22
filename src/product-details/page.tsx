import styled from 'styled-components'
import { PORTFOLIO_ID } from '../graphql/constants'
import { CashAccount } from './components/cash-account'
import { PortfolioName } from './components/portfolio-name'
import { SecuritiesAccount } from './components/securities-account'
import { usePortfolio } from './hooks/use-portfolio'

const Header = styled.div`
  margin-top: calc(var(--spacing) * 5);
  margin-bottom: calc(var(--spacing) * 5);
  min-height: 64px;
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  color: var(--white);

  & h1 {
    color: inherit;
  }
`

const BackButton = styled.a`
  color: var(--white);
  width: calc(var(--spacing) * 3);
  height: calc(var(--spacing) * 3);
  outline-offset: 2px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0px 0px 0px 1px var(--woodsmoke), 0px 0px 0px 3px var(--white);
  }
`

const MainSection = styled.section`
  display: grid;
  gap: calc(var(--spacing) * 4);
`

const StatusMessage = styled.p`
  color: var(--white);
`

export default function ProductDetails() {
  const { portfolio, loading, error, rename } = usePortfolio(PORTFOLIO_ID)
  const {
    personalizations,
    id,
    cashAccount,
    securitiesAccountNumber,
    custodianBankBIC,
    postOnboardingInfo,
  } = portfolio ?? {}

  return (
    <>
      <Header>
        <BackButton href="/" aria-label={'Go Back'}>
          {'<'}
        </BackButton>
        <h1>{'Product Details'}</h1>
      </Header>
      <MainSection>
        {loading && <StatusMessage>Loading product details...</StatusMessage>}
        {!loading && error && (
          <StatusMessage role="alert">{error}</StatusMessage>
        )}
        {!loading && !error && portfolio && (
          <div>
            <PortfolioName
              name={personalizations?.name ?? ''}
              onSave={rename}
            />
            <CashAccount
              portfolioId={id ?? ''}
              iban={cashAccount?.iban}
              bic={cashAccount?.bic}
              allOnboardingStepsCompleted={
                postOnboardingInfo?.allStepsCompleted ?? false
              }
            />
            <SecuritiesAccount
              securitiesAccountNumber={securitiesAccountNumber}
              custodianBankBIC={custodianBankBIC}
            />
          </div>
        )}
      </MainSection>
    </>
  )
}
