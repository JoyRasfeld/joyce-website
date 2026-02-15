export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>&copy; {year} Joyce Art Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
