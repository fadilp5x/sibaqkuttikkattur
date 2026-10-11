import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center py-28 text-center">
      <p className="display text-[26vw] leading-none text-stroke-cream sm:text-9xl">404</p>
      <p className="kicker mt-2">This stage is empty</p>
      <h1 className="display mt-3 text-3xl text-ink">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-ink/60">
        The page you are looking for has left the venue.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to the fest
      </Link>
    </section>
  );
}
