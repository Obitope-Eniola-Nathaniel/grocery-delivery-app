// React Hook for storing component state
import { useState } from "react";

// Icons from Lucide React
// Think of these as React components (<BikeIcon />, <UserIcon />, etc.)
import {
  ArrowUpRightIcon,
  BikeIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

// Link -> Navigate without refreshing the page
// useNavigate -> Navigate using JavaScript
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  // Fake user data
  // Normally this would come from Context, Redux or an API.
  const user: any = {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: true,
  };

  // Fake cart data
  // In a real app this comes from global state.
  const { cartCount, setIsCartOpen } = {
    cartCount: 5,
    setIsCartOpen: (_data: any) => {},
  };

  // -----------------------------
  // COMPONENT STATE
  // -----------------------------

  // Stores whatever the user types into the search input.
  const [searchQuery, setSearchQuery] = useState("");

  // Controls whether the dropdown menu is open.
  const [userMenuOpen, setuserMenuOpen] = useState(false);

  // Allows us to change pages programmatically.
  const navigate = useNavigate();

  // -----------------------------
  // FUNCTIONS
  // -----------------------------

  // Runs when the search form is submitted.
  const handleSearch = (e: React.FormEvent) => {
    // Prevent page refresh.
    e.preventDefault();

    // Ignore empty searches.
    if (searchQuery.trim()) {

      // Redirect user to
      // /search?q=apple
      navigate(`search?q=${encodeURIComponent(searchQuery.trim())}`);

      // Clear input after searching.
      setSearchQuery("");
    }
  };

  // Logout logic
  const handleLogout = () => {

    // Close dropdown first.
    setuserMenuOpen(false);

    // Navigate to home page.
    navigate("/");
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-19 gap-4">

        {/* ==========================
            LOGO
        =========================== */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[22px] font-medium shrink-0"
        >
          <BikeIcon size={24} />
          Instacart
        </Link>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">

          {/* ==========================
              Desktop Navigation Links
          =========================== */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/deals" className="text-app-orange">Deals</Link>
          </div>

          {/* ==========================
              Search Form
          =========================== */}

          {/* When Enter is pressed, handleSearch() is called. */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
          >

            {/* relative allows the search icon to be positioned inside the input */}
            <div className="relative w-full">

              {/* Search Icon */}
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />

              <input
                type="text"
                placeholder="Search for groceries..."

                // Controlled Input
                // React owns the value.
                value={searchQuery}

                // Every key press updates state.
                onChange={(e) => setSearchQuery(e.target.value)}

                className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30"
              />
            </div>
          </form>

          {/* ==========================
              Right Side Actions
          =========================== */}
          <div className="flex items-center gap-3">

            {/* ------------------------
                Shopping Cart
            ------------------------- */}

            <button
              className="relative p-2 rounded-xl"
              // Opens cart drawer
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="size-5 text-zinc-900" />

              {/* Render badge ONLY if cart has items */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* ------------------------
                User Section
            ------------------------- */}
            <div className="relative">

              {/* If logged in */}
              {user ? (

                <button
                  // Toggle dropdown
                  onClick={() => setuserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2"
                >

                  {/* User Avatar */}
                  <div className="size-7 rounded-full bg-green-950 text-white flex-center">

                    {/* Show first letter of user's name */}
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <ChevronDownIcon className="size-3 text-zinc-500" />
                </button>

              ) : (

                // Guest User
                <div className="flex-center gap-2">

                  {/* Desktop Login Button */}
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950-light transition-colors"
                  >
                    <UserIcon size={16} />
                    Sign In
                  </Link>

                  {/* Mobile Menu Icon */}
                  {userMenuOpen ? (
                    <XIcon
                      className="md:hidden"
                      onClick={() => setuserMenuOpen(false)}
                    />
                  ) : (
                    <MenuIcon
                      className="md:hidden"
                      onClick={() => setuserMenuOpen(true)}
                    />
                  )}
                </div>
              )}

              {/* ------------------------
                  Dropdown Menu
              ------------------------- */}

              {/* Render only when open */}
              {userMenuOpen && (

                <>
                  {/* Invisible overlay.
                     Clicking outside closes menu. */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setuserMenuOpen(false)}
                  >

                    {/* Actual dropdown */}
                    <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">

                      {/* User Info */}
                      {user && (
                        <div className="px-4 py-2 border-b border-app-border">
                          <p>{user.name}</p>
                          <p>{user.email}</p>
                        </div>
                      )}

                      {/* Close menu whenever any link is clicked */}
                      <div onClick={() => setuserMenuOpen(false)}>

                        {/* Guest */}
                        {!user && (
                          <Link to="/login" className="dropdown-link">
                            <UserIcon size={16} />
                            Sign In
                          </Link>
                        )}

                        {/* Logged-in User */}
                        {user && (
                          <Link to="/orders" className="dropdown-link">
                            <PackageIcon size={16} />
                            My Orders
                          </Link>
                        )}

                        {user && (
                          <Link to="/addresses" className="dropdown-link">
                            <MapPinIcon size={16} />
                            Addresses
                          </Link>
                        )}

                        {/* Mobile-only links */}
                        <Link to="/products" className="dropdown-link md:hidden">
                          <ArrowUpRightIcon size={16} />
                          Product
                        </Link>

                        <Link to="/deals" className="dropdown-link md:hidden">
                          <ArrowUpRightIcon size={16} />
                          Deals
                        </Link>

                        {/* Only admins see this */}
                        {user?.isAdmin && (
                          <Link to="/admin/products" className="dropdown-link">
                            <ShieldIcon size={16} />
                            Admin Panel
                          </Link>
                        )}

                        {/* Logout */}
                        {user && (
                          <div className="border-t border-app-border pt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                            >
                              <LogOutIcon size={16} />
                              Logout
                            </button>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;