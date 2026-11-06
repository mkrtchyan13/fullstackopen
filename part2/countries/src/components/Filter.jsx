export const Filter = ({ value, handleChange }) => {
  return (
    <div>
      filter countries
      <input value={value} onChange={handleChange} />
    </div>
  );
};
