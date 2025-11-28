export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Taco Shop</h3>
            <p className="text-white/80">Authentic Mexican cuisine in the heart of Reno, Nevada.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p className="text-white/80">Monday: Closed</p>
            <p className="text-white/80">Tuesday - Saturday: 11:00 AM - 9:00 PM</p>
            <p className="text-white/80">Sunday: Closed</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-white/80">811 S Center St, Reno, NV 89501</p>
            <p className="text-white/80">Cheney Street Alley</p>
            <p className="text-white/80">(775) 507-7515</p>
          </div>
        </div>

        <div className="border-t border-dark/30 mt-8 pt-8 text-center text-white/60">
          <p>© {currentYear} Taco Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
