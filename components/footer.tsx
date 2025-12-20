import type { ContactContent, ImportantContent, SocialLink } from "@/lib/site-content"

interface FooterProps {
  contact: ContactContent
  important: ImportantContent
  socialLinks: SocialLink[]
}

export default function Footer({ contact, important, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Taco Shop</h3>
            <p className="text-white/80">{important.highlight}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            {contact.hours.map((entry) => (
              <p key={`footer-${entry.label}-${entry.value}`} className="text-white/80">
                {entry.label}: {entry.value}
              </p>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            {contact.addressLines.map((line) => (
              <p key={`footer-address-${line}`} className="text-white/80">
                {line}
              </p>
            ))}
            <p className="text-white/80 mt-2">{contact.phone}</p>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={`footer-social-${link.label}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-dark/30 mt-8 pt-8 text-center text-white/60">
          <p>
            © {currentYear} Taco Shop. All rights reserved. Created by{" "}
            <a href="https://snoball.media" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Snoball Media
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
