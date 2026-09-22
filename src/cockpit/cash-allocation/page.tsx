import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { usePortfolio } from "../../product-details/hooks/use-portfolio";
import { deriveAllocationBreakdown } from "./derive-allocation";

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
`;

const BackButton = styled(Link)`
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
`;

const MainSection = styled.section`
  display: grid;
  gap: calc(var(--spacing) * 4);
  color: var(--white);
`;

const StatusMessage = styled.p`
  color: var(--white);
`;

const MetaList = styled.dl`
  display: grid;
  gap: calc(var(--spacing) * 2);
  margin: 0;
`;

const MetaRow = styled.div`
  display: grid;
  gap: calc(var(--spacing) * 0.5);
`;

const MetaLabel = styled.dt`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  color: var(--white-60);
  margin: 0;
`;

const MetaValue = styled.dd`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  margin: 0;
`;

const AllocationSection = styled.section`
  display: grid;
  gap: calc(var(--spacing) * 2);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  color: var(--white-60);
  margin: 0;
`;

const SliceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: calc(var(--spacing) * 2);
`;

const SliceItem = styled.li`
  display: grid;
  gap: calc(var(--spacing) * 1);
`;

const SliceBarTrack = styled.div`
  height: 8px;
  border-radius: 4px;
  background: var(--white-10, rgba(255, 255, 255, 0.1));
  overflow: hidden;
`;

const SliceBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: var(--white);
  border-radius: inherit;
`;

const SliceLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
`;

const IllustrationNote = styled.p`
  font-size: var(--font-size-sm);
  color: var(--white-60);
  margin: 0;
`;

export default function CashAllocationPage() {
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get("portfolioId") ?? "";
  const { portfolio, loading, error } = usePortfolio(portfolioId);

  if (!portfolioId) {
    return (
      <>
        <Header>
          <BackButton to="/" aria-label="Go Back">
            {"<"}
          </BackButton>
          <h1>{"Cash Balance Allocation"}</h1>
        </Header>
        <MainSection>
          <StatusMessage role="alert">
            {"A portfolio ID is required to view cash allocation."}
          </StatusMessage>
        </MainSection>
      </>
    );
  }

  const breakdown = deriveAllocationBreakdown(portfolioId);

  return (
    <>
      <Header>
        <BackButton to="/" aria-label="Go Back">
          {"<"}
        </BackButton>
        <h1>{"Cash Balance Allocation"}</h1>
      </Header>
      <MainSection>
        {loading && (
          <StatusMessage>{"Loading cash allocation..."}</StatusMessage>
        )}
        {!loading && error && (
          <StatusMessage role="alert">{error}</StatusMessage>
        )}
        {!loading && !error && portfolio && (
          <>
            <MetaList aria-label="Portfolio context">
              <MetaRow>
                <MetaLabel>{"Portfolio name"}</MetaLabel>
                <MetaValue>
                  {portfolio.personalizations?.name ?? "—"}
                </MetaValue>
              </MetaRow>
              <MetaRow>
                <MetaLabel>{"IBAN"}</MetaLabel>
                <MetaValue>{portfolio.cashAccount?.iban ?? "—"}</MetaValue>
              </MetaRow>
            </MetaList>
            <AllocationSection aria-labelledby="allocation-heading">
              <SectionTitle id="allocation-heading">
                {"Allocation breakdown"}
              </SectionTitle>
              <IllustrationNote>
                {
                  "Percentages are illustrative and derived locally for this assignment; they are not returned by the GraphQL API."
                }
              </IllustrationNote>
              <SliceList>
                {breakdown.map((slice) => (
                  <SliceItem key={slice.label}>
                    <SliceLabelRow>
                      <span>{slice.label}</span>
                      <span>{`${slice.percent}%`}</span>
                    </SliceLabelRow>
                    <SliceBarTrack aria-hidden>
                      <SliceBarFill $percent={slice.percent} />
                    </SliceBarTrack>
                  </SliceItem>
                ))}
              </SliceList>
            </AllocationSection>
          </>
        )}
      </MainSection>
    </>
  );
}
