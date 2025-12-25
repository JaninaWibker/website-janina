import { StyledLink } from './Basic'

const licenseUrl = 'https://creativecommons.org/licenses/by-sa/4.0/'
const repoUrl = 'https://github.com/JaninaWibker/website-janina'

export const Footer = () => (
  <div className="flex flex-col gap-1 py-4 text-secondary-9">
    <hr className="border-secondary-7" />
    <div>
      <span className="">
        {'© janina 2026, licensed under '}
        <StyledLink href={licenseUrl} externalIcon>
          CC BY-SA
        </StyledLink>
        {', '}
      </span>
      <span className="">
        <StyledLink href={repoUrl} externalIcon>
          source code
        </StyledLink>
        {' (website)'}
      </span>
    </div>
  </div>
)
