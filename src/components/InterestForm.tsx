import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import "./InterestForm.css";

const formatPin = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})(?=.)/g, "$1-");
};

const getPinStrength = (pin: string): "weak" | "medium" | "strong" => {
  const digits = pin.replace(/\D/g, "");
  if (digits.length < 8) return "weak";
  if (digits.length < 12) return "medium";
  return "strong";
};

const InterestForm: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    costGuess: "",
    pin: "",
  });
  const [showPin, setShowPin] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "pin" ? formatPin(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const encodedPin = btoa(form.pin.replace(/-/g, ""));
    console.log("📬 Form submission:", { ...form, pin: encodedPin });
    alert("Thanks! Check the developer console for your input.");
  };

  const fields = ["firstName", "lastName", "phone", "email", "costGuess", "pin"];
  const pinStrength = getPinStrength(form.pin);

  return (
    <motion.form
      className="spidr-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="heading_new">Stay in the know!</h2>

      {fields.map((field) =>
        field === "pin" ? (
          <div key={field} className="form-field floating-label-group">
            <input
              id="pin"
              name="pin"
              type={showPin ? "text" : "password"}
              onChange={handleChange}
              value={form.pin}
              placeholder=" "
              required
              className="pin-input"
            />
            <label htmlFor="pin">16‑digit Spidr PIN</label>
            <div className="pin-field-wrapper">
              <button
                type="button"
                onClick={() => setShowPin((s) => !s)}
                className="pin-toggle"
              >
                {showPin ? "Hide" : "Show"}
              </button>
            </div>
            <div className={`pin-strength ${pinStrength}`}>{pinStrength}</div>
          </div>
        ) : (
          <div key={field} className="form-field floating-label-group">
            <input
              id={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              onChange={handleChange}
              value={(form as any)[field]}
              placeholder=" "
              required
            />
            <label htmlFor={field}>
              {field === "costGuess"
                ? "Guess the air fryer’s cost ($)"
                : field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
          </div>
        )
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="submit-btn"
      >
        Submit
      </motion.button>
    </motion.form>
  );
};

export default InterestForm;
