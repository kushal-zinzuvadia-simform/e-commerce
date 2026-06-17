export const Footer = () => {
  return (
    <footer
      className="
        mt-16
        border-t border-slate-200
        bg-white
      "
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              ShopSphere
            </h3>

            <p className="text-sm text-slate-500 leading-6">
              © {new Date().getFullYear()} ShopSphere. All rights reserved.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Contact
            </h3>

            <ul className="space-y-2 text-sm text-slate-500">
              <li>Email: support@shopsphere.com</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Address
            </h3>

            <p className="text-sm text-slate-500 leading-6">
              123 MG Road,
              <br />
              Ahmedabad, Gujarat,
              <br />
              India - 380001
            </p>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              className="
                inline-block mt-3
                text-sm font-medium text-slate-700
                underline-offset-4
                hover:underline
              "
            >
              View on map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
