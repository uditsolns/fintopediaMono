export const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
        </div>
      </footer>
    );
  };