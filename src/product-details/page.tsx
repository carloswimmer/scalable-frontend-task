import styled from 'styled-components'
import { ArrowLeft } from '../assets/ArrowLeft'
import { PORTFOLIO_ID } from '../graphql/constants'
import { focusRingVisible } from '../styles/focus-ring'
import { CashAccount } from './components/cash-account'
import { PortfolioName } from './components/portfolio-name'
import { SecuritiesAccount } from './components/securities-account'
import { usePortfolio } from './hooks/use-portfolio'

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
          <ArrowLeft />
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

const Header = styled.div`
  margin-top: calc(var(--spacing) * 5);
  margin-bottom: calc(var(--spacing) * 5);
  min-height: var(--header-min-height);
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  color: var(--white);

  & h1 {
    color: inherit;
  }
`

const BackButton = styled.a`
  color: var(--white-60);
  width: calc(var(--spacing) * 2.5);
  height: calc(var(--spacing) * 2.5);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    ${focusRingVisible}
  }
`

const MainSection = styled.section`
  display: grid;
  gap: calc(var(--spacing) * 4);
`

const StatusMessage = styled.p`
  color: var(--white);
`
