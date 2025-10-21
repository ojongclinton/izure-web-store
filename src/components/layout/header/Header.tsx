export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">NIKE</div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/men">Men</a>
            <a href="/women">Women</a>
            <a href="/kids">Kids</a>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search, Wishlist, Cart icons will go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
