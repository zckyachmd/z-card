import { ResetAnalyticsConsent } from '@/components/analytics-consent'
import { PageIntro, PageShell } from '@/components/editorial'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Privacy',
  'How contact messages and optional analytics are handled on zacky.id.',
  '/privacy',
)
export default function PrivacyPage() {
  return (
    <PageShell trail={[{ name: 'Privacy', path: '/privacy' }]}>
      <PageIntro
        title='A little less tracking.'
        description='The site works without analytics. Contact information is used to respond to your message.'
      />
      <div className='prose article-body'>
        <h2>Optional analytics</h2>
        <p>
          Google Analytics is disabled unless a measurement ID is configured and you allow it. Do
          Not Track and Global Privacy Control prevent tracking. Advertising features are disabled.
          Page paths and predefined interaction names may be measured; query strings, message
          contents, email addresses, and form values are not sent as analytics parameters.
        </p>
        <p>
          Google processes analytics data under its own policies. The site operator should configure
          retention and disable enhanced measurement that could collect personal information.
          Declining does not affect the website.
        </p>
        <ResetAnalyticsConsent />
        <h2>Contact</h2>
        <p>
          When you use the contact form, your name, email address, and message are sent to the
          configured email service to support a reply. Rate limiting uses your network address
          temporarily in server memory. Bot protection may contact Cloudflare when configured. Do
          not include confidential information.
        </p>
        <p>
          If email delivery is unavailable, you can write directly to hi@zacky.id. Infrastructure
          providers may keep access logs under their own retention settings.
        </p>
      </div>
    </PageShell>
  )
}
