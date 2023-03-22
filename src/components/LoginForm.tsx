export default function LoginForm() {
  return (
    <form data-cy="LoginForm" className="login-form">
      <img src="public/extend-logo.png" alt="Extend" />

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input className="form-input" type="text" name="email" id="email" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
        />
        <button className="button" type="button" id="passwordToggle">
          Show
        </button>
      </div>

      <button className="button" type="submit">
        Log in
      </button>
    </form>
  )
}
