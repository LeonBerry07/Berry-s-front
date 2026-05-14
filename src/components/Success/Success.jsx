import { Link } from "react-router-dom";
import "./Success.css";

export default function Success() {
  return (
    <div className="success-container">
      <h1>🎉 Purchase Completed!</h1>

      <p>
        Thank you for your purchase. Your beats are now available.
      </p>

      <p>
        A confirmation email has been sent to your inbox.
      </p>

      <Link to="/catalogue" className="success-button">
        Back to Catalogue 🎵
      </Link>
    </div>
  );
}