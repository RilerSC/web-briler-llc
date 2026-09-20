import { Link } from "@/navigation";

export default function NotFound() {
  return (
    <div className="notfound">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="h2" style={{ marginTop: 16 }}>
          Página no encontrada / Page not found
        </h1>
        <p className="lede" style={{ margin: "22px auto 0" }}>
          The page you requested is not part of this site.
        </p>
        <p style={{ marginTop: 32 }}>
          <Link href="/" className="btn btn--primary">
            Volver al inicio / Go home
          </Link>
        </p>
      </div>
    </div>
  );
}
