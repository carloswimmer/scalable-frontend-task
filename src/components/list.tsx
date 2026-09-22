import styled from 'styled-components'

const ListRoot = styled.ol`
  list-style: none;

  & li + li {
    border-top: 1px solid var(--white-5);
  }

  & li:first-child {
    border-top-left-radius: calc(var(--spacing) * 1);
    border-top-right-radius: calc(var(--spacing) * 1);
  }
  & li:last-child {
    border-bottom-left-radius: calc(var(--spacing) * 1);
    border-bottom-right-radius: calc(var(--spacing) * 1);
  }
`

const ListItem = styled.li`
  display: flex;
  min-height: var(--row-min-height);
  padding: 0 calc(var(--spacing) * 2);
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background: var(--surface-list-item);
`

export const List = {
  Root: ListRoot,
  Item: ListItem,
}
