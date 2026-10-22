import Link from 'next/link'
import ThemeToggle from '@/components/theme-toggle'
import { site } from '@/config/site'
export default function Footer() {
  return (
    <footer className='site-footer'>
      <div className='site-container'>
        <div className='footer-top'>
          <div>
            <Link className='wordmark' href='/'>
              zacky<span>.id</span>
            </Link>
            <p>
              Considered engineering.
              <br />
              Made in Indonesia.
            </p>
          </div>
          <nav aria-label='Elsewhere'>
            <a href={site.socials.github}>GitHub</a>
            <a href={site.socials.linkedin}>LinkedIn</a>
            <Link href='/feed.xml'>RSS feed</Link>
            <Link href='/privacy'>Privacy</Link>
          </nav>
          <ThemeToggle />
        </div>
        <div className='footer-bottom'>
          <p>© {new Date().getFullYear()} Zacky Achmad</p>
          <p>Built with care. Kept simple.</p>
        </div>
      </div>
    </footer>
  )
}
