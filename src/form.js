const Form = () => {
  const [responseMessage, setResponse] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      name: message.firstname + message.lastaname,
      email: message.email,
      message: message.description,
    };
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    const data = await res.json();
    setResponse(data.message);
  };

  const inputs = ["firstname", "lastname", "email"];
  return (
    <div>
      <p>{responseMessage}</p>
      <form onSubmit={handleSubmit}>
        {inputs.map((element, index) => (
          <input
            onChange={handleChange}
            key={index}
            name={element}
            placeholder={element}
          />
        ))}
        <textarea name="description" onChange={handleChange}></textarea>
        <button disabled={loading}>{loading ? "Loading ..." : "Submit"}</button>
      </form>
      <div className="contacts">
        <h1>Contacts</h1>
        <div>
          <i className="fa-solid fa-location-dot"></i>
          <p>location</p>
        </div>
        <div>
          <i className="fa-solid fa-mobile"></i>
          <p>Phone</p>
        </div>
        <div>
          <i className="fa-solid fa-envelope"></i>
          <p>location</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
