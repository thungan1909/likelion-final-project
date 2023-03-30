import "./notFound.css";
export default function NotFound() {
  return (
    <div className="notfound__page">
      <div className="notfound__content">
        <span className="notfound__code">404</span>
        <span className="notfound__message">Page not found</span>
        <a className="notfound__home-link" href="/home">
          Back to home page
        </a>
      </div>
    </div>
  );
}
