export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-4">FIND A STORE</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Become A Member</li>
              <li>Sign Up for Email</li>
              <li>Send Us Feedback</li>
              <li>Student Discounts</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-4">GET HELP</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Order Status</li>
              <li>Delivery</li>
              <li>Returns</li>
              <li>Payment Options</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-4">ABOUT NIKE</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>News</li>
              <li>Careers</li>
              <li>Investors</li>
              <li>Sustainability</li>
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <div className="flex space-x-4">
              {/* Social icons will go here */}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2025 Nike, Inc. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
