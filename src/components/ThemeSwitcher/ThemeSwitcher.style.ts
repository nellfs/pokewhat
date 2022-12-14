import styled from 'styled-components';
interface ThemeSwitcherProps {
  theme_title: string;
}

export const ThemeSwitcherButton = styled.button`
  background-color: ${(p) => p.theme.colors.background};
  border-radius: 100px;
  border-style: none;
  display: inline-flex;
  border: 1px solid ${(p) => p.theme.colors.outline};
  cursor: pointer;
  position: relative;
  align-items: center;
  font-size: 14px;
  height: 26px;
  list-style: none;
  outline: none;
  padding: 1px 2px;
  justify-content: space-between;
  width: 56px;
  user-select: none;
  transition: background-color 0.3s ease;
`;

export const SwitchCircle = styled.div<ThemeSwitcherProps>`
  user-select: none;
  position: absolute;
  background: ${(p) => p.theme.colors.outline};
  width: 22px;
  height: 22px;
  border-radius: 100px;
  transition: transform 0.3s ease;
  transform: translateX(
    ${({ theme_title }) => (theme_title == 'light' ? 'px' : '28px')}
  );
`;
