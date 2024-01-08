import { SLink, LogoIcon } from './Logo.styled';

export const Logo = () => {
  return (
    <SLink to="/" aria-label="logo company">
      <LogoIcon />
      <span>BloomSkill</span>
    </SLink>
  );
};
