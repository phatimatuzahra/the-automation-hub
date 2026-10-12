
import { useState } from 'react'
import './App.css'

const BUSINESS_EMAIL = 'contact@theautomationhub.online'
const API_URL = 'http://127.0.0.1:8000'

const products = [
  {
    number: '01',
    category: 'Hospitality',
    title: 'Restaurant Management',
    description:
      'Organize menus, orders, billing, and everyday restaurant operations.',
  },
  {
    number: '02',
    category: 'Business Operations',
    title: 'ERP Software',
    description:
      'Bring business processes, records, and operational workflows together.',
  },
  {
    number: '03',
    category: 'Artificial Intelligence',
    title: 'AI Automation',
    description:
      'Explore automation opportunities for repetitive business tasks.',
  },
  {
    number: '04',
    category: 'Customer Management',
    title: 'CRM Software',
    description:
      'Organize leads, customer records, and sales follow-up activities.',
  },
  {
    number: '05',
    category: 'Inventory',
    title: 'Inventory Management',
    description:
      'Track products, monitor stock, and simplify inventory operations.',
  },
  {
    number: '06',
    category: 'Reporting',
    title: 'Business Analytics',
    description:
      'Understand business performance through reports and useful insights.',
  },
]

function App() {
  const [contactStatus, setContactStatus] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function handleContactSubmit(event) {
    event.preventDefault()

    const formElement = event.currentTarget
    const form = new FormData(formElement)

    const name = form.get('name')
    const email = form.get('email')
    const company = form.get('company') || 'Not provided'
    const interest = form.get('interest')
    const message = form.get('message')

    setIsSending(true)
    setContactStatus('')

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: [
            `Company: ${company}`,
            `Interested in: ${interest}`,
            '',
            message,
          ].join('\n'),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.detail || 'Unable to send your inquiry.'
        )
      }

      setContactStatus(
        'Your inquiry has been sent successfully.'
      )

      formElement.reset()
    } catch (error) {
      setContactStatus(
        error.message === 'Failed to fetch'
          ? 'Could not connect to the server. Please try again.'
          : error.message
      )
    } finally {
      setIsSending(false)
    }
  }

  function handleSubscribeSubmit(event) {
    event.preventDefault()

    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const email = form.get('subscriberEmail')
    const consent = form.get('consent')

    if (!consent) {
      window.alert(
        'Please confirm your consent before continuing.'
      )
      return
    }

    const subject = 'Product Updates Subscription Request'
    const body = [
      'Please review this subscription request.',
      `Email address: ${email}`,
      '',
      'The visitor checked the consent box on The Automation Hub website.',
      'Please record the subscription only after verifying the request.',
    ].join('\n')

    window.location.href =
      `mailto:${BUSINESS_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    formElement.reset()
  }

  return (
    <div className="website">
      <header className="navbar">
        <a
          className="logo"
          href="#home"
          aria-label="The Automation Hub home"
        >
          <img
            src="/logo.png"
            alt="The Automation Hub"
            className="logo-image"
          />
        </a>

        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#products">Solutions</a>
          <a href="#about">About</a>
          <a className="nav-button" href="#contact">
            Contact Us
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              BUSINESS SOFTWARE &amp; AUTOMATION
            </span>

            <h1>
              Help your business
              <span> work smarter.</span>
            </h1>

            <p>
              Discover software solutions for business operations, customer
              management, inventory, analytics, and AI-powered automation.
              Explore options designed around your business needs.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#products">
                Explore Solutions
              </a>
              <a className="text-button" href="#contact">
                Discuss Your Needs →
              </a>
            </div>

            <div className="hero-note">
              Practical technology for modern business workflows
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Business software illustration"
          >
            <div className="visual-glow" />

            <div className="dashboard-card">
              <div className="dashboard-top">
                <div>
                  <span className="dashboard-label">
                    THE AUTOMATION HUB
                  </span>
                  <h3>Business workflows</h3>
                </div>

                <div className="dashboard-icon">
                  <img
                    src="/logo.png"
                    alt="The Automation Hub"
                  />
                </div>
              </div>

              <div className="dashboard-feature">
                <div className="feature-icon blue">01</div>
                <div>
                  <strong>Connected operations</strong>
                  <p>Organize everyday processes</p>
                </div>
              </div>

              <div className="dashboard-feature">
                <div className="feature-icon purple">02</div>
                <div>
                  <strong>Workflow automation</strong>
                  <p>Explore opportunities to save time</p>
                </div>
              </div>

              <div className="dashboard-feature">
                <div className="feature-icon green">03</div>
                <div>
                  <strong>Business insights</strong>
                  <p>Support informed decisions</p>
                </div>
              </div>

              <div className="dashboard-bottom">
                <span>Technology around your needs</span>
                <img
                  src="/logo.png"
                  alt="The Automation Hub"
                  className="bottom-logo"
                />
              </div>
            </div>

            <div className="floating-badge">
              Solutions for growing businesses
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <span>BUSINESS SOFTWARE</span>
          <span>WORKFLOW AUTOMATION</span>
          <span>AI SOLUTIONS</span>
          <span>DIGITAL TRANSFORMATION</span>
        </section>

        <section className="products section" id="products">
          <div className="section-heading">
            <span className="eyebrow">EXPLORE OUR SOLUTIONS</span>
            <h2>Technology for everyday business challenges.</h2>
            <p>
              Explore these software categories and contact us to discuss
              availability, features, and your requirements.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.number}>
                <div className="product-card-top">
                  <span className="product-number">
                    {product.number}
                  </span>
                  <span className="product-arrow">↗</span>
                </div>

                <span className="product-tag">
                  {product.category}
                </span>

                <h3>{product.title}</h3>
                <p>{product.description}</p>

                <a
                  className="learn-link"
                  href={`mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
                    `Inquiry about ${product.title}`
                  )}`}
                >
                  Ask about this solution <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-symbol">
            <img
              src="/logo.png"
              alt="The Automation Hub"
            />
          </div>

          <div className="about-content">
            <span className="eyebrow">ABOUT US</span>
            <h2>Technology should make work easier.</h2>
            <p>
              The Automation Hub focuses on business software, digital
              products, and practical automation solutions. We aim to help
              businesses identify tools that fit their requirements and
              improve everyday workflows.
            </p>
            <a className="primary-button" href="#contact">
              Discuss Your Requirements
            </a>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-content">
            <span className="eyebrow">BUSINESS INQUIRIES</span>
            <h2>Let's discuss what your business needs.</h2>
            <p>
              Interested in a software solution? Send us your requirements
              to discuss product information, pricing, or a possible demo.
            </p>

            <div className="contact-detail">
              <span className="contact-detail-icon">@</span>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${BUSINESS_EMAIL}`}>
                  {BUSINESS_EMAIL}
                </a>
              </div>
            </div>

            <p className="small-note">
              Submit this form to send your inquiry directly to our team.
            </p>
          </div>

          <form
            className="contact-card"
            onSubmit={handleContactSubmit}
          >
            <span className="contact-label">
              CONTACT OUR TEAM
            </span>
            <h3>Tell us about your project.</h3>

            <label htmlFor="name">Your name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              required
            />

            <label htmlFor="email">Your email *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />

            <label htmlFor="company">Company name</label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Your company (optional)"
              autoComplete="organization"
            />

            <label htmlFor="interest">
              What are you interested in? *
            </label>
            <select
              id="interest"
              name="interest"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a solution
              </option>

              {products.map((product) => (
                <option
                  key={product.number}
                  value={product.title}
                >
                  {product.title}
                </option>
              ))}

              <option value="Other business solution">
                Other business solution
              </option>
            </select>

            <label htmlFor="message">Your requirements *</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Tell us what you need..."
              required
            />

            <button
              className="primary-button submit-button"
              type="submit"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Inquiry'}
            </button>

            {contactStatus && (
              <p role="status" aria-live="polite">
                {contactStatus}
              </p>
            )}
          </form>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-copy">
            <span className="eyebrow">
              OPTIONAL EMAIL UPDATES
            </span>
            <h2>Hear about products and new solutions.</h2>
            <p>
              Request occasional updates about software products, business
              tools, and relevant offers. Subscription is optional.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={handleSubscribeSubmit}
          >
            <label htmlFor="subscriberEmail">
              Your email address
            </label>
            <input
              id="subscriberEmail"
              name="subscriberEmail"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />

            <label className="consent-label">
              <input
                type="checkbox"
                name="consent"
                required
              />
              <span>
                I agree to receive occasional product updates and offers
                from The Automation Hub. I understand that I can withdraw
                my consent at any time.
              </span>
            </label>

            <button
              className="primary-button submit-button"
              type="submit"
            >
              Request Subscription
            </button>

            <p className="form-disclaimer">
              This starter form opens an email draft. It does not
              automatically register your subscription. A working
              subscription service and unsubscribe process must be
              connected before sending campaigns.
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <a
          className="logo"
          href="#home"
          aria-label="The Automation Hub home"
        >
          <img
            src="/logo.png"
            alt="The Automation Hub"
            className="logo-image"
          />
        </a>

        <p>
          Software solutions and ideas for smarter business operations.
        </p>

        <div className="footer-links">
          <a href={`mailto:${BUSINESS_EMAIL}`}>Contact</a>
          <a href="#privacy">Privacy information</a>
        </div>

        <div className="privacy-note" id="privacy">
          Contact details submitted through the contact form are sent
          to the configured business email. Subscription requests are
          not stored by this website.
        </div>

        <span className="copyright">
          © {new Date().getFullYear()} The Automation Hub
        </span>
      </footer>
    </div>
  )
}

export default App
