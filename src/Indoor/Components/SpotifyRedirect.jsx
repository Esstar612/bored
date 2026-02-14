export default function SpotifyRedirect() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#dff0d8",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "300px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="72"
        viewBox="0 0 24 24"
        fill="green"
        style={{ marginBottom: "20px" }}
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}>
        Successfully authenticated with Spotify! You can now return to Bored.
      </p>
    </div>
  );
}